// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
/* import { getAnalytics } from "firebase/analytics"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGuwM0bOZ804mcBuun_ES_tOeLjX6Gaj4",
  authDomain: "doubts-3440b.firebaseapp.com",
  projectId: "doubts-3440b",
  storageBucket: "doubts-3440b.appspot.com",
  messagingSenderId: "517096237130",
  appId: "1:517096237130:web:5c9394b44401830d609eb3",
  measurementId: "G-ZWK1MYN96R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

export {auth, googleProvider}

//const analytics = getAnalytics(app);