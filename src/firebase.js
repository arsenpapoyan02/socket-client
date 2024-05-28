import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAX7V1YLYOS2j3LADtl-zbt7w6P3xIKmIQ",
  authDomain: "chat-fd6f4.firebaseapp.com",
  projectId: "chat-fd6f4",
  storageBucket: "chat-fd6f4.appspot.com",
  messagingSenderId: "255546892241",
  appId: "1:255546892241:web:07f5d426f77e95ad1c0af0",
  measurementId: "G-MFL0RHDTPZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
export default db;