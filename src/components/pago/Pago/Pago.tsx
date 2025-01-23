"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import styles from "./Pago.module.sass"

export const Pago = () => {
  const [facturaData, setFacturaData] = useState<any[]>([]); // Array para almacenar los datos

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
          // Aquí puedes hacer lo que necesites con parsedData
        } else {
          console.error("Los datos no son un array");
        }
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    }
  }, []);

  const totalPagar = facturaData.reduce((total, item) => total + item.amount, 0);

  return (
    <section className={styles.DescriptionP}>
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
      <div className={styles.DescriptionP__total}>
        <strong>Total a pagar: </strong> ${totalPagar.toLocaleString('es-CO')} COP
      </div>
    </section>
  );
};
