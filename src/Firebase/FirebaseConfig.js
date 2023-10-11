// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-ImurUSUUy-zsuleeARtUvifrWR1YVyc",
  authDomain: "thekingbrave---boyz.firebaseapp.com",
  projectId: "thekingbrave---boyz",
  storageBucket: "thekingbrave---boyz.appspot.com",
  messagingSenderId: "745482731998",
  appId: "1:745482731998:web:213e7707591084be309d4f",
  measurementId: "G-3ZBWXJHZ1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
