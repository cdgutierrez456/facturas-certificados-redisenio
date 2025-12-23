'use client'
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FaqList } from "@/utils/faqsListData";

export default function FAQSection() {
  const faqs = FaqList;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white">
      <div className="bg-[url(/images/FAQ-img.jpg)] bg-no-repeat bg-center bg-cover h-[300px] flex items-center">
        <h1 className="text-white w-full max-w-7xl mx-auto text-4xl md:text-7xl font-bold px-4">
          Preguntas Frecuentes
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-7">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Lorem ipsum dolor sit amet <br />
            consectetur leo mi nullam
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm border p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-yellow-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 20h.01M7 4h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {faq.question}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    {isOpen ? (
                      <Minus className="w-6 h-6" />
                    ) : (
                      <Plus className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Contenido expandible con animación */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-[300px] opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-10 pr-2 text-sm text-gray-700">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}