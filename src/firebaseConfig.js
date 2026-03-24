
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyA90ymv3ktZVlTJ7d_nUblS8XMTgVaJDTw",
  authDomain: "nannies-cbc6e.firebaseapp.com",
  databaseURL: "https://nannies-cbc6e-default-rtdb.firebaseio.com",
  projectId: "nannies-cbc6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
