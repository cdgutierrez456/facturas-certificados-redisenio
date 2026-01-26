import { initializeApp, getApps, getApp } from "firebase/app"; // 1. Agregamos getApps y getApp
import { getDatabase, ref, set, remove, update, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { firebaseConfig, passwordFirebase, userFirebase } from "@/config/firebaseMegapagos";

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app, "gs://blog-megapagos.appspot.com");
export { db, auth, storage };

function loginUser(email: string, password: string) {
  if (!auth.currentUser) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al iniciar sesión:", errorCode, errorMessage);
    });
  }
}

export function createPostService(postData: any): Promise<void> {
  const user = auth.currentUser;
  if (user) {
    const postRef = ref(db, 'facturas');
    const newPostRef = push(postRef);
    return set(newPostRef, postData);
  } else {
    return Promise.reject("Usuario no autenticado (o inicializando). Intenta nuevamente.");
  }
}

export function editPostService(postId: string, updatedData: any): Promise<void> {
  const user = auth.currentUser;
  if (user) {
    const postRef = ref(db, 'facturas/' + postId);
    return update(postRef, updatedData)
  } else {
    return Promise.reject("Usuario no autenticado.");
  }
}

export async function deletePostService(postId: string, imageUrl?: string): Promise<void> {
  const user = auth.currentUser;

  if (user) {
    if (imageUrl) {
      try {
        const fileRef = refStorage(storage, imageUrl);
        await deleteObject(fileRef);
        console.log("Imagen eliminada del Storage");
      } catch (error) {
        console.warn("No se pudo eliminar la imagen (o no existía):", error);
      }
    }
    const postRef = ref(db, 'facturas/' + postId);
    return remove(postRef)
  } else {
    return Promise.reject("Usuario no autenticado.");
  }
}

export async function uploadImageService(file: File): Promise<string> {
  const user = auth.currentUser;
  if (!user) return Promise.reject("Usuario no autenticado.");

  const filePath = `images/${Date.now()}_${file.name}`;
  const storageReference = refStorage(storage, filePath);

  const snapshot = await uploadBytes(storageReference, file);

  return await getDownloadURL(snapshot.ref);
}

loginUser(userFirebase, passwordFirebase);