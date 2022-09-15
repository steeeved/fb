// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBp9an2McR6bRpTmiTalbk0xIrVOUhQL8k',
  authDomain: 'authentication-b6bed.firebaseapp.com',
  projectId: 'authentication-b6bed',
  storageBucket: 'authentication-b6bed.appspot.com',
  messagingSenderId: '649049180026',
  appId: '1:649049180026:web:420cbad9333536033238c3'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);