import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyATN6VUANGhwibzuZLCq17Lasrvzsvn0ZM',
  authDomain: 'get-sheet-done.firebaseapp.com',
  databaseURL: 'https://get-sheet-done.firebaseio.com',
  projectId: 'get-sheet-done',
  storageBucket: 'get-sheet-done.appspot.com',
  messagingSenderId: '117965489302',
};

const db = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider()


export { db, facebookProvider };
