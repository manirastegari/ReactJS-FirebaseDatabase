

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Authentication
import { getAuth } from 'firebase/auth';

// Firebase Firestore
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZXs9KSj99NaMLdmHpp0qtZLEPW75uAyU",
  authDomain: "gbc-projects-a8fe6.firebaseapp.com",
  projectId: "gbc-projects-a8fe6",
  storageBucket: "gbc-projects-a8fe6.firebasestorage.app",
  messagingSenderId: "1013013120210",
  appId: "1:1013013120210:web:8ce37ffe0a49055a81590b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// create an object for authentication
export const auth = getAuth(app);

// create an object of firestore
export const db = getFirestore(app);