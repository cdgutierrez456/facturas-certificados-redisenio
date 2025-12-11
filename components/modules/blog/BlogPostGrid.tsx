import PostCard from "./PostCard"

interface BlogPostGridProps {
  limit?: number
}

export default function BlogPostGrid({ limit }: BlogPostGridProps) {
  return (
    <section className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-evenly">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </section>
  )
}
