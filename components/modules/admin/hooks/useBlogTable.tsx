'use client'

import { useState, useEffect } from "react";

import { firebaseConfig } from "@/config/firebaseMegapagos";

export const usePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${firebaseConfig.databaseURL}/facturas.json`)
    .then(data => data.json())
    .then((data: any) => {
      const postsArray = Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          ...(value as any)
        };
      });
      setPosts(postsArray);
      setLoading(false);
    })
  }, []);

  return { posts, loading };
};