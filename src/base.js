import firebase from 'firebase';
import Rebase from 're-base';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

const db = firebase.database(firebaseApp);
const base = Rebase.createClass(db);

export { firebaseApp };
export default base;
