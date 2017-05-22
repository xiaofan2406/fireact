import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDGhbEAjNTRPq4YwBDvddtf1P7TqzhE0gI',
  authDomain: 'fireact-d27a3.firebaseapp.com',
  databaseURL: 'https://fireact-d27a3.firebaseio.com',
  storageBucket: 'fireact-d27a3.appspot.com',
  messagingSenderId: '1029706794051'
};

firebase.initializeApp(config);

export default firebase;
