// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase, getFirestore, writeBatch} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8IQqL25wu3JnuRHcWrAipVdDsjucQRrE",
  authDomain: "flashcards-ed1ef.firebaseapp.com",
  projectId: "flashcards-ed1ef",
  storageBucket: "flashcards-ed1ef.appspot.com",
  messagingSenderId: "839108592862",
  appId: "1:839108592862:web:5dd0c6e8c94cb79fdfae4f",
  measurementId: "G-37RWYX3BXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}