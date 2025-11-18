import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Substituir pelas suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8bWUqgK1UngXFrpVskemTl_Mw9mjAg4I",
  authDomain: "mush-co-e95b4.firebaseapp.com",
  projectId: "mush-co-e95b4",
  storageBucket: "mush-co-e95b4.firebasestorage.app",
  messagingSenderId: "216697201651",
  appId: "1:216697201651:web:659443806ff03901fae886",
  measurementId: "G-MZZ4D5D7YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;