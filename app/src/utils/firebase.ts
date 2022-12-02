// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "paytc-57adb.firebaseapp.com",
  projectId: "paytc-57adb",
  storageBucket: "paytc-57adb.appspot.com",
  messagingSenderId: "268655711065",
  appId: "1:268655711065:web:57b0733cd8474d0df4b248",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
