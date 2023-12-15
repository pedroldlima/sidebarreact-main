// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkhn9HAMAiCq5mYSaV74hU2iIXty8hXJI",
  authDomain: "front-iza.firebaseapp.com",
  projectId: "front-iza",
  storageBucket: "front-iza.appspot.com",
  messagingSenderId: "556292309618",
  appId: "1:556292309618:web:e34c5e26a73f783f0cf8eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
