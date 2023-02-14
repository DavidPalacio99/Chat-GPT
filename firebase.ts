import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7LD5pUQmmXEISvgCR7CRpP-S8355Nol4",
  authDomain: "chatgpt-messenger-86268.firebaseapp.com",
  projectId: "chatgpt-messenger-86268",
  storageBucket: "chatgpt-messenger-86268.appspot.com",
  messagingSenderId: "536339093169",
  appId: "1:536339093169:web:0bd38ddcb7dc1ed42e3490",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
