import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig2 } from "app/config/env";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig2)

export const db = getFirestore(app)
export const auth = getAuth(app);