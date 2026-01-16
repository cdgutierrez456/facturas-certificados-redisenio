import { getDatabase, ref, get } from "firebase/database";
import { app } from "./firebase/megapagosProject";

export async function getPostById(id: string) {
  try {
    const db = getDatabase(app);
    // Referencia directa al nodo: facturas/ID_DEL_POST
    const postRef = ref(db, `facturas/${id}`);

    const snapshot = await get(postRef);

    if (snapshot.exists()) {
      // Retornamos el objeto uniendo el ID con los datos (title, htmlContent, etc.)
      return {
        id: id,
        ...snapshot.val()
      };
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return null;
  }
}