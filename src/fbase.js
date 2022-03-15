import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBTBje7DfRbWt3EyHgjTeGBCnR6vl85U_c",
    authDomain: "nwitter-4e0c2.firebaseapp.com",
    projectId: "nwitter-4e0c2",
    storageBucket: "nwitter-4e0c2.appspot.com",
    messagingSenderId: "384895445242",
    appId: "1:384895445242:web:938ae1f4e9742c497b8143"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();