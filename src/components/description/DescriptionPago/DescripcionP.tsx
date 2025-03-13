"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./DescripcionP.module.sass";
import { useRouter } from "next/navigation";
import { ModalEditar2 } from "../ModalEditar2";

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
  }

  const handleDelete = (index: any) => {
    const updatedData = facturaData.filter((_, i) => i !== index)
    setFacturaData(updatedData)
    if (facturaData.length == 1){
      router.push(
        `/`
      )
    }
  }

  const payHandler = () => {
    const filteredData = facturaData.filter(item => !isNaN(parseFloat(item.amount)))
    router.push(
      `/payment?data=${encodeURIComponent(JSON.stringify(filteredData))}`
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

  const totalPagar =  facturaData.reduce((total, item) => {
    const amount = parseFloat(item.amount); // Intenta convertir el valor a número
    return !isNaN(amount) ? total + amount : total; // Suma solo si es un número válido
  }, 0)

  const handleSaveFactura = (updatedFactura: any) => {
    if (currentFactura != null) {
      // Actualiza la factura existente
      const updatedData = facturaData.map((factura, index) =>
        index === currentFactura ? updatedFactura : factura
      )

      setFacturaData(updatedData)
    } else {
      // Agrega una nueva factura si currentFactura es null
      setFacturaData([...facturaData, updatedFactura])
    }
    setIsEditing(false) // Cierra el modal después de guardar
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
              <td>
                {factura.amount == "" || factura.amount == null 
                ? "NO DISPONIBLE":"$ "+factura.amount }
              </td>
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
      </div>
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
      {isEditing && (
        <ModalEditar2 
          factura={currentFactura != null ? facturaData[currentFactura] : null}
          onSave={handleSaveFactura} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </section>
  )
}
