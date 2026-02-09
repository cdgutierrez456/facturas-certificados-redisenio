'use client'

import { useEffect, useState } from "react"
import { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { consultarBancos, realizarLoging } from "@/services/megaPagos/consultasMegaPagos"

interface UsePsePaymentFormProps {
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
}

export const usePsePaymentForm = ({ watch, setValue }: UsePsePaymentFormProps) => {

  const [banks, setBanks] = useState<any[]>([])
  const [accessToken, setAccessToken] = useState('')
  const [idUsuario, setIdUsuario] = useState('')

  const userType = watch('userType')
  const isCompany = userType === 'company'

  useEffect(() => {
    getListBanks()
  }, [])

  useEffect(() => {

    if (isCompany) setValue('idType', 'NIT')
    else setValue('idType', 'CedulaDeCiudadania')

  }, [isCompany, setValue])

  const getListBanks = async () => {
    const consulta = await realizarLoging();
    localStorage.setItem('accessToken', `${consulta.data?.token?.accessToken}`)

    setIdUsuario(consulta.data?.comercio.idusuario)
    setAccessToken(`${consulta.data?.token?.accessToken}`)

    const bankResponse = await consultarBancos(consulta.data.token.accessToken)
    setBanks(bankResponse.data)
  }

  const parseCurrencyToNumber = (currencyString: string): number => {
    if (!currencyString) return 0;
    const cleanString = currencyString.replace(/\./g, '').replace(/[^0-9,]/g, '');
    const dotString = cleanString.replace(',', '.');
    return parseFloat(dotString);
  };

  return {
    banks,
    idUsuario,
    accessToken,
    parseCurrencyToNumber,
    isCompany
  }
}
