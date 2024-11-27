"use client";
import { useState, useEffect } from "react";
import { db } from "app/services/firebase/serviciosFaqs";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import styles from "./AdminBlogg.module.sass";
import { PostList } from "app/components/blogg/PostCards";

const AdminPanel = () => {
  const [formattedContent, setFormattedContent] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const [imgUri, setImgUri] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Obtener todos los posts
  useEffect(() => {
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData); // Actualiza el estado de posts en tiempo real
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setFormattedContent(input);
    formatContent(input);
  };

  const formatContent = (input: string) => {
    const lines = input.split("\n");
    const formatted = lines.map((line) => {
      // Encabezados
      if (line.startsWith("t1.")) return `<h1>${line.substring(3)}</h1>`;
      if (line.startsWith("t2.")) return `<h2>${line.substring(3)}</h2>`;
      if (line.startsWith("t3.")) return `<h3>${line.substring(3)}</h3>`;

      // Párrafos
      if (line.startsWith("p.")) return `<p>${line.substring(2)}</p>`;

      // Imagen
      if (line.startsWith("i."))
        return `<img src="${line.substring(2)}" alt="Blog Image"/>`;

      // Negrita
      if (line.startsWith("b.")) return `<strong>${line.substring(2)}</strong>`;

      // Cursiva
      if (line.startsWith("i2.")) return `<em>${line.substring(3)}</em>`;

      // Lista no ordenada
      if (line.startsWith("ul.")) {
        const listItems = line.substring(3).split(","); // Lista no ordenada
        const listContent = listItems
          .map((item) => `<li>${item}</li>`)
          .join("");
        return `<ul>${listContent}</ul>`;
      }

      // Lista ordenada
      if (line.startsWith("ol.")) {
        const listItems = line.substring(3).split(","); // Lista ordenada
        const listContent = listItems
          .map((item) => `<li>${item}</li>`)
          .join("");
        return `<ol>${listContent}</ol>`;
      }

      // Cita
      if (line.startsWith("q."))
        return `<blockquote>${line.substring(2)}</blockquote>`;

      // Código en línea
      if (line.startsWith("c.")) return `<code>${line.substring(2)}</code>`;

      // Bloque de código
      if (line.startsWith("pre.")) return `<pre>${line.substring(4)}</pre>`;

      // Enlace
      if (line.startsWith("a.")) {
        const [text, url] = line.substring(2).split(","); // Enlace
        return `<a href="${url.trim()}">${text.trim()}</a>`;
      }

      // Línea horizontal
      if (line.startsWith("hr.")) return `<hr/>`;

      // Salto de línea (br)
      if (line.startsWith("br.")) return `<br/>`;

      // En caso de que no se encuentre ninguna etiqueta, se retorna el texto tal cual.
      return line;
    });

    // Unir el contenido con las etiquetas procesadas
    setFormattedContent(formatted.join(""));
  };

  const handleAddPost = async () => {
    console.log(imgUri,
      mainTitle,
      briefDescription,
      formattedContent,)
    try {
      if (!mainTitle || !formatContent || !briefDescription) {
        alert("Please fill in all the fields.");
        return;
      }

      if (editingPostId) {
        // Actualizar el post existente
        await handleUpdatePost(editingPostId);
      } else {
        // Crear un nuevo post
        await addDoc(collection(db, "posts"), {
          imgUri,
          mainTitle,
          briefDescription,
          formattedContent,
        });
      }

      // Limpiar los campos después de agregar/actualizar
      setImgUri("");
      setMainTitle("");
      setBriefDescription("");
      setFormattedContent("");
      setEditingPostId(null); // Resetear el ID del post en edición
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  const handleUpdatePost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    try {
      await updateDoc(postRef, {
        imgUri,
        mainTitle,
        briefDescription,
        formattedContent,
      });
      // Después de actualizar el post, podemos limpiar los campos si es necesario
      setImgUri("")
      setMainTitle("")
      setBriefDescription("")
      setFormattedContent("")
    } catch (error) {
      console.error("Error updating document:", error)
    }
  };

  const handleDeletePost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    try {
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleEditPost = (post: any) => {
    setEditingPostId(post.id) // Establecer el ID del post en edición
    setImgUri(post.imgUri)
    setMainTitle(post.mainTitle)
    setBriefDescription(post.briefDescription)
    setFormattedContent(post.formattedContent)
  }

  return (
    <div className={styles.adminPanel}>
      <h2>Admin Panel</h2>
      <div className={styles.container}>
        <form action="">
          {/* Formulario para agregar/editar el post */}
          <input
            type="text"
            placeholder="Image URI"
            value={imgUri}
            onChange={(e) => setImgUri(e.target.value)}
          />
          <input
            type="text"
            placeholder="Main Title"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
          />
          <textarea
            placeholder="Brief Description"
            value={briefDescription}
            onChange={(e) => setBriefDescription(e.target.value)}
          />
          <textarea
            placeholder="Post Content"
            value={formattedContent}
            onChange={handleContentChange}
          />
          <button type="button" onClick={handleAddPost}>Add Post</button>
        </form>

        {/* Vista previa del post */}
        <div className={styles.preview}>
          <h3>Post Preview</h3>
          {imgUri && (
            <img
              src={imgUri}
              alt="Preview of Post"
              className={styles.cardImage}
            />
          )}
          <div className={styles.cardContent}>
            <h2>{mainTitle || "Main Title"}</h2>
            <p>{briefDescription || "Brief description of the post."}</p>
            <div
              className={styles.formattedContent}
              dangerouslySetInnerHTML={{
                __html: formattedContent || "<p>Preview content here...</p>",
              }}
            />
          </div>
        </div>
      </div>
      <PostList
        posts={posts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default AdminPanel;
