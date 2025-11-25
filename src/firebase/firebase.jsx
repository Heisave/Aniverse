// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuoSSByYFYPtrctwmRFpzXXlJUn2DVttM",
  authDomain: "aniverse-project.firebaseapp.com",
  projectId: "aniverse-project",
  storageBucket: "aniverse-project.firebasestorage.app",
  messagingSenderId: "589576373602",
  appId: "1:589576373602:web:4f16e4f5059b5de31b583b",
  measurementId: "G-MB4S2F6960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)