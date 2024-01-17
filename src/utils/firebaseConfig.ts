// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAt93OfaCIq_jd14DDvwZ1jcK0PMeX8NE0",
    authDomain: "azure-music.firebaseapp.com",
    projectId: "azure-music",
    storageBucket: "azure-music.appspot.com",
    messagingSenderId: "668900762704",
    appId: "1:668900762704:web:cdf7084e367b4db411dd55",
    measurementId: "G-G6LK6XQL17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
