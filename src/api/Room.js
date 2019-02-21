import db from '@/firebaseInit';

export default {
  async fetch(_userId) {
    const snapshots = await db.collection('rooms')
      .where('userId', '==', _userId)
      .limit(10)
      .get();
    return snapshots.empty ? [] : snapshots.docs
      .map((row) => {
        const { friends, name, userId } = row.data();
        return { id: row.id, friends, name, userId };
      });
  },
  async fetchByRoomId(_roomId) {
    const snapshots = await db.collection('rooms')
      .where('id', '==', _roomId)
      .limit(10)
      .get();
    return snapshots.empty ? [] : snapshots.docs
      .map((row) => {
        const { friends, name, userId } = row.data();
        return { id: row.id, friends, name, userId };
      });
  },
  async register(room) {
    const docRef = await db.collection('rooms').add(room);
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
