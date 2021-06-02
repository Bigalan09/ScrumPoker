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
            roomId,
            participants: [],
        };
        if (context.auth != null) {
            const uid: string = `${context.auth?.uid}`;
            record.participants.push(uid);
        }
        const collection = firestore.collection('rooms');
        let res = null;
        if (roomId != null || roomId != undefined) {
            collection.doc(roomId).get().then(snapshot => {
                record = snapshot.data;
                record.roomId = roomId;
                
                if (context.auth != null) {
                    const uid: string = `${context.auth?.uid}`;
                    record.participants.push(uid);
                }

                res = collection.doc(roomId).set(record).then((docRef) => {
                    return Promise.resolve(roomId);
                }).catch(err => {
                    functions.logger.log("set err: ", err);
                });
            }).catch(err => {
                functions.logger.log("get err: ", err);
            });
            
        } else {
            res = collection.add(record).then((docRef) => {
                return Promise.resolve(docRef.id);
            }).catch(err => {
                functions.logger.log("add err: ", err);
            });
        }
        return res;
    });

export const getRoom =
    functions.https.onCall(async (data, context) => {
        const roomId = '1';
        const snapshot = await firestore
            .collection(`rooms/${roomId}`)
            .limit(1)
            .get();
        return snapshot.docs.map(doc => doc.data());
    });