import { Smartphone } from 'lucide-react';

export default function CardGridHome() {
  const cards = [
    { id: 1, title: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.' },
    { id: 2, title: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.' },
    { id: 3, title: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.' },
    { id: 4, title: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed.' },
  ];

  return (
    <section className="bg-grey-light py-10 px-5">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Lorem ipsum dolor sit amet <br />
          <span className="font-bold">consectetur Leo mi nullam</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cards.map(card => (
          <div key={card.id} className="bg-white shadow-md rounded-2xl p-6 text-center">
            <Smartphone className="mx-auto text-yellow w-10 h-10 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
