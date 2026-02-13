import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft } from 'lucide-react'; // Necesitas lucide-react para los iconos

// 1. Definimos la interfaz basada en tu imagen JSON
interface PostData {
  id: string;
  title: string;
  titleH1: string;
  titleUrl: string;
  introduction: string;
  htmlContent: string;
  img: string;
  descriptionImg: string;
  date: string;
  dateModified?: string;
  hideDate: string | boolean; // En tu JSON vi que venía como string "false"
}

// Props del componente
interface PostDetailProps {
  post: PostData;
}

export default function PostDetail({ post }: PostDetailProps) {

  // Función auxiliar para formatear la fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="min-h-screen bg-gray-50 pb-16">

      <div className="border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-yellow transition-colors font-medium"
          >
            <ChevronLeft size={20} className="mr-1" />
            Volver al blog
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <header className="mb-8 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold tracking-wider mb-4 uppercase">
            Artículo
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {post.titleH1 || post.title}
          </h1>

          {/* Metadatos (Fecha) */}
          {post.hideDate === 'false' && (
            <div className="flex items-center justify-center md:justify-start text-gray-500 text-base gap-4">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              {post.dateModified && post.dateModified !== post.date && (
                <div className="flex items-center gap-1 text-gray-400 italic">
                  <Clock size={16} />
                  <span>Actualizado: {formatDate(post.dateModified)}</span>
                </div>
              )}
            </div>
          )}
        </header>

        <figure className="relative w-full h-64 md:h-[400px] rounded-2xl overflow-hidden shadow-lg mb-10">
          <Image
            src={post.img}
            alt={post.descriptionImg || post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          {post.descriptionImg && (
            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-xs text-center md:text-left">
              {post.descriptionImg}
            </figcaption>
          )}
        </figure>

        {post.introduction && (
          <div className="bg-white border-l-4 border-yellow p-6 rounded-r-lg shadow-sm mb-10">
            <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
              {post.introduction}
            </p>
          </div>
        )}

        {/* --- Contenido HTML (Cuerpo del post) --- */}
        <div
          className="prose prose-lg prose-yellow max-w-none bg-white p-6 md:p-10 rounded-2xl shadow-sm
            prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-8
            prose-a:text-yellow prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-li:text-gray-700 text-black"
        >
          {/* Renderizado de HTML seguro */}
          <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
        </div>

      </div>

      {/* --- Footer del artículo (Opcional) --- */}
      <div className="max-w-4xl mx-auto px-4 mt-12 border-t pt-8">
        <p className="text-center text-gray-500 text-base">
          ¿Te gustó este artículo? ¡Compártelo!
        </p>
        {/* Aquí podrías agregar botones de redes sociales */}
      </div>
    </article>
  );
}