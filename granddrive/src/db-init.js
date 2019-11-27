import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDObuEeVxSNY2ObpZQa1pRxA1m4KoGbB3g",
  authDomain: "cis371-term-project.firebaseapp.com",
  databaseURL: "https://cis371-term-project.firebaseio.com",
  projectId: "cis371-term-project",
  storageBucket: "cis371-term-project.appspot.com",
  messagingSenderId: "814368049211",
  appId: "1:814368049211:web:460b89287a283a1b27741e",
  measurementId: "G-HJBL24Y9XW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppDB = firebase.database();
const AppAUTH = firebase.auth();
export { AppDB, AppAUTH }; // Make this name available to other modules
