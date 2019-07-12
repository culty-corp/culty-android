// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDR7HI22BLiZtYnUAX5MAAfTjO9t-QK-Uw",
  authDomain: "culty-rn-2eb19.firebaseapp.com",
  databaseURL: "https://culty-rn-2eb19.firebaseio.com",
  projectId: "culty-rn-2eb19",
  storageBucket: "culty-rn-2eb19.appspot.com",
  messagingSenderId: "401220312381",
  appId: "1:401220312381:web:156862612646c5b3"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
