import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Servicios y Utilidades
import { realizarConsulta } from '@/services/megaRed/consultaServiciosMoviles';
import { showToast, showAlert } from '@/utils/alerts';
import { dataInvoiceSchema } from '@/schemas/operators';

// Tipos
import { NormalOperator, DataInvoiceDTO } from '@/interfaces/Operators';

// Constantes (Podrían ir en un archivo de constantes aparte)
const operatorList: NormalOperator[] = [
  { label: 'Claro', value: '14', src: '/images/claro-logo.png' },
  { label: 'Movistar', value: '17', src: '/images/movistar.png' },
  { label: 'Tigo', value: '299', src: '/images/tigo.png' },
  { label: 'Virgin', value: '383', src: '/images/virgin.png' },
  { label: 'Wom', value: '3771', src: '/images/wom.png' },
];

type stepsNames = 'Paso 1 de 3' | 'Paso 2 de 3' | 'Paso 3 de 3';

export const useBillingForm = (initialOperator: any, setColorOnStep: (nameStep: stepsNames) => void) => {
  const router = useRouter()
  const [arrayDataPay, setArrayDataPay] = useState<any[]>([]);
  const [bills, setBills] = useState<DataInvoiceDTO[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [lastValueFromService, setLastValueFromService] = useState(0)

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<DataInvoiceDTO>({
    resolver: zodResolver(dataInvoiceSchema),
    // defaultValues: {
    //   operator: operatorList[0].value,
    //   referenceNumber: '784511440012'
    // }
  });

  const operatorValue = watch("operator");
  const selectedOperatorObj = operatorList.find(op => op.value === operatorValue) || operatorList[0];

  useEffect(() => {
    if (initialOperator?.value) {
      setValue('operator', initialOperator.value);
    }
  }, [initialOperator, setValue]);

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
    localStorage.setItem('dataPays', JSON.stringify(arrayDataPay));
  }, [bills])

  const onSubmit: SubmitHandler<DataInvoiceDTO> = async (data) => {
    const bill: DataInvoiceDTO = {
      operator: selectedOperatorObj.label,
      referenceMethod: data.referenceMethod || 'referencia',
      referenceNumber: data.referenceNumber
    };

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

      setTotalAmount((actVal) => actVal + (response.data?.data_pay?.amount || 0));
      setLastValueFromService(response.data?.data_pay?.amount || 0)
      setBills((prev) => [...prev, bill]);
      setArrayDataPay((prev) => [...prev, response.data?.data_pay]);
      reset();
    } catch (error) {
      showAlert({ type: 'error', message: 'Error en la consulta de la referencia, verifica la información.' });
    }
  };

  const onErrors = () => {
    showToast('error', 'Todos los campos son requeridos');
  };

  const handleDelete = (index: number) => {
    const newBills = bills.filter((_, idx) => idx !== index);
    setBills(newBills);
    setTotalAmount((actVal) => actVal - lastValueFromService)
    if (!newBills.length) setColorOnStep('Paso 1 de 3');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    operatorList,
    operatorValue,
    selectedOperatorObj,
    bills,
    totalAmountFormatted: formatCurrency(totalAmount),
    onSubmit,
    onErrors,
    handleDelete
  };
};