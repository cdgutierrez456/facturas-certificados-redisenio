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

  return (
    <div className={styles.posts}>
      {posts.map((post) => (
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
  );
};

export default Posts;