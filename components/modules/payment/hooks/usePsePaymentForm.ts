'use client'

import { useEffect, useState } from "react"
import { consultarBancos, realizarLoging } from "@/services/megaPagos/consultasMegaPagos"

export const usePsePaymentForm = () => {

  const [banks, setBanks] = useState<any[]>([])
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    getListBanks()
  }, [])

  const getListBanks = async () => {
    const consulta = await realizarLoging();
    setAccessToken(`${consulta.data?.token?.accessToken}`)
    const bankResponse = await consultarBancos(accessToken)
    // console.log('bankResponse', bankResponse);
  }

  return {
    banks
  }
}
