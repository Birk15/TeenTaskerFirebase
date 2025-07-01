// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVJ_YrZK6hDYxbGBNESdrv75m_z-Q-pWo",
  authDomain: "teentasker-a7f9c.firebaseapp.com",
  projectId: "teentasker-a7f9c",
  storageBucket: "teentasker-a7f9c.appspot.com",
  messagingSenderId: "754699372603",
  appId: "1:754699372603:web:1b09808b7a49c05016341e",
  measurementId: "G-0B5R1NMK30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);