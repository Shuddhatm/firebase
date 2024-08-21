// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCchZNweG6bsWFY_YE7N__34U8IpKQWxGM",
  authDomain: "fir-7d4d3.firebaseapp.com",
  projectId: "fir-7d4d3",
  storageBucket: "fir-7d4d3.appspot.com",
  messagingSenderId: "152846065368",
  appId: "1:152846065368:web:9fa36ada1ab40a45b0c1ad",
  measurementId: "G-QT9H7C4YYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);