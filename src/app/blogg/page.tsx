"use client"
import { useEffect, useState } from 'react';
import { db } from 'app/services/firebase/serviciosFaqs';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './Posts.module.sass';

type Post = {
  id: string;
  formattedContent: string[];
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), where('active', '==', true));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.posts}>
      {posts.map(post => (
        <div key={post.id} className={styles.post}>
          <div dangerouslySetInnerHTML={{ __html: post.formattedContent.join('') }} />
        </div>
      ))}
    </div>
  );
};

export default Posts