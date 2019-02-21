import db from '@/firebaseInit';

export default {
  async fetch(_roomId, _userId) {
    const snapshots = await db.collection('message')
      .where('roomId', '==', _roomId)
      .where('userId', '==', _userId)
      .limit(10)
      .get();
    return snapshots.empty ? [] : snapshots.docs
      .map((row) => {
        const { roomId, userId, message } = row.data();
        return { id: row.id, roomId, userId, message, isMyMessage: userId === _userId };
      });
  },
  async register(message) {
    const data = {
      ...message,
    };
    const docRef = await db.collection('message')
      .add(data);
    const snapshot = await docRef.get();
    const result = {
      ...snapshot.data(),
    };
    return {
      id: docRef.id,
      ...result,
    };
  },
};
