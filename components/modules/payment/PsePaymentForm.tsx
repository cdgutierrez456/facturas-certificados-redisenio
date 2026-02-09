'use client';

import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, X } from 'lucide-react';
import { z } from 'zod'

import { usePsePaymentForm } from './hooks/usePsePaymentForm';

import { paymentSchema } from '@/schemas/paymentSchema';

import { consultarLlave, realizarPagoPSE } from '@/services/megaPagos/consultasMegaPagos';
import { manejarEncriptacion } from '@/utils/encript';
import { showToast } from '@/utils/alerts';
import Link from 'next/link';

// Inferir el tipo de datos desde el schema
type PaymentFormData = z.infer<typeof paymentSchema>;

type stepsNames = 'Paso 1 de 3' | 'Paso 2 de 3' | 'Paso 3 de 3';

interface PsePaymentFormProps {
  totalToPay: string;
  setColorOnStep: (nameStep: stepsNames) => void;
}

export default function PsePaymentForm({ totalToPay, setColorOnStep }: PsePaymentFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      userType: 'person',
      idType: 'CedulaDeCiudadania',
      bank: '0',
      idNumber: '111933594',
      fullName: 'Cristian David Gutierrez',
      cellphone: '3128079460',
      email: 'email@gmail.com',
      confirmEmail: 'email@gmail.com'
    }
  });
  const {
    banks,
    idUsuario,
    accessToken,
    parseCurrencyToNumber,
    isCompany
  } = usePsePaymentForm({ watch, setValue })

  const onSubmit: SubmitHandler<PaymentFormData> = async (infoForm) => {
    const data = {
      data: {
        extraData: {
          idusuario: idUsuario,
          idtipooperacion: 5,
          idtiposolicitud: 5,
          linkcode: "-1",
          solicitudenvio: "N",
          // externalurl: "http://localhost:3000/paid",
          externalurl: "https://facturas-certificados-redisenio.vercel.app/paid",
        },
        step1: {
          name: "Servicios Moviles",
          description: "Pago Servicios Moviles",
          value: parseCurrencyToNumber(totalToPay),
          in_stock: true,
          idimpuesto: 21,
          shipping_cost: 0,
          requested_units: 1,
          total_amount: parseCurrencyToNumber(totalToPay),
          payment_amount: 0,
        },
        step3: {
          terms_and_conditions: true,
          payment_method: "pse",
          biller_name: infoForm.fullName,
          biller_email: infoForm.email,
          biller_address: "Colombia",
          payment_info: {
            pse_bank: infoForm.bank,
            pse_person_type: infoForm.userType,
            pse_document: infoForm.idNumber,
            pse_name: infoForm.fullName,
            pse_phone: infoForm.cellphone,
            pse_document_type: infoForm.idType,
          },
        },
      },
    };
    const dataString = JSON.stringify(data);
    const keysResponse = await consultarLlave();
    const publicKey = keysResponse.data.public_key;
    const resultadoEncriptado = await manejarEncriptacion(dataString, publicKey)
    if (resultadoEncriptado) {
      const pago = await realizarPagoPSE(accessToken, resultadoEncriptado)
      const { pseURL, transactionId } = pago.data
      localStorage.setItem('transactionId', transactionId)
      router.push(pseURL)
    }
  };

  const onErrors = () => {
    showToast('error', 'Verifica la información del formulario')
  }

  const inputClasses = "w-full bg-white border-none rounded-full py-2 px-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300";
  const labelClasses = "block text-sm font-bold text-gray-800 mb-1 ml-1";
  const errorClasses = "text-red-500 text-xs mt-1 ml-2 flex items-center gap-1";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl relative">
      <button
        className='absolute top-7 right-7 cursor-pointer'
        onClick={() => setColorOnStep('Paso 2 de 3')}
      >
        <X size={20} strokeWidth={3} color='black' />
      </button>
      <div className="w-full bg-white rounded-[30px] shadow-2xl">
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="relative w-12 h-12">
              <Image
                src="/images/pseImage.svg"
                alt="PSE Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Realiza tu pago por PSE</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

              <div>
                <label className={labelClasses}>¿Eres Persona Natural o Jurídica?</label>
                <div className="relative">
                  <select {...register('userType')} className={`${inputClasses} appearance-none`}>
                    <option value="">Seleccione</option>
                    <option value="person">Persona Natural</option>
                    <option value="company">Persona Jurídica</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errors.userType && <p className={errorClasses}><AlertCircle size={12}/> {errors.userType.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Tipo de Identificación</label>
                <div className="relative">
                  <select {...register('idType')} disabled={isCompany} className={`${inputClasses} appearance-none ${isCompany ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <option value="">Seleccione</option>
                    <option value="RegistroCivilDeNacimiento">Registro Civil de Nacimiento</option>
                    <option value="TarjetaDeIdentidad">Tarjeta de Identidad</option>
                    <option value="CedulaDeCiudadania">Cédula de Ciudadanía</option>
                    <option value="TarjetaDeExtranjeria">Tarjeta de Extranjería</option>
                    <option value="CedulaDeExtranjeria">Cédula de Extranjería</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="DocumentoDeIdentificacionExtranjero">Documento de Identificación Extranjero</option>
                    <option value="NIT">NIT</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errors.idType && <p className={errorClasses}><AlertCircle size={12}/> {errors.idType.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Número de Identificación</label>
                <input
                  type="text"
                  {...register('idNumber')}
                  className={inputClasses}
                  placeholder="Ej. 123456789"
                />
                {errors.idNumber && <p className={errorClasses}><AlertCircle size={12}/> {errors.idNumber.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Nombre completo *</label>
                <input
                  type="text"
                  {...register('fullName')}
                  className={inputClasses}
                  placeholder="Ej. Juan Pérez"
                />
                {errors.fullName && <p className={errorClasses}><AlertCircle size={12}/> {errors.fullName.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Celular</label>
                <input
                  type="tel"
                  {...register('cellphone')}
                  className={inputClasses}
                  placeholder="3123456789"
                  maxLength={10}
                />
                {errors.cellphone && <p className={errorClasses}><AlertCircle size={12}/> {errors.cellphone.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Correo electrónico*</label>
                <input
                  type="email"
                  {...register('email', {
                    onChange: () => trigger('confirmEmail'),
                  })}
                  className={inputClasses}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && <p className={errorClasses}><AlertCircle size={12}/> {errors.email.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Confirmar correo*</label>
                <input
                  type="email"
                  {...register('confirmEmail', {
                    onChange: () => trigger('confirmEmail'),
                  })}
                  className={inputClasses}
                  placeholder="Confirma tu correo"
                />
                {errors.confirmEmail && <p className={errorClasses}><AlertCircle size={12}/> {errors.confirmEmail.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Banco</label>
                <div className="relative">
                  <select {...register('bank')} className={`${inputClasses} appearance-none`}>
                    {banks.map((bank) => (
                      <option key={bank.financialInstitutionCode} value={bank.financialInstitutionCode}>
                        {bank.financialInstitutionName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errors.bank && <p className={errorClasses}><AlertCircle size={12}/> {errors.bank.message}</p>}
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('terms')}
                  className="w-5 h-5 border-gray-300 rounded text-yellow-500 focus:ring-yellow-400 cursor-pointer"
                />
              </div>
              <div className="ml-1 text-sm">
                <label className="font-bold text-yellow cursor-pointer ">
                  Acepto <Link href={'/terms'}>Términos y condiciones</Link> y <Link href={'/politicas-privacidad'}>Políticas de privacidad</Link>.
                </label>
                {errors.terms && <p className={errorClasses}><AlertCircle size={12}/> {errors.terms.message}</p>}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-4 border-t border-gray-100 gap-4">
              <div className="text-xl font-bold text-gray-900">
                Total a pagar: {totalToPay}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-12 rounded-full shadow-lg shadow-yellow-400/30 transition hover:scale-105 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Procesando...</>
                ) : (
                  'Pagar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}