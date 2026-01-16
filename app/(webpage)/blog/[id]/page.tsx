import React from 'react';
import { notFound } from 'next/navigation';
import { getPostById } from '@/services/postService'; // Importa tu función
import PostDetail from '@/components/modules/blog/PostDetail';

interface PageProps {
  params: {
    id: string;
  };
}

// Esta función es asíncrona porque vamos a esperar los datos de Firebase
export default async function BlogDetailPage({ params }: PageProps) {
  // 1. Obtenemos el ID de la URL
  const { id } = params;

  // 2. Buscamos los datos en Firebase Realtime Database
  const post = await getPostById(id);

  // 3. Si no existe el post, mostramos la página 404 de Next.js
  if (!post) {
    notFound();
  }

  // 4. Renderizamos tu componente visual pasándole los datos
  return <PostDetail post={post} />;
}