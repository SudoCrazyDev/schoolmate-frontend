// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1yq82wJJ0OTUQd5f350zo81EPp_KM7rQ",
  authDomain: "schoolmate-943bb.firebaseapp.com",
  projectId: "schoolmate-943bb",
  storageBucket: "schoolmate-943bb.appspot.com",
  messagingSenderId: "921147250313",
  appId: "1:921147250313:web:492f0a146cc838c63f9858",
  measurementId: "G-E23YYJD0Q1"
};
const fireStoreConfig = {
    cacheSizeBytes: 40000000,
    experimentalAutoDetectLongPolling: true,
    experimentalForceLongPolling: false,
    ignoreUndefinedProperties: false,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = initializeFirestore(app, fireStoreConfig, '(default)');
export const analytics = getAnalytics(app);