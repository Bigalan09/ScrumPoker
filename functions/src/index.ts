import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const joinRoom =
    functions.https.onCall((data, context) => {
        const roomId = data.roomId;
        let record: any = {};
        if (context.auth != null) {
            const uid: string = `${context.auth?.uid}`;
            record[uid] = true;
        }
        const collection = firestore.collection('rooms');
        if (roomId) {
            collection.doc(roomId).set(record, { merge: true }).then((docRef) => {
                return roomId;
            });
        } else {
            collection.add(record).then((docRef) => {
                return docRef.id;
            })
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