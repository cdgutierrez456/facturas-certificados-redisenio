import Image from "next/image";

const items = [
  {
    title: '¿Qué operadores móviles puedo pagar aquí?',
    label: 'Puedes pagar tus facturas de Claro, Movistar, Tigo, WOM y Virgin Mobile en Colombia.'
  },
  {
    title: '¿Tiene algún costo adicional el servicio?',
    label: 'No. Nuestro servicio es 100% gratuito, sin comisiones ni cargos ocultos.'
  },
  {
    title: '¿Puedo pagar varias facturas en un solo pago?',
    label: 'Sí, puedes agrupar diferentes facturas, incluso de distintos operadores, y pagarlas todas juntas.'
  },
]

export default function FeaturesHome () {
  return (
    <section className="bg-white w-full py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-10 justify-evenly">
        <div className="relative h-[348px] w-[310px] md:h-[448px] md:w-[410px]">
          <Image
            src="/images/rectangle_9061.png"
            alt="Mujer usando laptop"
            fill
            className="object-contein"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Claro, Movistar, Tigo, WOM y Virgin… <br />
            ¡paga todas tus líneas con un solo clic!
          </h2>

          <ul className="space-y-6">
            {items.map((num, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="bg-yellow text-black font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{num.title}</h3>
                  <p className="text-sm text-gray-700">
                    {num.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};
