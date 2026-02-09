'use client';

import Image from 'next/image';
import { X, Loader2, AlertCircle } from 'lucide-react';

import { useBillingForm } from './hooks/useBillingForm';

type stepsNames = 'Paso 1 de 3' | 'Paso 2 de 3' | 'Paso 3 de 3';

interface BillingFormProps {
  setColorOnStep: (nameStep: stepsNames) => void;
  setTotalToPay: (value: string) => void;
  infoOperator: any;
}

export default function BillingForm({ setColorOnStep, setTotalToPay, infoOperator }: BillingFormProps) {
  // Consumimos toda la lógica desde el Hook
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    operatorList,
    operatorValue,
    selectedOperatorObj,
    bills,
    totalAmountFormatted,
    onSubmit,
    onErrors,
    handleDelete
  } = useBillingForm(infoOperator, setColorOnStep);

  const onChangePage = () => {
    setTotalToPay(totalAmountFormatted)
    setColorOnStep('Paso 3 de 3')
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-[40px] p-8 shadow-2xl relative">
      <button
        className='absolute top-5 right-5 cursor-pointer'
        onClick={() => setColorOnStep('Paso 1 de 3')}
      >
        <X size={20} strokeWidth={3} color='black' />
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">Digita los datos de factura</h2>

      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="flex flex-col md:flex-row gap-4 items-end mb-8">
        <div className="w-full md:w-1/3 space-y-2">
          <label className="text-sm font-bold text-gray-900 ml-1">Operador</label>
          <div className="w-full bg-white border border-gray-100 shadow-md rounded-full py-2 px-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 w-full">
              <Image
                src={selectedOperatorObj.src}
                alt={selectedOperatorObj.label}
                height={25}
                width={25}
              />
              <select
                {...register('operator')}
                className="font-semibold text-gray-700 w-full bg-transparent outline-none cursor-pointer"
              >
                {operatorList.map((operator: any) => (
                  <option key={operator.value} value={operator.value}>
                    {operator.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {operatorValue === '3771' && (
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
        )}

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
          {errors.referenceNumber && (
            <span className="text-red-500 text-xs mt-1 ml-2 flex items-center gap-1">
              <AlertCircle size={12}/> {errors.referenceNumber.message}
            </span>
          )}
        </div>

        <div className="w-full md:w-auto">
          <button
            type='submit'
            disabled={isSubmitting}
            className="w-full md:w-auto bg-white border border-gray-100 shadow-md rounded-full py-2 px-4 font-bold text-gray-900 hover:bg-gray-50 transition flex justify-center min-w-[100px]"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              'Agregar'
            )}
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
          {bills.map((bill: any, idx: number) => (
            <div key={idx} className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600 px-2 py-1">
              <div className="col-span-3 font-medium">{bill.operator}</div>
              <div className="col-span-5">
                {bill.referenceMethod === 'referencia' ? 'Número de referencia' : 'Número de celular'}
              </div>
              <div className="col-span-4 flex justify-between items-center pl-2">
                <span>{bill.referenceNumber}</span>
                <button
                  onClick={() => handleDelete(idx)}
                  className="p-1 bg-gray-800 rounded text-white hover:bg-gray-700 transition"
                  type="button"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
          {bills.length === 0 && (
            <p className="text-center text-gray-400 py-4 italic">No has agregado facturas aún</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-2 gap-4">
        <div className="text-xl font-bold text-black">
          Total a pagar: {totalAmountFormatted}
        </div>

        {bills.length ? (
          <button
            onClick={onChangePage}
            className="w-full md:w-auto bg-yellow hover:bg-yellow-500 text-black font-bold py-3 px-12 rounded-full shadow-lg shadow-yellow-400/20 transition hover:scale-105"
          >
            Pagar
          </button>
        ): (
          <button className="w-full md:w-auto bg-yellow/50 text-black font-bold py-3 px-12 rounded-full shadow-lg shadow-yellow-400/20">
            Pagar
          </button>
        )}
      </div>
    </div>
  );
}