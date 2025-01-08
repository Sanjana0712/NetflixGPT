// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWZlUMiVQTyCzOeaKPyRXhZn2kBTCU4_k",
  authDomain: "neetflixgpt.firebaseapp.com",
  projectId: "neetflixgpt",
  storageBucket: "neetflixgpt.firebasestorage.app",
  messagingSenderId: "163690015085",
  appId: "1:163690015085:web:998e31aab1178917959264"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);