import db from '@/firebaseInit';

export default {
  async fetch(_userId) {
    const snapshots = await db.collection('images')
      .where('userId', '==', _userId)
      .limit(10)
      .get();

    return snapshots.empty ? [] : snapshots.docs
      .map((row) => {
        const { image, userId } = row.data();
        return { id: row.id, src: image, userId };
      });
  },
  async register(image) {
    const docRef = await db.collection('images').add(image);
    const snapshot = await docRef.get();
    return { id: docRef.id, ...snapshot.data() };
  },
};
