// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAm5h6G9gLusas57h0hTIjPAzBeZwNID4",
  authDomain: "project-11-64e72.firebaseapp.com",
  projectId: "project-11-64e72",
  storageBucket: "project-11-64e72.firebasestorage.app",
  messagingSenderId: "610513483124",
  appId: "1:610513483124:web:b8e99877ce13aa64ce6821"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);