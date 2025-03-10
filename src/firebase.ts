// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkLRdDrlitLYv_snFCNN4wLsJzxG1Gqdw",
  authDomain: "chatbot-6f977.firebaseapp.com",
  projectId: "chatbot-6f977",
  storageBucket: "chatbot-6f977.appspot.com",
  messagingSenderId: "192938131787",
  appId: "1:192938131787:web:831b936a0ef4f11f6c28ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtime = getDatabase(app);
export const auth = getAuth();