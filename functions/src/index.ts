import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import * as moment from 'moment';

admin.initializeApp();
const firestore = admin.firestore();

export const joinRoom =
    functions.https.onCall(async (data, context) => {

        const roomId = data.roomId;
        let record: any = {
            roomId,
            participants: [],
        };
        if (context.auth != null) {
            const uid: string = `${context.auth?.uid}`;
            record.participants.push(uid);
        }
        const collection = firestore.collection('rooms');

        if (roomId != null && roomId != undefined) {
            record.roomId = roomId;
            await collection.doc(roomId).set(record, { merge: true });
            return Promise.resolve(roomId);
        } else {
            const docRef = await collection.add(record);
            return Promise.resolve(docRef.id);

        }
    });

const getInactiveUsers = (users: Array<UserRecord> = [], nextPageToken?: string): Promise<Array<UserRecord>> => {
    let userList = users;

    return admin.auth().listUsers(1000, nextPageToken).then((result: admin.auth.ListUsersResult) => {
        console.log(`Found ${result.users.length} users`);

        const inactiveUsers = result.users.filter((user) => {
            return moment(user.metadata.lastSignInTime).isBefore(moment().subtract(14, "days")) && !user.emailVerified;
        });

        console.log(`Found ${inactiveUsers.length} inactive users`);

        // Concat with list of previously found inactive users if there was more than 1000 users.
        userList = userList.concat(inactiveUsers);

        // If there are more users to fetch we fetch them.
        if (result.pageToken) {
            return getInactiveUsers(userList, result.pageToken);
        }

        return userList;
    });
}

export const onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
    async (change, context) => {
        const eventStatus = change.after.val();

        const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`);
        const statusSnapshot = await change.after.ref.once('value');
        const status = statusSnapshot.val();
        functions.logger.log(status, eventStatus);

        if (status.last_changed > eventStatus.last_changed) {
            return null;
        }

        eventStatus.last_changed = new Date(eventStatus.last_changed);
        return userStatusFirestoreRef.set(eventStatus);
    });

export const removeOldUsers = functions.pubsub.topic("1 of month 00:00").onPublish(event => {
    return new Promise((resolve) => {
        console.info(`Start deleting user accounts`);

        getInactiveUsers().then((users: UserRecord[]) => {
            resolve(users);
        });
    }).then((users: any) => {
        console.info(`Start deleting ${users.length} user accounts`);
        let promises: Promise<any>[] = []
        users.forEach((user: UserRecord) => {
            promises.push(admin.auth().deleteUser(user.uid).then(() => {
                console.log("Deleted user account", user.uid, "because of inactivity");
            }).catch((error) => {
                console.error("Deletion of inactive user account", user.uid, "failed:", error);
            }));
        });
        return Promise.all(promises);
    }).then(() => {
        console.info(`Done deleting user accounts`);
    });
});