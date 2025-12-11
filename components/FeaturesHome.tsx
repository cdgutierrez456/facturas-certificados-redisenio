import Image from "next/image";

export default function FeaturesHome () {
  return (
    <section className="bg-white w-full py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-10 justify-evenly">
        <div className="relative h-[448px] w-[410px]">
          <Image
            src="/images/rectangle_9061.png"
            alt="Mujer usando laptop"
            fill
            className="object-contein"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Lorem ipsum dolor sit amet <br />
            consectetur leo mi nullam
          </h2>

          <ul className="space-y-6">
            {[1, 2, 3].map((num) => (
              <li key={num} className="flex items-start gap-4">
                <div className="bg-yellow-400 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {num}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Lorem ipsum</h3>
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet consectetur. Turpis eu ultricies odio sed. Justo at quam ornare
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
