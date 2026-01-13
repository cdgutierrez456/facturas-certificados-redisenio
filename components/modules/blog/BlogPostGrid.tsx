'use client'

import { usePosts } from "../admin/hooks/useBlogTable";
import PostCard from "./PostCard"

interface BlogPostGridProps {
  limit?: number
}

export default function BlogPostGrid({ limit }: BlogPostGridProps) {
  const { posts, loading } = usePosts();
  return (
    <section className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-evenly">
      {loading ? (
        <div className="text-black text-2xl">Cargando publicaciones...</div>
      ) : (
        <>
          {posts.length ? (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  img={post.img}
                  id={post.id}
                  date={post.date}
                  dateModified={post.dateModified}
                  descriptionImg={post.descriptionImg}
                  hideDate={post.hideDate}
                  htmlContent={post.htmlContent}
                  introduction={post.introduction}
                  titleH1={post.titleH1}
                  titleUrl={post.titleUrl}
                />
              ))}
            </>
          ): (
            <div className="text-black text-2xl">Aun no hay publicaciones creadas</div>
          )}
        </>
      )}
    </section>
  )
}
