"use client"
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./ResumenFactura.module.sass";
import { realizarConsulta } from "app/services/megaRed/consultaServiciosMoviles";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader } from "app/components/shared/Loader";

export const ResumenFactura = ({ data, onEdit, onDelete, onAdd }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const results: results = {
    data: [],
    error: "",
  };

  const operadoresManual = {
    Claro: "14",
    Movistar: "17",
    Tigo: "299",
    Virgin: "383",
    Wom: "3771",
  };

  const operadoresAut = {
    Claro: "7707175320010",
    Movistar: "7707176960178",
    Tigo: "7707316035001",
    Virgin: "NA",
    Wom: "7709998570573",
  };

  let createConsult = data.map((factura: InfConsult) => {
    const operadorKey = factura.operator as keyof typeof operadoresManual;
    return {
      barcode: factura.method == "reference" ? "" : factura.value,
      reference: factura.method == "reference" ? factura.value : "",
      method: factura.method == "reference" ? "MANUAL" : "AUTOMATIC",
      code_agreement:
        factura.method == "reference"
          ? operadoresManual[operadorKey]
          : operadoresAut[operadorKey],
      code_bank: "0"
    };
  });

  const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

  const ejecutarConsultas = async () => {
    setIsLoading(true);
    try {
      const consultas = createConsult.map((factura: ItemConsult) =>
        realizarConsulta(
          factura.barcode,
          factura.reference,
          factura.method,
          factura.code_agreement,
          factura.code_bank,
        )
      );

      await delay(2000);
      const resultados = await Promise.all(consultas);

      console.log("Resultados de todas las consultas:", resultados);
      results.data = resultados.filter((item: any) => item !== undefined);
      console.log(results.data[0].data.data_pay.amount);

      const mappedResponse = {
        method : data[0].method,
        operator : data[0].operator,
        value : data[0].value,
        amount: results.data[0].data.data_pay.amount // Asignamos el `amount` de la respuesta
      }

      data[0] = mappedResponse

    } catch (error) {
      console.error("Error en la ejecución de consultas:", error);
      results.error = error;
    } finally {
      setIsLoading(false); // Desactiva el loader
      router.push(
        `/descripcion?data=${encodeURIComponent(JSON.stringify(data))}`
      );
    }
  };

  const consultaHandler = async () => {
    await ejecutarConsultas();
  };

  return (
    <section className={styles.ResumenF}>
      {isLoading ? (
      <Loader /> // Muestra el loader durante la carga
    ) : (
      <><h2>Resumen de facturas</h2><table>
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
          </table><div className={styles.ResumenF__actions}>
              <button onClick={onAdd} className={styles.ResumenF__add}>
                + Adicionar otra factura
              </button>
              <button className={styles.ResumenF__pay} onClick={consultaHandler}>
                Pagar
              </button>
            </div></>
      )}
    </section>
  );
};
