'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { realizarConsulta } from '@/services/megaRed/consultaServiciosMoviles';

import { NormalOperator } from '@/interfaces/Operators';
import { DataInvoiceDTO } from '@/interfaces/Operators';
import { dataInvoiceSchema } from '@/schemas/operators';

import { showToast, showAlert } from '@/utils/alerts';

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
  infoOperator: any
}

export default function BillingForm({ setColorOnStep, infoOperator }: BillingFormProps) {
  const [bills, setBills] = useState<DataInvoiceDTO[]>([]);
  const [totalAmount, setTotalAmount] = useState(0)

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<DataInvoiceDTO>({
    resolver: zodResolver(dataInvoiceSchema),
    defaultValues: {
      operator: operatorList[0].value
    }
  });
  const operatorValue = watch("operator");
  const selectedOperatorObj = operatorList.find(op => op.value === operatorValue) || operatorList[0];

  useEffect(() => {
    setValue('operator', infoOperator.value)
  }, [])

  const onSubmit: SubmitHandler<DataInvoiceDTO> = async (data) => {
    const bill: DataInvoiceDTO = {
      operator: selectedOperatorObj.label,
      referenceMethod: data.referenceMethod || 'referencia',
      referenceNumber: data.referenceNumber
    }
    const isDuplicate = bills.some(actBill =>
      actBill.referenceNumber === data.referenceNumber &&
      actBill.operator === selectedOperatorObj.label
    );
    if (isDuplicate) {
      showToast('warning', 'Este número de referencia ya ha sido agregado a la lista.');
      return;
    }

    try {
      const response: any = await realizarConsulta(
        data.referenceMethod === 'celular' ? data.referenceNumber : '',
        data.referenceNumber,
        data.referenceMethod === 'celular' ? 'AUTOMATIC' : 'MANUAL',
        selectedOperatorObj.value,
        '0'
      );
      if (response.error) {
        showAlert({ type: 'error', message: 'Error en la consulta de la referencia, verifica la información.' });
        return;
      }
      setTotalAmount((actVal) => actVal += response.data?.data_pay?.amount || 0)
      setBills((prev) => [...prev, bill]);
      reset();
    } catch (error) {
      showAlert({ type: 'error', message: 'Error en la consulta de la referencia, verifica la información.' });
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2, // Asegura 2 decimales siempre
      maximumFractionDigits: 2,
    }).format(value);
  };

  const onErrors = () => {
    showToast('error', 'Todos los campos son requeridos')
  }

  const handleDelete = (index: number) => {
    setBills(bills.filter((_, idx) => idx !== index));
  };

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
                className="font-semibold text-gray-700 w-full"
              >
                {
                  operatorList.map(operator => (
                    <option key={operator.value} value={operator.value}>{operator.label}</option>
                  ))
                }
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
            <span className="text-red-500 text-sm -mt-2">
              { errors.referenceNumber.message }
            </span>
          )}
        </div>
        <div className="w-full md:w-auto">
          <button
            type='submit'
            disabled={isSubmitting}
            className="w-full md:w-auto bg-white border border-gray-100 shadow-md rounded-full py-2 px-4 font-bold text-gray-900 hover:bg-gray-50 transition"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Agregar
              </>
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
          {bills.map((bill, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600 px-2 py-1">
              <div className="col-span-3 font-medium">{bill.operator}</div>
              <div className="col-span-5">{bill.referenceMethod === 'referencia' ? 'Número de referencia' : 'Número de celular'}</div>
              <div className="col-span-4 flex justify-between items-center pl-2">
                <span>{bill.referenceNumber}</span>
                <button
                  onClick={() => handleDelete(idx)}
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
          Total a pagar: { formatCurrency(totalAmount) } COP
        </div>

        <button className="w-full md:w-auto bg-yellow hover:bg-yellow-500 text-black font-bold py-3 px-12 rounded-full shadow-lg shadow-yellow-400/20 transition hover:scale-105">
          Pagar
        </button>
      </div>

    </div>
  );
}