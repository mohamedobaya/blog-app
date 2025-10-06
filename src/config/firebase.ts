// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ-ZvhMuyIKoGF17YJHXrWLK9iGYcrxNQ",
  authDomain: "blogify-f52da.firebaseapp.com",
  projectId: "blogify-f52da",
  storageBucket: "blogify-f52da.firebasestorage.app",
  messagingSenderId: "976608943081",
  appId: "1:976608943081:web:c93be5a66ecf6df46a8978",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// getting db
export const db = getFirestore(app);
