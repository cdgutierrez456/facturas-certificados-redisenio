import React, { useState, useEffect } from "react";
import styles from "./ModalEditar.module.sass";

export const ModalEditar = ({ factura, onSave, onClose }: any) => {
  // Inicializamos los valores con el objeto factura o una cadena vacía para inputs controlados
  const [operator, setOperador] = useState(factura?.operator || "");
  const [method, setMetodoConsulta] = useState(factura?.method || "");
  const [value, setNumeroConsulta] = useState(factura?.value || "");

  const products = [
    { name: "Claro", img: "/images/claro.png" },
    { name: "Movistar", img: "/images/movistar.png" },
    { name: "Tigo", img: "/images/tigo.png" },
    { name: "Virgin", img: "/images/virgin.png" },
    { name: "Wom", img: "/images/wom.png" },
  ];

  const handleOperatorClick = (productName: string) => {
    setOperador(productName);
  };

  const handleSave = () => {
    onSave({ operator, method, value });
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal__content}>
        <div>
          <h2>Editar</h2>
          <h3>Operador</h3>
        </div>
        <div className={styles.Modal__Operadores}>
          {products.map((product) => {
            const imageSrc = product.img;
            return (
              <article
                key={product.name}
                className={
                  product.name === operator
                    ? `${styles.Modal__selected} ` // Estilos condicionales
                    : ""
                }
                onClick={() => handleOperatorClick(product.name)} // Maneja el click del operador
              >
                <img src={imageSrc} alt={product.name} loading="eager" />
                <p
                  className={
                    product.name === operator
                      ? styles.Operadores__selectedText
                      : ""
                  }
                >
                  {product.name}
                </p>
              </article>
            );
          })}
        </div>
        <div className={styles.Modal__Consulta}>
          <div>
            <h3>Método de Consulta</h3>
            <select
              value={method}
              onChange={(e) => setMetodoConsulta(e.target.value)}
            >
              <option value="reference">Referencia</option>
              <option value="Número de Teléfono">Número de Teléfono</option>
            </select>
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
        <div className={styles.Modal__actions}>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
