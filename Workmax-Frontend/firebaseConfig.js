import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgwhI5quKFM7Q8N-hyUosCefma-upXxFw",
  authDomain: "workmax-ba245.firebaseapp.com",
  projectId: "workmax-ba245",
  storageBucket: "workmax-ba245.appspot.com",
  messagingSenderId: "322375332709",
  appId: "1:322375332709:web:3bb921918170435a46a78c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
