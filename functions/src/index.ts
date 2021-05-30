import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const joinRoom =
    functions.https.onCall((data, context) => {
        const roomId = data.roomId;
        let record: any = {
            roomId
        };
        if (context.auth != null) {
            const uid: string = `${context.auth?.uid}`;
            record[uid] = true;
        }
        const collection = firestore.collection('rooms');
        if (roomId != null || roomId != undefined) {
            return collection.doc(roomId).set(record, { merge: true }).then((docRef) => {
                return roomId;
            }).catch(err => {
                functions.logger.log("set err: ", err);
            });
        } else {
            return collection.add(record).then((docRef) => {
                return docRef.id;
            }).catch(err => {
                functions.logger.log("add err: ", err);
            });
        }
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