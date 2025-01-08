"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./DescripcionP.module.sass";
import { useRouter } from "next/navigation";

export const DescriptionP = () => {
  const router = useRouter();
  const [facturaData, setFacturaData] = useState<any[]>([]); // Array para almacenar los datos
  const [isEditing, setIsEditing] = useState(false); // Para abrir o cerrar el modal
  const [currentFactura, setCurrentFactura] = useState(null);

  const searchParams = useSearchParams();
  const dataLlegada = searchParams.get("data");

  const handleEdit = (index: any) => {
    setCurrentFactura(index);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentFactura(null); // null indica que es una nueva factura
    setIsEditing(true);
  };

  const handleDelete = (index: any) => {
    const updatedData = facturaData.filter((_, i) => i !== index);
    setFacturaData(updatedData);
  };

  const payHandler = () => {
    router.push(
      `/payment?data=${encodeURIComponent(JSON.stringify(facturaData))}`
    );
  }

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
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {facturaData.map((factura: any, index: any) => (
            <tr key={index}>
              <td>{factura.operator}</td>
              <td>{factura.method}</td>
              <td>{factura.value}</td>
              <td>$ {factura.amount}</td>
              <td>
                <button onClick={() => handleEdit(index)}>
                  <FaEdit />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.DescriptionP__total}>
        <strong>Total a pagar: </strong> ${totalPagar.toLocaleString('es-CO')} COP
      </div>
      <div className={styles.DescriptionP__actions}>
        <button onClick={handleAdd} className={styles.DescriptionP__add}>
          + Adicionar otra factura
        </button>
        <button className={styles.DescriptionP__pay} onClick={payHandler}>
          Confirmar Pago
        </button>
      </div>
    </section>
  );
};
