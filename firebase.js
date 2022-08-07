// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeVIzsqD4fzh3ecfcWSVjbxhuzr3A_3mA",
  authDomain: "insta-clone-ad143.firebaseapp.com",
  projectId: "insta-clone-ad143",
  storageBucket: "insta-clone-ad143.appspot.com",
  messagingSenderId: "297443951160",
  appId: "1:297443951160:web:895d3e622e68bf73d19ccd"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db=getFirestore()
const storage=getStorage();
export {app,db,storage }