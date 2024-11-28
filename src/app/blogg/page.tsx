"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Usar el enrutador de Next.js
import { db } from "app/services/firebase/serviciosFaqs";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./Posts.module.sass";

type Post = {
  id: string;
  imgUri: string;
  mainTitle: string;
  briefDescription: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();

  // Obtener todos los posts
  useEffect(() => {
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData); // Actualiza el estado de posts en tiempo real
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Filtrar posts por el valor del filtro
  const filteredPosts = posts.filter((post) =>
    post.mainTitle.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.posts}>
      {/* Input para el filtro */}
      <div className={styles.filter}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Actualiza el estado del filtro
          className={styles.filterInput}
        />
      </div>
      <div className={styles.posts2}>
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className={styles.card}
          onClick={() => router.push(`/blogg/${post.id}`)} // Redirigir al post seleccionado
        >
          {post.imgUri && (
            <img
              src={post.imgUri}
              alt={post.mainTitle}
              className={styles.cardImage}
            />
          )}
          <div className={styles.cardContent}>
            <h2>{post.mainTitle}</h2>
            <p>{post.briefDescription}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Posts;