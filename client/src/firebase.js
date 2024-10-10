// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "rajeshbnb-2c07c.firebaseapp.com",
  projectId: "rajeshbnb-2c07c",
  storageBucket: "rajeshbnb-2c07c.appspot.com",
  messagingSenderId: "478923943755",
  appId: "1:478923943755:web:33e0dba197bcd000aa02ce",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
