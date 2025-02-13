"use client"
import { useState } from "react"
import { Pago } from "app/components/pago/Pago";
import { PSE } from "app/components/pago/PSE";
import styles from "./Payment.module.sass";

export const dynamic = 'force-dynamic';

export default function DescripcionPago() {
  const [totalPagar, setTotalPagar] = useState(0);

  return (
    <main className={styles.Container}>
      <h2>Descripción del pago</h2>
      <Pago onTotalChange={setTotalPagar} />
      
      <h2>Medios de pago</h2>
      <PSE total={totalPagar} />
    </main>
  )
}
