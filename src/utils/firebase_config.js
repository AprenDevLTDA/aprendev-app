import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC-MLaC9yf6Bhn8BAiaPVTMfR-v-hBJeYo",
    authDomain: "apren-dev-fdb98.firebaseapp.com",
    databaseURL: "https://apren-dev-fdb98-default-rtdb.firebaseio.com",
    projectId: "apren-dev-fdb98",
    storageBucket: "apren-dev-fdb98.appspot.com",
    messagingSenderId: "550221477766",
    appId: "1:550221477766:web:9f4f2a55876bd661ab5e07",
    measurementId: "G-MG82NPXD7C"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(firebaseApp); // Corrigido para passar firebaseApp como argumento

export { firebaseApp, auth, db };
