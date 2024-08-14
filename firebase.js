// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmo3LmS6nNFtwy9u6ax2ZthDMl4ocvW6E",
    authDomain: "ai-chatbot-9f5da.firebaseapp.com",
    projectId: "ai-chatbot-9f5da",
    storageBucket: "ai-chatbot-9f5da.appspot.com",
    messagingSenderId: "664458575826",
    appId: "1:664458575826:web:56049552f73862694f120b",
    measurementId: "G-JX4N3V7KGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);