import { DescriptionP } from "app/components/description/DescriptionPago";
import styles from "./Description.module.sass";
export const dynamic = 'force-dynamic';

export default function DescripcionPago(){
  return (
    <main className={styles.Container}>
      <h2>Descripción del pago</h2>
      <DescriptionP />
    </main>
  ) 
}