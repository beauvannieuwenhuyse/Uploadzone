// Importeer de vereiste Firebase-modules
import { initializeApp } from "firebase/app"; // Importeer de initializeApp-functie van Firebase
import { getStorage } from 'firebase/storage'; // Importeer de getStorage-functie van Firebase Storage

// Configuratieobject voor Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY, // API-sleutel van Firebase (gehaald uit omgevingsvariabele)
  authDomain: "poperingeevents.firebaseapp.com", // Domein voor authenticatie
  databaseURL: "https://poperingeevents-default-rtdb.europe-west1.firebasedatabase.app", // URL van de realtime database
  projectId: "poperingeevents", // ID van het project in Firebase Console
  storageBucket: "poperingeevents.appspot.com", // Bucket voor Firebase Storage
  messagingSenderId: "361125228571", // ID voor messaging
  appId: "1:361125228571:web:cfe8e34eac7e8c26ba88be", // ID van de app in Firebase Console
  measurementId: "G-P6VBLDSD38" // ID voor metingen (optioneel)
};

// Initializeer de Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

