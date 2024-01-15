// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore";;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7Z8G8IwOb3gaRTBE_sa7d65xxTGhyv-A",
  authDomain: "semedo-b548e.firebaseapp.com",
  databaseURL: "https://semedo-b548e-default-rtdb.firebaseio.com",
  projectId: "semedo-b548e",
  storageBucket: "semedo-b548e.appspot.com",
  messagingSenderId: "714808673899",
  appId: "1:714808673899:web:3ae6add5299fbde3ca132e",
  measurementId: "G-KGM326XP7R"
};



// Initialize Firebase
export const Fire = initializeApp(firebaseConfig);
export const database = getDatabase(Fire)
export const firestore = getFirestore(Fire);
// const database = getDatabase(Fire);

