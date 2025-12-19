'use client';

import { useState } from 'react';
import Image from 'next/image';

import { X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { NormalOperator } from '@/interfaces/Operators';
import { DataInvoiceDTO } from '@/interfaces/Operators';
import { dataInvoiceSchema } from '@/schemas/operators';

type stepsNames = 'Paso 1 de 3' | 'Paso 2 de 3' | 'Paso 3 de 3'

const operatorList: NormalOperator[] = [
  { label: 'Claro', value: '14', src: '/images/claro-logo.png' },
  { label: 'Movistar', value: '17', src: '/images/movistar.png' },
  { label: 'Tigo', value: '299', src: '/images/tigo.png' },
  { label: 'Virgin', value: '383', src: '/images/virgin.png' },
  { label: 'Wom', value: '3771', src: '/images/wom.png' },
]

interface BillingFormProps {
  setColorOnStep: (nameStep: stepsNames) => void
}

export default function BillingForm({ setColorOnStep }: BillingFormProps) {
  const [bills, setBills] = useState<DataInvoiceDTO[]>([]);
  const [actualOperator, setActualOperator] = useState(operatorList[0])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DataInvoiceDTO>({
    resolver: zodResolver(dataInvoiceSchema),
    defaultValues: {
      value: '',
      operator: '',
      referenceMethod: '',
      referenceNumber: ''
    }
  });

  const onSubmit: SubmitHandler<DataInvoiceDTO> = (data) => {
    debugger
  }

  const onErrors = () => {
    console.log('Errors', errors);
    debugger
  }

  const handleDelete = (value: DataInvoiceDTO['value']) => {
    setBills(bills.filter(bill => bill.value !== value));
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-[40px] p-8 shadow-2xl relative">
      <button
        className='absolute top-5 right-5 cursor-pointer'
        onClick={() => setColorOnStep('Paso 1 de 3')}
      >
        <X size={20} strokeWidth={3} color='black' />
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Digitá los datos de factura</h2>
      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="flex flex-col md:flex-row gap-4 items-end mb-8">
        <div className="w-full md:w-1/3 space-y-2">
          <label className="text-sm font-bold text-gray-900 ml-1">Operador</label>
          <button className="w-full bg-white border border-gray-100 shadow-md rounded-full py-2 px-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 w-full">
              <Image
                src='/images/claro-logo.png'
                alt="Imagen temporal"
                height={25}
                width={25}
              />
              <select
                {...register('operator')}
                className="font-semibold text-gray-700 w-full"
              >
                {
                  operatorList.map(operator => (
                    <option key={operator.value} value={operator.value}>{operator.label}</option>
                  ))
                }
              </select>
            </div>
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-bold text-gray-900">Método de consulta</label>
            </div>
            <select
              {...register('referenceMethod')}
              className="w-full bg-white border-none rounded-full py-2 px-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
            >
              <option value="referencia">Número de referencia</option>
              <option value="celular">Número de celular</option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-bold text-gray-900">Número de referencia</label>
            </div>
            <input
              {...register('referenceNumber')}
              type="text"
              placeholder="12345678"
              className="w-full bg-white border-none rounded-full py-2 px-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
            />
          </div>
        </div>
        <div className="w-full md:w-auto">
          <button
            type='submit'
            className="w-full md:w-auto bg-white border border-gray-100 shadow-md rounded-full py-3.5 px-8 font-bold text-gray-900 hover:bg-gray-50 transition"
          >
            Agregar
          </button>
        </div>
      </form>

      <div className="bg-gray-50 rounded-3xl p-6 mb-8">
        <div className="grid grid-cols-12 gap-4 mb-4 px-2 text-sm font-bold text-black">
          <div className="col-span-3">Operador</div>
          <div className="col-span-5">Método de consulta</div>
          <div className="col-span-4 pl-2">Número de consulta</div>
        </div>

        <div className="max-h-48 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {bills.map((bill) => (
            <div key={bill.value} className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600 px-2 py-1">
              <div className="col-span-3 font-medium">{bill.operator}</div>
              <div className="col-span-5">{bill.referenceMethod}</div>
              <div className="col-span-4 flex justify-between items-center pl-2">
                <span>{bill.referenceNumber}</span>
                <button
                  onClick={() => handleDelete(bill.value)}
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