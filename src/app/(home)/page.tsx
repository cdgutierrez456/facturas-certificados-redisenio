"use client"
import { useState } from "react";
import { Operadores } from "app/components/home/Operadores"
import { ConsultaFactura } from "app/components/home/ConsultaFactura"
import { ResumenFactura } from "app/components/home/ResumenFactura"
import {ModalEditar} from "app/components/home/ModalEditar";

export default function Home() {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null)
  const [consultationMethod, setConsultationMethod] = useState<string>("reference")
  const [inputValue, setInputValue] = useState<string>("")
  const [facturaData, setFacturaData] = useState<any[]>([]) // Array para almacenar los datos
  const [isEditing, setIsEditing] = useState(false) // Para abrir o cerrar el modal
  const [currentFactura, setCurrentFactura] = useState(null) // Factura a editar o agregar


  const handleSaveFactura = (updatedFactura: any) => {
    if (currentFactura != null) {
      // Actualiza la factura existente
      const updatedData = facturaData.map((factura, index) =>
        index === currentFactura ? updatedFactura : factura
      );

      console.log(updatedData)
      setFacturaData(updatedData)
    } else {
      // Agrega una nueva factura si currentFactura es null
      setFacturaData([...facturaData, updatedFactura])
    }
    setIsEditing(false) // Cierra el modal después de guardar
  }

  const handleAddClick = () => {
    const newEntry = {
      operator: selectedOperator,
      method: consultationMethod,
      value: inputValue,
    }
  
    // Agrega el nuevo objeto al array
    setFacturaData((prevData) => [...prevData, newEntry])
  
    // Limpia los valores después de agregar
    setInputValue("") // Limpia el input
  }

  const handleEdit = (index:any) => {
    setCurrentFactura(index);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentFactura(null); // null indica que es una nueva factura
    setIsEditing(true);
  };

  const handleDelete = (index:any) => {
    const updatedData = facturaData.filter((_, i) => i !== index);
    setFacturaData(updatedData);
  };


  return (
    <main>
      {facturaData.length == 0 ?
      <Operadores setSelectedOperator={setSelectedOperator} />
      :null}
      {facturaData.length == 0 ?
      <ConsultaFactura 
      setConsultationMethod={setConsultationMethod} 
      setInputValue={setInputValue} 
      handleAddClick={handleAddClick}
      />
      :null}
      {facturaData.length > 0 ? <ResumenFactura data={facturaData} onEdit={handleEdit} 
        onDelete={handleDelete} 
        onAdd={handleAdd}/> : <br /> }

      {isEditing && (
        <ModalEditar 
          factura={currentFactura != null ? facturaData[currentFactura] : null}
          onSave={handleSaveFactura} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </main>
  )
}