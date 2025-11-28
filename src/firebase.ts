import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4tgSTXHNhr5rcT19nm7lvm_34W31Svcw",
  authDomain: "academy-79749.firebaseapp.com",
  projectId: "academy-79749",
  storageBucket: "academy-79749.appspot.com",

  // Your Messaging Sender ID (your Project Number) for Firebase Cloud Messaging (FCM).
  messagingSenderId: "84837784904",

  // Your App ID for this specific web application.
  appId: "1:84837784904:web:632da212f3f720e1f7a77d",

  // Your Google Analytics Measurement ID.
  measurementId: "G-514215003" // From your Google Analytics Property ID: 514215003
};

// Initialize Firebase
// This line connects your web app to your Firebase project.
const app: FirebaseApp = initializeApp(firebaseConfig);


export const auth: Auth = getAuth(app); // For Firebase Authentication
export const db: Firestore = getFirestore(app); // For Cloud Firestore Database

// You can add other Firebase services here if you initialize them.
// Example:
// import { getStorage, FirebaseStorage } from 'firebase/storage';
// export const storage: FirebaseStorage = getStorage(app); // For Cloud Storage
