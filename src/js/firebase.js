// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9IXfHV6PmmHKrDdEQRCcsv_fPtE6HxLk",
  authDomain: "proyectopwa-ac78a.firebaseapp.com",
  projectId: "proyectopwa-ac78a",
  storageBucket: "proyectopwa-ac78a.appspot.com",
  messagingSenderId: "461679034490",
  appId: "1:461679034490:web:e6bccbefae1c638697fbc3",
  measurementId: "G-WFF5SJCSNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);