import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "poperingeevents.firebaseapp.com",
  databaseURL: "https://poperingeevents-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "poperingeevents",
  storageBucket: "poperingeevents.appspot.com",
  messagingSenderId: "361125228571",
  appId: "1:361125228571:web:cfe8e34eac7e8c26ba88be",
  measurementId: "G-P6VBLDSD38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
