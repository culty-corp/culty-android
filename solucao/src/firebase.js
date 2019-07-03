// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDgatmeSXA3sFlv9eINw60IlzqAijQm8YA',
  authDomain: 'culty-rn.firebaseapp.com',
  databaseURL: 'https://culty-rn.firebaseio.com',
  storageBucket: 'culty-rn.appspot.com'
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
