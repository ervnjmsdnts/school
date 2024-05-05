// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJXxRDcRSgT-ewi-vIZ5vbiebgzp4myII",
  authDomain: "school-c9f79.firebaseapp.com",
  projectId: "school-c9f79",
  storageBucket: "school-c9f79.appspot.com",
  messagingSenderId: "740947601863",
  appId: "1:740947601863:web:50b44afe716532a2b591e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
