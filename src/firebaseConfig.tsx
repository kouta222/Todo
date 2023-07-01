import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjbUmUPHpnl3-H73Zv58v-G1fDmp561zE",
  authDomain: "todo-25a27.firebaseapp.com",
  projectId: "todo-25a27",
  storageBucket: "todo-25a27.appspot.com",
  messagingSenderId: "280033275293",
  appId: "1:280033275293:web:3e36eae69fcaec50fb1374",
  measurementId: "G-RW5G4B4W8G"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
