import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZXs9KSj99NaMLdmHpp0qtZLEPW75uAyU",
  authDomain: "gbc-projects-a8fe6.firebaseapp.com",
  projectId: "gbc-projects-a8fe6",
  storageBucket: "gbc-projects-a8fe6.firebasestorage.app",
  messagingSenderId: "1013013120210",
  appId: "1:1013013120210:web:8ce37ffe0a49055a81590b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);