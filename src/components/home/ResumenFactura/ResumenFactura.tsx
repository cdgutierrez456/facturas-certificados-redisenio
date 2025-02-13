"use client"
import { FaEdit, FaTrash } from "react-icons/fa"
import styles from "./ResumenFactura.module.sass"
import { realizarConsulta } from "app/services/megaRed/consultaServiciosMoviles"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export const ResumenFactura = ({ data, onEdit, onDelete, onAdd }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const results: results = {
    data: [],
    error: "",
  }

  const operadoresManual = {
    Claro: "14",
    Movistar: "17",
    Tigo: "299",
    Virgin: "383",
    Wom: "3771",
  }

  const operadoresAut = {
    Claro: "14",
    Movistar: "7707176960178",
    Tigo: "7707316035001",
    Virgin: "NA",
    Wom: "7709998570573",
  }

  let createConsult = data.map((factura: InfConsult) => {
    const operadorKey = factura.operator as keyof typeof operadoresManual
    return {
      barcode: factura.method == "referencia" || factura.method == "Referencia" 
        ? "" : factura.value,
      reference: factura.value,
      method: factura.method == "referencia" || factura.method == "Referencia" 
        ? "MANUAL" : "AUTOMATIC",
      code_agreement:
        factura.method == "referencia" || factura.method == "Referencia"
          ? operadoresManual[operadorKey]
          : operadoresAut[operadorKey],
      code_bank: "0"
    }
  })

  const ejecutarConsultas = async () => {
    setIsLoading(true);
    try {
      // Ejecuta todas las consultas
      const consultas = createConsult.map((factura: ItemConsult) =>
        realizarConsulta(
          factura.barcode,
          factura.reference,
          factura.method,
          factura.code_agreement,
          factura.code_bank
        )
      )
  
      // Si necesitas manejar errores individualmente
      const resultados = await Promise.allSettled(consultas);
  
      // Filtra solo las consultas exitosas
      const datosExitosos = resultados
        .filter((resultado) => resultado.status === "fulfilled")
        .map((resultado: any) => resultado.value)
  
      results.data = datosExitosos

      // Mapea cada respuesta
      const mappedResponses = datosExitosos.map((response, index) => ({
        method: data[index].method,
        operator: data[index].operator,
        value: data[index].value,
        amount: response.data.data_pay.amount, // Asignamos el `amount` de cada respuesta
      }))
  
      data = mappedResponses // Actualiza los datos con las respuestas mapeadas
    } catch (error) {
      results.error = error
    } finally {
      setIsLoading(false) // Desactiva el loader
      router.push(`/descripcion?data=${encodeURIComponent(JSON.stringify(data))}`)
    }
  }

  const consultaHandler = async () => {
    await ejecutarConsultas()
  }

  return (
    <section className={styles.ResumenF}>
  <h2>Resumen de facturas</h2>
  <div className={styles.ResumenF__table}>
    <table>
      <thead>
        <tr>
          <th>Operador</th>
          <th>Método de consulta</th>
          <th>Número de consulta</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((factura: any, index: any) => (
          <tr key={index}>
            <td>{factura.operator}</td>
            <td>{factura.method}</td>
            <td>{factura.value}</td>
            <td>
              <button onClick={() => onEdit(index)}>
                <FaEdit />
              </button>
            </td>
            <td>
              <button onClick={() => onDelete(index)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className={styles.ResumenF__actions}>
    <button onClick={onAdd} className={styles.ResumenF__add}>
      + Adicionar otra factura
    </button>
    <button className={styles.ResumenF__pay} onClick={consultaHandler}>
      Pagar
    </button>
  </div>
</section>
  )
}
