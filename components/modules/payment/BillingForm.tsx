'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Info, ChevronDown, X } from 'lucide-react';

type stepsNames = 'Paso 1 de 3' | 'Paso 2 de 3' | 'Paso 3 de 3'
const INITIAL_BILLS = [
  { id: 1, operator: 'Claro', method: 'Número de referencia', number: '12345678' },
  { id: 2, operator: 'Tigo', method: 'Número de celular', number: '312 345 6789' },
  { id: 3, operator: 'Wom', method: 'Número de celular', number: '312 345 6789' },
  { id: 4, operator: 'Movistar', method: 'Número de referencia', number: '12345678' },
  { id: 5, operator: 'Claro', method: 'Número de referencia', number: '12345678' },
  { id: 6, operator: 'Tigo', method: 'Número de celular', number: '312 345 6789' },
];

interface BillingFormProps {
  setColorOnStep: (nameStep: stepsNames) => void
}

export default function BillingForm({ setColorOnStep }: BillingFormProps) {
  const [bills, setBills] = useState(INITIAL_BILLS);

  // Función para eliminar un item de la lista (interactividad básica)
  const handleDelete = (id: number) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-[40px] p-8 shadow-2xl relative">
      <button
        className='absolute top-5 right-5 cursor-pointer'
        onClick={() => setColorOnStep('Paso 1 de 3')}
      >
        <X size={20} strokeWidth={3} color='black' />
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Digitá los datos de factura</h2>
      <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
        <div className="w-full md:w-1/3 space-y-2">
          <label className="text-sm font-bold text-gray-900 ml-1">Operador</label>
          <button className="w-full bg-white border border-gray-100 shadow-md rounded-full py-3 px-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 w-full">
              <Image
                src='/images/claro-logo.png'
                alt="Imagen temporal"
                height={30}
                width={30}
              />
              <select className="font-semibold text-gray-700 w-full">
                <option value="">Claro</option>
              </select>
            </div>
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-orange-50/50 border border-yellow-300 rounded-2xl p-2 px-4 relative">
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-bold text-gray-900">Número de referencia</label>
              <Info size={16} className="fill-yellow-500 text-white" />
            </div>
            <input
              type="text"
              placeholder="12345678"
              className="w-full bg-white border-none rounded-full py-2 px-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
            />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button className="w-full md:w-auto bg-white border border-gray-100 shadow-md rounded-full py-3.5 px-8 font-bold text-gray-900 hover:bg-gray-50 transition">
            Agregar
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-3xl p-6 mb-8">
        <div className="grid grid-cols-12 gap-4 mb-4 px-2 text-sm font-bold text-black">
          <div className="col-span-3">Operador</div>
          <div className="col-span-5">Método de consulta</div>
          <div className="col-span-4 pl-2">Número de consulta</div>
        </div>

        <div className="max-h-48 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {bills.map((bill) => (
            <div key={bill.id} className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600 px-2 py-1">
              <div className="col-span-3 font-medium">{bill.operator}</div>
              <div className="col-span-5">{bill.method}</div>
              <div className="col-span-4 flex justify-between items-center pl-2">
                <span>{bill.number}</span>
                <button
                  onClick={() => handleDelete(bill.id)}
                  className="p-1 bg-gray-800 rounded text-white hover:bg-gray-700 transition"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-2 gap-4">
        <div className="text-xl font-bold text-black">
          Total a pagar: $000,000
        </div>

        <button className="w-full md:w-auto bg-yellow hover:bg-yellow-500 text-black font-bold py-3 px-12 rounded-full shadow-lg shadow-yellow-400/20 transition hover:scale-105">
          Pagar
        </button>
      </div>

    </div>
  );
}