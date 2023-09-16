// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Firestore, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLuxvdbKP8yb3Yy0LyzDo8PphhgHT9qbg",
  authDomain: "react-contact-c5115.firebaseapp.com",
  projectId: "react-contact-c5115",
  storageBucket: "react-contact-c5115.appspot.com",
  messagingSenderId: "257319404858",
  appId: "1:257319404858:web:28ae8ae5b45fe5070c3c03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 