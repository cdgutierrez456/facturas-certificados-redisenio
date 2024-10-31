import { DescriptionP } from "app/components/description/DescriptionPago";
import styles from "./Description.module.sass";

export default function DescripcionPago(){
  return (
    <main className={styles.Container}>
      <h2>Descripcion del pago</h2>
      <DescriptionP />
    </main>
  ) 
}