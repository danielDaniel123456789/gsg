import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
getFirestore, 
collection, 
addDoc, 
getDocs, 
doc, 
getDoc, 
updateDoc, 
deleteDoc // Asegúrate de agregar esta línea
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCFD4r3002vUWFNwhsu-XA4H_s65n-zo6I",
  authDomain: "dbgsg-8b40d.firebaseapp.com",
  projectId: "dbgsg-8b40d",
  storageBucket: "dbgsg-8b40d.appspot.com",
  messagingSenderId: "769712986800",
  appId: "1:769712986800:web:c100a6fcc6d2f704f6f975",
  measurementId: "G-TBQH07LB1E"
};