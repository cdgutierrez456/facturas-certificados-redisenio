
export default function CardGridHome() {
  const cards = [
    { id: 1, text: 'Selecciona tu operador: Claro, Movistar, Tigo, WOM o Virgin' },
    { id: 2, text: 'Ingresa el número de referencia de factura o de línea' },
    { id: 3, text: 'Agrega varias facturas si lo necesitas, incluso de diferentes operadores.' },
    { id: 4, text: 'Paga en línea con total seguridad ¡Listo! Recibes la confirmación al instante' },
  ];

  return (
    <section className="bg-grey-light py-10 px-5">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-left">
          Pagar tus facturas nunca fue tan fácil <br />
          en solo <span className='text-yellow'>4 pasos</span> pagaras todas tus facturas
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div key={card.id} className="bg-white shadow-md rounded-2xl p-6 text-center h-52 flex justify-center items-center flex-col">
            <p className="text-yellow text-3xl font-bold">{index + 1}</p>
            <p className="text-base text-gray-700 mt-2">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
