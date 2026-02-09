'use client'

import { CheckCircle, ClockArrowUp, Ban } from 'lucide-react';
import Link from 'next/link';

import { usePsePaymentForm } from './hooks/usePsePaymentForm';

import InvoiceViewer from './InvoiceViewer';

interface PaymentStatusProps {
  infoTransaction: any;
}

export default function PaymentStatus({ infoTransaction }: PaymentStatusProps) {
  const { banks } = usePsePaymentForm({})

  const getNameBank = (idBank: any) => {
    const selectedBank = banks.find(item => item.financialInstitutionCode == idBank)
    return selectedBank ? selectedBank.financialInstitutionName : ''
  }

  const info = infoTransaction;
  const statusInfo: any = {
    1: { value: 1, text: 'Aprobada', class: 'approved' },
    9: { value: 9, text: 'Rechazada', class: 'failed' },
    109: { value: 109, text: 'Rechazada', class: 'failed' },
    11: { value: 11, text: 'Pendiente', class: 'pendind' },
    17: { value: 17, text: 'Anulada', class: 'failed' }
  }

  if (!info.status || !Object.entries(info).length || !banks?.length) return (
    <div className="min-h-screen relative flex items-center justify-center z-10 pt-[110px]">
      <div className="bg-white w-full max-w-2xl rounded-[30px] shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-300">
        <p className='text-black'>Cargando datos...</p>
      </div>
    </div>
  );

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-start py-1 border-b border-gray-50 last:border-0 transition-colors sm:px-2 rounded-lg m-0">
      <span className="font-bold text-gray-900 text-sm sm:text-base">{label}</span>
      <span className="text-gray-600 text-right text-sm sm:text-base break-all ml-4">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen relative flex items-center justify-center z-10 pt-[110px] flex-col">
      <div className="bg-white w-full max-w-2xl rounded-[30px] shadow-2xl px-8 md:px-10 py-5 md:py-8 animate-in fade-in zoom-in duration-300">

        {statusInfo[info?.status || '']?.value == 1 && (
          <div className="flex flex-col items-center justify-center mb-8 gap-3">
            <CheckCircle className="text-yellow w-16 h-16" strokeWidth={2.5} />
            <h1 className="text-3xl font-bold text-yellow-500">Pago aprobado</h1>
          </div>
        )}
        {statusInfo[info?.status || '']?.value == 11 && (
          <div className="flex flex-col items-center justify-center mb-8 gap-3">
            <ClockArrowUp className="text-[#023047] w-16 h-16" strokeWidth={2.5} />
            <h1 className="text-3xl font-bold text-[#023047]">Pago pendiente</h1>
          </div>
        )}
        {(
          statusInfo[info?.status || '']?.value != 11 &&
          statusInfo[info?.status || '']?.value != 1
        ) && (
          <div className="flex flex-col items-center justify-center mb-8 gap-3">
            <Ban className="text-red-600 w-16 h-16" strokeWidth={2.5} />
            <h1 className="text-3xl font-bold text-red-600">Pago rechazado</h1>
          </div>
        )}

        <div className="space-y-3 mb-5">
          <InfoRow label="Código de pago:" value={info.externalDetails?.payment_code || ''} />
          <InfoRow label="Estado:" value={statusInfo[info?.status || '']?.text} />
          <InfoRow label="Fecha de pago:" value={info.internalDetails?.date_payment || ''} />
          <InfoRow label="Medio de pago:" value={'PSE'} />
          <InfoRow label="Banco:" value={getNameBank(info.externalDetails?.entity_franquise || '')} />
          <InfoRow label="Email del pagador:" value={info?.payerDetails?.email || ''} />
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-gray-500 text-sm max-w-md">
            Estamos finalizando el pago de tu factura, por favor espera.
            Consulta el resultado a través del siguiente botón
          </p>

          <Link
            href="/"
            className="bg-yellow hover:bg-yellow-500 text-black font-bold py-3 px-10 rounded-full shadow-lg shadow-yellow-400/30 transition-transform transform hover:scale-105 active:scale-95"
          >
            Consultar resultado
          </Link>
        </div>

      </div>
      {/* {statusInfo[info?.status || '']?.value == 1 && (
        <InvoiceViewer />
      )} */}
      <InvoiceViewer />
    </div>
  );
}