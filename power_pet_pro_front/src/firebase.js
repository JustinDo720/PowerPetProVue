import { initializeApp } from "firebase/app";

const config = {
  apiKey: process.env.VUE_APP_FB_apiKey,
  authDomain: process.env.VUE_APP_FB_authDomain,
  projectId: process.env.VUE_APP_FB_projectId,
  storageBucket: process.env.VUE_APP_FB_storageBucket,
  messagingSenderId: process.env.VUE_APP_FB_messagingSenderId,
  appId: process.env.VUE_APP_FB_appId,
  measurementId: process.env.VUE_APP_FB_measurementId,
};

// Initialize Firebase
const firebaseApp = initializeApp(config);
