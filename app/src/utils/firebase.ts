// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc } from "firebase/firestore/lite";

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

const usersCollection = collection(db, "users");

export const getAddressData = async (key: "mmAddress" | "swAddress", address: string) => {
  const taskQuery = query(usersCollection, where(key, "==", address));
  const userDocs = await getDocs(taskQuery);

  if (userDocs.empty) {
    console.log(`no doc found with ${key} as ${address}`);
    return null;
  }

  const data = userDocs.docs[0].data();
  return data;
};

export const addNewUser = async (mmAddress: string, swAddress: string, ens?: string | null) => {
  await addDoc(usersCollection, {
    mmAddress,
    swAddress,
    ens: ens ?? null,
    createdAt: Math.floor(Date.now() / 1000),
    defaultChainId: null,
    defaultAsset: null,
  });
};
