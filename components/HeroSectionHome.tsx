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
          <p className="text-2xl font-light md:text-3xl mb-4 leading-tight">
            <span className="font-bold">Hazlo fácil</span>: paga todas tus facturas móviles en un solo lugar
          </p>
          <p className="text-2xl font-light md:text-3xl mb-4 leading-tight">
            <span className="font-bold">Claro, Movistar, Tigo, WOM y Virgin…</span> todas tus líneas, un solo pago.
          </p>
          <p className="text-2xl font-light md:text-3xl mb-4 leading-tight">
            Sin comisiones, sin complicaciones y <span className="font-bold">en segundos</span>.
          </p>
          <p className="text-2xl font-light md:text-3xl mb-4 leading-tight">
            Empieza ahora - <span className="font-bold">Paga gratis y sin filas</span>
          </p>
          <button className="bg-white text-black font-semibold px-8 py-2 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer">
            Iniciar pago
          </button>
        </div>
      </div>
    </section>
  );
}