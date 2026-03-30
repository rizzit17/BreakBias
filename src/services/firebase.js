import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkmZig7Ou3Tve25qN9nQxixYtj8M5y4WM",
  authDomain: "breakbias-app.firebaseapp.com",
  projectId: "breakbias-app",
  storageBucket: "breakbias-app.firebasestorage.app",
  messagingSenderId: "505056669348",
  appId: "1:505056669348:web:5426e4b88d88a25b084031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
