"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import styles from "./Pago.module.sass"
import { useRouter } from "next/navigation";

interface PagoProps {
  onTotalChange: (total: number) => void;
}

export const Pago = ({ onTotalChange }: PagoProps) => {
  const [facturaData, setFacturaData] = useState<any[]>([]); // Array para almacenar los datos
  const router = useRouter();
  const searchParams = useSearchParams()
  const dataLlegada = searchParams.get("data")

  useEffect(() => {
    if (dataLlegada && typeof dataLlegada === "string") {
      try {
        // Parsear y mostrar los datos enviados en la consola
        const parsedData = JSON.parse(dataLlegada);
        if (Array.isArray(parsedData)) {
          console.log("Datos recibidos:", parsedData);
          setFacturaData(parsedData);
        } else {
          console.error("Los datos no son un array");
        }
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    }
  }, []);

  const totalPagar = facturaData.reduce((total, item) => total + item.amount, 0);

  // Enviar el total al padre cada vez que cambia
  useEffect(() => {
    onTotalChange(totalPagar);
  }, [totalPagar, onTotalChange]);

  const handlerUpdate = () => {
    router.push(
      `/descripcion?data=${encodeURIComponent(JSON.stringify(facturaData))}`
    );
  }
  return (
    <section className={styles.DescriptionP}>
      <div className={styles.DescriptionP__table}>
      <table>
        <thead>
          <tr>
            <th>Operador</th>
            <th>Método de consulta</th>
            <th>Número de consulta</th>
            <th>Valor a pagar por factura</th>
          </tr>
        </thead>
        <tbody>
          {facturaData.map((factura: any, index: any) => (
            <tr key={index}>
              <td>{factura.operator}</td>
              <td>{factura.method}</td>
              <td>{factura.value}</td>
              <td>$ {factura.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className={styles.DescriptionP__total}>
        <strong>Total a pagar: </strong> ${totalPagar.toLocaleString('es-CO')} COP
      </div>
      
        <button onClick={handlerUpdate} className={styles.DescriptionP__add}>
          Volver
        </button>
    </section>
  )
}
