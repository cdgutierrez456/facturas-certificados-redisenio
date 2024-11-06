import { Pago } from "app/components/pago/Pago";
import { PSE } from "app/components/pago/PSE";
import styles from "./Payment.module.sass";
export const dynamic = 'force-dynamic';

export default function DescripcionPago(){
  return (
    <main className={styles.Container}>
      <h2>Descripcion del pago</h2>
      <Pago />
      <h2>Medios de pago</h2>
      <PSE/>
    </main>
  ) 
}