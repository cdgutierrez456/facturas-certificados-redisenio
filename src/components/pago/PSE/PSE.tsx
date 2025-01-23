"use client"
import React, { useState } from "react"
import styles from "./PSE.module.sass"
import Swal from "sweetalert2"
import {TransactionModal} from "../Modal/Modal"
import { consultarBancos, consultarLlave, realizarLoging } from "app/services/megaPagos/consultasMegaPagos"

export const PSE = () => {
  const results: results = {
    data: "",
    error: "",
  }

  const megaPagos: megaPagos = {
    bearer: "",
    bancos:[],
    publicKey: ""
  }

  const [formData, setFormData] = useState({
    name: "",
    tipoDoc: "CC",
    document: "",
    cardNumber: "",
    expirationDate: "",
    email: "",
    confirmEmail: "",
    phone: "",
    termsAccepted: false,
  })

  const [errors, setErrors] = useState({
    name: false,
    document: false,
    cardNumber: false,
    expirationDate: false,
    email: false,
    confirmEmail: false,
    phone: false,
    termsAccepted: false,
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionData = {
    date: "19 / 02 / 2023",
    amount: "$440.000",
    paymentId: "15252dfdd",
    paymentMethod: "PSE",
    status: "APROBADO",
    requestId: "125263asdsad",
    email: formData.email,
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: false });
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    // Validación de términos y condiciones
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = true;
      valid = false;
      Swal.fire({
        title: "Términos no aceptados",
        text: "Por favor, acepta los términos y condiciones.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }

    // Validación de correos electrónicos coincidentes
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = true;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Los correos electrónicos no coinciden",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }

    // Validación de otros campos (puedes agregar más validaciones según sea necesario)
    if (!formData.name) {
      newErrors.name = true;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Campo Nombre sin Informacion",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }
    if (!formData.document) {
      newErrors.document = true;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Campo Documento sin informacion",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (!formData.cardNumber) {
      newErrors.cardNumber = true;
      valid = false;Swal.fire({
        title: "Error",
        text: "Ingresa el numero de tarjeta",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (!formData.expirationDate) {
      newErrors.expirationDate = true;
      valid = false;
      valid = false;Swal.fire({
        title: "Error",
        text: "Ingresa la fecha de expiracion de tu tarjeta",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (!formData.email) {
      newErrors.email = true;
      valid = false;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Ingresa tu email",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (!formData.phone) {
      newErrors.phone = true;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Ingresa tu numero de celular",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }

    setErrors(newErrors); // Actualiza el estado de errores

    if (valid) {
      // Si todo está correcto, muestra éxito
      Swal.fire({
        title: "Enviando formulario...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(null) // Muestra el spinner
        },
      })

      setTimeout(() => {
        Swal.fire({
          title: "Formulario enviado",
          text: "Tu formulario ha sido enviado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        })
    
        // Aquí puedes manejar el envío del formulario o limpiar los campos después del éxito
        console.log("Form data:", formData)

        openModal()
      }, 5000) // 5 segundos de espera
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const ejecutarConsultas = async () => {
    try {
      // Ejecuta todas las consultas
      const consulta = await realizarLoging()
  
      console.log("Resultados de todas las consultas:", consulta.data.token.accessToken)

      results.data = consulta.data.token.accessToken

      megaPagos.bearer = results.data

      const banks = await consultarBancos(results.data)

      console.log("bancks: " , banks)

      results.data = banks.data
      megaPagos.bancos = results.data

      console.log(megaPagos.bancos)

      const keys = await consultarLlave()

      console.log("llave: " , keys.data.public_key)

      results.data = keys.data.public_key
      megaPagos.publicKey = results.data
  
    } catch (error) {
      console.error("Error en la ejecución de consultas:", error);
    } finally {
      //llamar bancos
    }
  }

  const consultaHandler = async () => {
    await ejecutarConsultas();
  }

  return (
    <section className={styles.Payment}>
      <h3 className={styles.Payment__title}>Transferencia Interbancaria PSE</h3>
      <form className={styles.Payment__form} onSubmit={handleSubmit}>
        <div className={styles.Payment__group}>
          <label>Nombre completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresar el nombre"
            className={errors.name ? styles.Payment__group_errorInput : styles.Payment__group_input}
          />
        </div>

        <div className={styles.Payment__group}>
          <label>Documento</label>
          <div className={errors.document?styles.Payment__group_errorDocument:styles.Payment__group_doc}>
            <select
              name="tipoDoc"
              value={formData.tipoDoc}
              onChange={handleChange}
              className={styles.Payment__group_doc_select}
            >
              <option value="CC">CC</option>
              <option value="TI">TI</option>
            </select>
            <input
              className={styles.Payment__group_doc_num}
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
              placeholder="Número de documento"
            />
          </div>
        </div>

        <div className={styles.Payment__group}>
          <label>Número de la tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Ingresar los dígitos"
            className={errors.cardNumber ? styles.Payment__group_errorInput : styles.Payment__group_input}
          />
        </div>

        <div className={styles.Payment__group}>
          <label>Fecha de vencimiento</label>
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM / AAAA"
            className={errors.expirationDate ? styles.Payment__group_errorInput : styles.Payment__group_input}
          />
        </div>

        <div className={styles.Payment__group}>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresar el correo"
            className={errors.email ? styles.Payment__group_errorInput : styles.Payment__group_input}
          />
        </div>

        <div className={styles.Payment__group}>
          <label>Confirmar correo electrónico</label>
          <input
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            placeholder="Ingresar el correo"
            className={errors.confirmEmail ? styles.Payment__group_errorInput : styles.Payment__group_input}
          />
        </div>

        <div className={styles.Payment__group}>
          <label>Celular</label>
          <div className={styles.Payment__phone}>
            <span>+57</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingresar dígitos"
              className={errors.phone ? styles.Payment__phone_errorPhone : styles.Payment__phone_inputPhone }
            />
          </div>
        </div>

        <div className={styles.Payment__checkbox}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className={errors.termsAccepted ? styles.errorCheckbox : styles.Payment__group_input}
          />
          <label>Acepto términos y condiciones y políticas de privacidad</label>
        </div>

        <button type="submit" className={styles.Payment__button}>
          Pagar
        </button>

        <button onClick={consultaHandler} className={styles.Payment__button}>
          Pagar 2
        </button>
      </form>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={transactionData}
      />
    </section>
  );
};
