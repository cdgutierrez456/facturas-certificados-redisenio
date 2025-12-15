import Image from "next/image";

const blogs = [
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.",
    image: "/images/rectangle_9063.png",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.",
    image: "/images/rectangle_9063.png",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.",
    image: "/images/rectangle_9063.png",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.",
    image: "/images/rectangle_9063.png",
  },
];

export default function BlogCarousel() {
  return (
    <section className="bg-grey-light my-5">
      <section className="w-full max-w-7xl mx-auto py-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Conoce algunos de lo temas <br /> de nuestro <span className="text-black">Blog</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl overflow-hidden text-center p-4 flex flex-col items-center"
            >
              <div className="w-full h-56 relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">{blog.title}</h3>
              <p className="text-sm text-gray-700">{blog.description}</p>

              <button className="mt-4 bg-white text-black font-medium px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
                Ver más
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === 0 ? "bg-yellow" : "bg-gray-400"}`}
            ></button>
          ))}
        </div>
      </section>
    </section>
  );
}