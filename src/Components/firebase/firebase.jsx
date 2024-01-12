import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDbJBH1B8AAuKwNi1tL3H9p9TPZCgk5mns",
  authDomain: "media-2a1d3.firebaseapp.com",
  projectId: "media-2a1d3",
  storageBucket: "media-2a1d3.appspot.com",
  messagingSenderId: "912289908417",
  appId: "1:912289908417:web:822e6a563db5a43dfbb640"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, onAuthStateChanged };
