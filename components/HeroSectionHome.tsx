import Image from "next/image";

export default function HeroSectionHome() {
  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[500px] rounded-[24px] overflow-hidden">
        <Image
          src="/images/GirlWithPhone.jpg"
          alt="Hero background"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Lorem ipsum dolor sit amet consectetur. <br />
            Leo mi nullam.
          </h2>
          <p className="text-sm md:text-base max-w-xl mb-6">
            Lorem ipsum dolor sit amet consectetur. Pharetra semper et
            nisl maecenas. Sollicitudin id diam malesuada natoque volutpat pellentesque.
          </p>
          <button className="bg-white text-black font-semibold px-8 py-2 rounded-full shadow-md hover:scale-105 transition-transform">
            Ver más
          </button>
        </div>
      </div>
    </section>
  );
}