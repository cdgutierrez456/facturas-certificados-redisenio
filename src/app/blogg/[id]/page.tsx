"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { db } from "app/services/firebase/serviciosFaqs";
import { doc, getDoc } from "firebase/firestore";
import styles from "./Post.module.sass";

type Post = {
  id: string;
  imgUri: string;
  mainTitle: string;
  briefDescription: string;
  formattedContent: string;
};

const PostPage = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const id = Array.isArray(params?.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const postRef = doc(db, "posts", id);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost({ id: postSnap.id, ...postSnap.data() } as Post);
      } else {
        router.push("/404"); // Redirigir a una página 404 si no se encuentra el post
      }
    };

    fetchPost();
  }, [id, router]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.post}>
      <div className={styles.post2}>
        {post.imgUri && (
          <img
            src={post.imgUri}
            alt={post.mainTitle}
            className={styles.image}
          />
        )}
        <h1>{post.mainTitle}</h1>
        <p>{post.briefDescription}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.formattedContent }}
        />
      </div>
    </div>
  )
}

export default PostPage;
