"use client"
import styles from "./Operadores.module.sass"
import { useState } from "react"

export const Operadores = ({ setSelectedOperator }:any) => {
  const [selectedOperator, setLocalSelectedOperator] = useState<string | null>(null)

  const products = [
    { name: "Claro", img: "/images/claro.png" },
    { name: "Movistar", img: "/images/movistar.png" },
    { name: "Tigo", img: "/images/tigo.png" },
    { name: "Virgin", img: "/images/virgin.png" },
    { name: "Wom", img: "/images/wom.png" },
  ];

  const handleOperatorClick = (productName: string) => {
    setLocalSelectedOperator(productName) 
    setSelectedOperator(productName)  // Establece el operador seleccionado
    //alert(`Operador seleccionado: ${productName}`);  // Muestra el alert con el nombre del operador
  }

  return (
    <section className={styles.Operadores}>
      <div className={styles.Operadores__first}>
        <h2>01</h2>
        <h3>Selecciona tu operador</h3>
      </div>
      <div className={styles.Operadores__line}></div>
      <div className={styles.Operadores__ops}>
        {products.map((product) => {
          const imageSrc = product.img;
          return (
            <article
              key={product.name}
              className={
                product.name === selectedOperator
                  ? `${styles.Operadores__selected} ${styles.Operadores__selectedText}` // Estilos condicionales
                  : ""
              }
              onClick={() => handleOperatorClick(product.name)}  // Maneja el click del operador
            >
              <img src={imageSrc} alt={product.name} loading="eager" />
              <p className={product.name === selectedOperator ? styles.Operadores__selectedText : ""}>{product.name}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
