"use client"
import styles from "./ConsultaFactura.module.sass"
import { useState } from "react"

export const ConsultaFactura = ({ setConsultationMethod, setInputValue, handleAddClick } :any) => {
  const [selectedOption, setSelectedOption] = useState("Numero de Celular")
  const [referenceValue, setReferenceValue] = useState("")
  const [cellphoneValue, setCellphoneValue] = useState("")

  const handleReferenceChange = (event:any) => {
    const value = event.target.value
    setReferenceValue(value)
    setInputValue(value) // Actualiza inputValue directamente
  }

  const handleCellphoneChange = (event:any) => {
    const value = event.target.value
    setCellphoneValue(value)
    setInputValue(value) // Actualiza inputValue directamente
  }

  const handleClick = () =>{
    handleAddClick()
      setCellphoneValue(" ")
      setReferenceValue(" ")
      setSelectedOption("Numero de Celular")

  }

  const handleOptionChange = (event:any) => {
    const value = event.target.value
    setSelectedOption(value) // Actualiza el estado local
    setConsultationMethod(value) // Actualiza el método de consulta en el componente padre
  }

  return (
    <section className={styles.ConsultaF}>
      <div className={styles.ConsultaF__title}>
        <h2>02</h2>
        <div className={styles.ConsultaF__title__line}></div>
        <h3>Selecciona el método de consulta de tu factura</h3>
      </div>
      <div className={styles.ConsultaF__form}>
      <div className={styles.ConsultaF__form__option}>
          <input
            type="radio"
            id="cellphone"
            name="option"
            value="Numero de Celular"
            checked={selectedOption === "Numero de Celular"}
            onChange={handleOptionChange}
          />
          <label htmlFor="cellphone">
            Número de celular
            <br />
            <small>(aplica para TIGO y WOM)</small>
          </label>
          <input
            type="text"
            placeholder="Numero de Celular"
            value={cellphoneValue}
            onChange={handleCellphoneChange}
            disabled={selectedOption !== "Numero de Celular"}
          />
          <button
            onClick={handleClick}
            disabled={selectedOption !== "Numero de Celular" || !cellphoneValue.trim()}
          >
            Agregar
          </button>
        </div>
        <div className={styles.ConsultaF__form__option}>
          <input
            type="radio"
            id="referencia"
            name="option"
            value="referencia"
            checked={selectedOption === "referencia"}
            onChange={handleOptionChange}
          />
          <label htmlFor="referencia">Número de referencia</label>
          <input
            type="text"
            placeholder="Digita la referencia"
            value={referenceValue}
            onChange={handleReferenceChange}
            disabled={selectedOption !== "referencia"}
          />
          <button
            onClick={handleClick}
            disabled={selectedOption !== "referencia" || !referenceValue.trim()}
          >
            Agregar
          </button>
        </div>
        
        {selectedOption === "referencia"? <div className={styles.ConsultaF__barCode}>
          <h4>¿Donde econtrar la referencia?</h4>
          <p>El numero de referencia lo encuentras en:</p>
          <img src="/images/9185570.png" alt="codigo Barras" />
          <p>(415)999999999999999(820)<span>12345678</span>(3900)9999999999(96)20200615</p>
          <p>El numero de referencia lo encuentras en el codigo de barras entre los numeros (8020) y (3900)</p>
          </div> :null}
        {/* Opción Número de Celular */}       
      </div>
    </section>
  )
}