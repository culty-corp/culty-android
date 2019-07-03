// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDgatmeSXA3sFlv9eINw60IlzqAijQm8YA',
  authDomain: 'culty-rn.firebaseapp.com',
  databaseURL: 'https://culty-rn.firebaseio.com',
  projectId: 'culty-rn',
  storageBucket: 'culty-rn.appspot.com',
  messagingSenderId: '151775851052',
  appId: '1:151775851052:web:ad60de0dcef7cbf8'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
