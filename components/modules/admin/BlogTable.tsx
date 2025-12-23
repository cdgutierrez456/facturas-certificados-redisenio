'use client'

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/services/firebase/serviciosFaqs";

import ActionButtonsCell from "./ActionButtonsCell";
import TableHeaderCell from "./TableHeaderCell";
import TableCell from "./TableCell";

const BlogTable = () => {

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Titulo</TableHeaderCell>
            <TableHeaderCell>Descripcion</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium text-gray-900">{post.id}</TableCell>
              <TableCell className="font-medium text-gray-600">{post.mainTitle}</TableCell>
              <TableCell className="text-gray-600">{post.briefDescription}</TableCell>
              <ActionButtonsCell />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;