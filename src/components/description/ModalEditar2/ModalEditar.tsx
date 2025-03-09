import React, { useState } from "react";
import styles from "./ModalEditar.module.sass";
import { realizarConsulta } from "app/services/megaRed/consultaServiciosMoviles";
import Swal from "sweetalert2";

export const ModalEditar2 = ({ factura, onSave, onClose }: any) => {
  const [operator, setOperador] = useState(factura?.operator || "");
  const [method, setMetodoConsulta] = useState(factura?.method || "");
  const [value, setNumeroConsulta] = useState(factura?.value || "");
  const [error, setError] = useState("");

  const products = [
    { name: "Claro", img: "/images/claro.png" },
    { name: "Movistar", img: "/images/movistar.png" },
    { name: "Tigo", img: "/images/tigo.png" },
    { name: "Virgin", img: "/images/virgin.png" },
    { name: "Wom", img: "/images/wom.png" },
  ]

  const handleOperatorClick = (productName: string) => {
    setOperador(productName);
    setMetodoConsulta(""); // Reinicia el método de consulta al cambiar de operador
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

  const handleSave = async () => {
    if (!operator || !method || !value) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/^[0-9]+$/.test(value)) {
      setError("El número de consulta debe ser numérico.");
      return;
    }
  
    setError("");
  
    // Mostrar modal de carga
    Swal.fire({
      title: "Procesando...",
      text: "Por favor, espera mientras realizamos la consulta.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton())
      },
    });
  
    try {
      const operadorKey = operator as keyof typeof operadoresManual;
      const consulta = await realizarConsulta(
        method == "referencia" || method == "Referencia" 
          ? "" : value,
        value,
        method == "referencia" || method == "Referencia" 
          ? "MANUAL" : "AUTOMATIC",
        method == "referencia" || method == "Referencia"
          ? operadoresManual[operadorKey]
          : operadoresAut[operadorKey],
        "0"
      );
  
      const amount = consulta.data.data_pay.amount;
  
      Swal.close(); // Cerrar el modal de carga
  
      // Guardar datos y cerrar modal
      onSave({ operator, method, value, amount });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en la consulta",
        text: "Hubo un problema al realizar la consulta. Inténtalo de nuevo.",
      });
    }
  }
  
  const availableMethods = ["Tigo", "Wom"].includes(operator)
    ? ["Numero de celular", "Referencia"]
    : ["Referencia"];

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal__content}>
        <div>
          <h2>Editar</h2>
          <h3>Operador</h3>
        </div>
        <div className={styles.Modal__Operadores}>
          {products.map((product) => (
            <article
              key={product.name}
              className={
                product.name === operator ? styles.Modal__selected : ""
              }
              onClick={() => handleOperatorClick(product.name)}
            >
              <img src={product.img} alt={product.name} loading="eager" />
              <p
                className={
                  product.name === operator ? styles.Operadores__selectedText : ""
                }
              >
                {product.name}
              </p>
            </article>
          ))}
        </div>
        <div className={styles.Modal__Consulta}>
          <div>
            <h3>Método de Consulta</h3>
            <div>
              {availableMethods.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="consulta"
                    value={option}
                    checked={method === option}
                    onChange={(e) => setMetodoConsulta(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3>Número de Consulta</h3>
            <input
              type="text"
              value={value}
              onChange={(e) => setNumeroConsulta(e.target.value)}
            />
          </div>
        </div>
        {error && <p className={styles.Modal__error}>{error}</p>}
        <div className={styles.Modal__actions}>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
