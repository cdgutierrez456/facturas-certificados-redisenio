"use client"
import { useState, useEffect } from "react"
import { Pago } from "app/components/pago/Pago"
import { PSE } from "app/components/pago/PSE"
import styles from "./Payment.module.sass"
import { useSearchParams } from "next/navigation"

export const dynamic = 'force-dynamic';

export default function DescripcionPago() {
  const [totalPagar, setTotalPagar] = useState(0)
  const [cantidad, setCantidad] = useState(0)
  const searchParams = useSearchParams()
  const dataLlegada = searchParams.get("data")

  useEffect(() => {
    if (dataLlegada && typeof dataLlegada === "string") {
      try {
        // Parsear y mostrar los datos enviados en la consola
        const parsedData = JSON.parse(dataLlegada)
        if (Array.isArray(parsedData)) {
          console.log("Cantiadad Datos recibidos:", parsedData.length)
          parsedData.length
          setCantidad(parsedData.length)
        } else {
          console.error("Los datos no son un array")
        }
      } catch (error) {
        console.error("Error al parsear los datos:", error)
      }
    }
  }, [])

  return (
    <main className={styles.Container}>
      <h2>Descripción del pago</h2>
      <Pago onTotalChange={setTotalPagar} />
      
      <h2>Medios de pago</h2>
      <PSE total={totalPagar} cantidad={cantidad} />
    </main>
  )
}
