
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDjc4P6ZHypmZ3gAJAvdiyrpC7muP7GM4",
  authDomain: "kat-cakes.firebaseapp.com",
  projectId: "kat-cakes",
  storageBucket: "kat-cakes.firebasestorage.app",
  messagingSenderId: "947024220526",
  appId: "1:947024220526:web:4c715b9f1cc88648ee317f",
  measurementId: "G-10YSJX8CHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
