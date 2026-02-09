import BlogPostGrid from "./BlogPostGrid"
import CallToAction from "./CallToAction"
import CustomInput from "@/components/shared/CustomInput"

export default function BlogPage() {
  return (
    <section className='w-full flex flex-col'>
      <div className='bg-[url(/images/blog-person-yellow-shirt.jpg)] bg-no-repeat bg-center bg-cover h-[300px] flex items-center'>
        <h1 className="text-white w-full max-w-7xl mx-auto text-7xl">Blog</h1>
      </div>
      <section className="flex flex-col bg-white w-full py-10">
        <div className="w-full max-w-7xl mx-auto">
          <CustomInput />
        </div>
        <CallToAction />
      </section>
      <section className="bg-white w-full">
        <BlogPostGrid />
      </section>
    </section>
  )
}
