import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig as env } from "app/config/env";

const app = initializeApp(env)
export const db = getFirestore(app)