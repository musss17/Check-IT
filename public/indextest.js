import { application } from "express";
import { initializeApp } from firebase/app;
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection, addDoc} from 'firebase/firestore';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDFvt0xNnNKLshBiDWxCviEYa14I9XGsrk",
    authDomain: "check-it-b9801.firebaseapp.com",
    projectId: "check-it-b9801",
    storageBucket: "check-it-b9801.appspot.com",
    messagingSenderId: "840246374479",
    appId: "1:840246374479:web:5d29b69216e01f3ce1fa3a",
    measurementId: "G-4SRHTBDW89"
});

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(firebaseApp);


try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}