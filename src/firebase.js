// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjtnXWdpUg1IRmFgkvCMmfehdZGd8wQRs",
    authDomain: "tictactoe-80221.firebaseapp.com",
    projectId: "tictactoe-80221",
    storageBucket: "tictactoe-80221.appspot.com",
    messagingSenderId: "450074633650",
    appId: "1:450074633650:web:1b9cd0cfef6400d37db0ab",
    measurementId: "G-EDTQS7E86B"
  };

  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export default db;
