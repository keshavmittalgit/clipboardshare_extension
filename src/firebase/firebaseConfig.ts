
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your Firebase configuration
const firebaseConfig  = {
    apiKey: "AIzaSyAr7yfDKXSi3bZh5xW0hAwEwu8BQbp-rec",
    authDomain: "clipboard-extension-63acb.firebaseapp.com",
    projectId: "clipboard-extension-63acb",
    storageBucket: "clipboard-extension-63acb.appspot.com",
    messagingSenderId: "236309694102",
    appId: "1:236309694102:web:2cbe48a255c5cbab4924b7",
    measurementId: "G-SWFPY56YVJ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);


// Default export for the app instance (optional)
export default app;
