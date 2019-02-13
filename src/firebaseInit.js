import firebase from 'firebase';

const config = {
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
