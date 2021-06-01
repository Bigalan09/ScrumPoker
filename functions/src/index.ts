import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const joinRoom =
    functions.https.onCall((data, context) => {
        /*
        if (context.app == undefined) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'The function must be called from an App Check verified app.')
        }
        */

        const roomId = data.roomId;
        let record: any = {
            roomId
        };
        if (context.auth != null) {
            const uid: string = `${context.auth?.uid}`;
            record[uid] = true;
        }
        const collection = firestore.collection('rooms');
        let res = null;
        if (roomId != null || roomId != undefined) {
            res = collection.doc(roomId).set(record, { merge: true }).then((docRef) => {
                return Promise.resolve(roomId);
            }).catch(err => {
                functions.logger.log("set err: ", err);
            });
        } else {
            res = collection.add(record).then((docRef) => {
                return Promise.resolve(docRef.id);
            }).catch(err => {
                functions.logger.log("add err: ", err);
            });
        }
        res.then(d => console.log(d));
        return res;
    });

export const getUsersInRoom =
    functions.https.onCall(async (data, context) => {
        const roomId = '1';
        const snapshot = await firestore
            .collection(`rooms/${roomId}`)
            .limit(100)
            .get();
        return snapshot.docs.map(doc => doc.data());
    });