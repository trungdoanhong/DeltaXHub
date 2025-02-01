import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_UZ7W-50FSJ0_CCOy6iGW5xVWFyYN2gA",
  authDomain: "deltax-hub.firebaseapp.com",
  databaseURL: "https://deltax-hub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "deltax-hub",
  storageBucket: "deltax-hub.firebasestorage.app",
  messagingSenderId: "1020590866026",
  appId: "1:1020590866026:web:ef5891bfd2759e76429413",
  measurementId: "G-31RZEH4VT5"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 