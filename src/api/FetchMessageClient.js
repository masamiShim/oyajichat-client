import db from '@/firebaseInit';

export default {
  fetchMessage: (user) => {
    db.collection('message')
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const row = doc.data();
          this.chat.push({
            name: row.name,
            image: row.image,
            message: row.message,
            isMyMessage: row.name === user.displayName,
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
