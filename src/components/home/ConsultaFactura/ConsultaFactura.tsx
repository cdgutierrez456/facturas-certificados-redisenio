"use client"
import styles from "./ConsultaFactura.module.sass"
import { useEffect, useState } from "react"

export const ConsultaFactura = ({ setConsultationMethod, setInputValue, handleAddClick, selectedOperator } :any) => {
  const [selectedOption, setSelectedOption] = useState("Numero de Celular")
  const [referenceValue, setReferenceValue] = useState("")
  const [cellphoneValue, setCellphoneValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const operadoresConAmbosMetodos = ["Tigo", "Wom"]

  useEffect(() => {
    if (selectedOperator) {
      if (operadoresConAmbosMetodos.includes(selectedOperator)) {
        setSelectedOption("Numero de Celular");
        setConsultationMethod("Numero de Celular");
      } else {
        setSelectedOption("Referencia");
        setConsultationMethod("Referencia");
      }
    }
  }, [selectedOperator]);

  const handleReferenceChange = (event: any) => {
    const value = event.target.value

    // Validar que solo contenga números
    if (/^\d*$/.test(value)) {
      setReferenceValue(value)
      setInputValue(value)
      setErrorMessage("")
    } else {
      setErrorMessage("La referencia solo debe contener números.")
    }
  }

  const handleCellphoneChange = (event: any) => {
    const value = event.target.value

    // Validar formato de celular (10 dígitos)
    if (/^\d{0,10}$/.test(value)) {
      setCellphoneValue(value)
      setInputValue(value)
      setErrorMessage("")
    } else {
      setErrorMessage("El número de celular debe tener 10 dígitos.")
    }
  }

  const handleClick = () => {
    // Validar si hay un operador seleccionado
    if (!selectedOperator) {
      setErrorMessage("Debes seleccionar un operador antes de agregar la factura.")
      return
    }

    // Validar que el operador permite el método de consulta seleccionado
    if (
      selectedOption !== "Referencia" &&
      !operadoresConAmbosMetodos.includes(selectedOperator)
    ) {
      setErrorMessage(`El operador ${selectedOperator} solo acepta referencia.`)
      return
    }

    handleAddClick()
    setCellphoneValue("")
    setReferenceValue("")
    setSelectedOption("Numero de Celular")
    setErrorMessage("")
  }

  const handleOptionChange = (event: any) => {
    const value = event.target.value;
  
    // Verifica si la opción seleccionada es "Número de Celular" y si el operador lo permite
    if (value === "Numero de Celular" && !operadoresConAmbosMetodos.includes(selectedOperator)) {
      setErrorMessage(`El operador ${selectedOperator} solo acepta referencia.`);
      return;
    }
  
    setSelectedOption(value)
    setConsultationMethod(value) // Asegura que el método de consulta se actualiza correctamente
    setErrorMessage("")
  }

  return (
    <section className={styles.ConsultaF}>
      <div className={styles.ConsultaF__title}>
        <h2>02</h2>
        <div className={styles.ConsultaF__title__line}></div>
        <h3>Selecciona el método de consulta de tu factura</h3>
      </div>
      {errorMessage && <p className={styles.ConsultaF__error}>{errorMessage}</p>}
      <div className={styles.ConsultaF__form}>
      <div className={styles.ConsultaF__form__option}>
          <input
            type="radio"
            id="cellphone"
            name="option"
            value="Numero de Celular"
            checked={selectedOption === "Numero de Celular"}
            onChange={handleOptionChange}
            disabled={!operadoresConAmbosMetodos.includes(selectedOperator)}
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
            disabled={selectedOption !== "Numero de Celular" || !operadoresConAmbosMetodos.includes(selectedOperator)}
          />
          <button
            onClick={handleClick}
            disabled={selectedOption !== "Numero de Celular" ||
            cellphoneValue.length !== 10 ||
            !selectedOperator || !operadoresConAmbosMetodos.includes(selectedOperator)}
          >
            Agregar
          </button>
        </div>
        <div className={styles.ConsultaF__form__option}>
          <input
            type="radio"
            id="referencia"
            name="option"
            value="Referencia"
            checked={selectedOption === "Referencia"}
            onChange={handleOptionChange}
          />
          <label htmlFor="referencia">Número de referencia</label>
          <input
            type="text"
            placeholder="Digita la referencia"
            value={referenceValue}
            onChange={handleReferenceChange}
            disabled={selectedOption !== "Referencia"}
          />
          <button
            onClick={handleClick}
            disabled={selectedOption !== "Referencia" ||
            referenceValue.length === 0 ||
            !selectedOperator}
          >
            Agregar
          </button>
        </div>
        
        {selectedOption === "Referencia"? <div className={styles.ConsultaF__barCode}>
          <h4>¿Donde encontrar la referencia?</h4>
          <p>El numero de referencia lo encuentras en el codigo de barras entre los numeros (8020) y (3900)</p>
          <img src="/images/9185570.png" alt="codigo Barras" />
          <p className={styles.ConsultaF__barCode__pCode}>
            (415)999999999999999(820)
            <span>12345678</span>
            (3900)9999999999(96)20200615
          </p>
          </div> :null}
      </div>
    </section>
  )
}