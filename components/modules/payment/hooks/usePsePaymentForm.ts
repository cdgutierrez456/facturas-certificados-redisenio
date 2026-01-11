'use client'

import { useEffect, useState } from "react"
import { consultarBancos, realizarLoging } from "@/services/megaPagos/consultasMegaPagos"

export const usePsePaymentForm = () => {

  const [banks, setBanks] = useState<any[]>([])
  const [accessToken, setAccessToken] = useState('')
  const [idUsuario, setIdUsuario] = useState('')

  useEffect(() => {
    getListBanks()
  }, [])

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
    parseCurrencyToNumber
  }
}
