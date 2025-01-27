"use client"
import React, { useEffect, useState } from "react"
import styles from "./PSE.module.sass"
import Swal from "sweetalert2"
import { TransactionModal } from "../Modal/Modal"
import {
  consultarBancos,
  consultarLlave,
  realizarLoging,
} from "app/services/megaPagos/consultasMegaPagos"
import forge from "node-forge"

export const PSE = () => {
  const [resultado, setResultado] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [megaPagos, setMegaPagos] = useState({
    bearer: "",
    bancos: [{
      financialInstitutionCode: "",
      financialInstitutionName: "",
    }],
    publicKey: "",
  });
  const [formType, setFormType] = useState<"natural" | "juridica" | "">("")
  const [formData, setFormData] = useState({
    tipoId: "",
    identificacion: "",
    nombre: "",
    celular: "",
    direccion: "",
    email: "",
    confirmEmail: "",
    nit: "",
    empresa: "",
    banco: "",
    terminos: false
  })

  const [errors, setErrors] = useState({
    tipoId: false,
    identificacion: false,
    nombre: false,
    celular: false,
    direccion: false,
    email: false,
    confirmEmail: false,
    nit: false,
    empresa: false,
    banco: false,
    terminos: false
  })

  const results: results = {
    data: "",
    error: "",
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const transactionData = {
    date: "19 / 02 / 2023",
    amount: "$440.000",
    paymentId: "15252dfdd",
    paymentMethod: "PSE",
    status: "APROBADO",
    requestId: "125263asdsad",
    email: "some@loqueseañero",
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };

    // Validación de términos y condiciones
    if (!formData.terminos) {
      newErrors.terminos = true;
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
    if (!formData.nombre) {
      newErrors.nombre = true;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Campo Nombre sin Informacion",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }
    if (!formData.identificacion) {
      newErrors.identificacion = true;
      valid = false;
      Swal.fire({
        title: "Error",
        text: "Campo Documento sin informacion",
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
    if (!formData.celular) {
      newErrors.celular = true;
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
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

      setMegaPagos(megaPagos)
  
    } catch (error) {
      console.error("Error en la ejecución de consultas:", error);
    } finally {
      //llamar bancos
    }
  }

  // Ejecutar la función solo una vez al montar el componente
  useEffect(() => {
    ejecutarConsultas();
  }, []); // Array vacío asegura que se ejecuta solo una vez

  // Función para generar una llave aleatoria
  const generarLlaveAleatoria = (): string => {
    return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64); // Genera una llave aleatoria de 256 bits
  };

  // Función para encriptar con AES
  const encriptarAES = (data: any, key: string): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  };

  // Función para encriptar la llave aleatoria con la llave pública usando RSA
  const encriptarRSA = (key: string, publicKeyBase64: string): string => {
    const publicKeyPem = forge.util.decode64(publicKeyBase64); // Decodificar de Base64 a PEM
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem); // Crear la llave pública RSA

    const encryptedKey = publicKey.encrypt(key, "RSA-OAEP"); // Encriptar con RSA-OAEP
    return forge.util.encode64(encryptedKey); // Codificar el resultado en Base64
  };

  const manejarEncriptacion = async () => {
    try {
      // Paso 1: Obtener la llave pública desde la API
      const publicKeyBase64 = megaPagos.publicKey;

      // Paso 2: Generar una llave aleatoria
      const randomKey = generarLlaveAleatoria();

      // Paso 3: Datos de ejemplo para encriptar
      const data = {
        extraData: {
          idusuario: "1383",
          idtipooperacion: 5,
          idtiposolicitud: 5,
          linkcode: "-1",
          solicitudenvio: "N",
          externalurl: "http://linkcomercio.com",
        },
        step1: {
          name: "Producto",
          description: "Producto Nuevo",
          value: 6000,
          in_stock: true,
          idimpuesto: 21,
          shipping_cost: 0,
          requested_units: 2,
          total_amount: 12000,
          payment_amount: 0,
        },
        step3: {
          terms_and_conditions: true,
          payment_method: "pse",
          biller_name: "Pedro Perez",
          biller_email: "pepe@mail.com",
          biller_address: "calle 1",
          payment_info: {
            pse_bank: "1022",
            pse_person_type: "person",
            pse_document: "1053859249",
            pse_name: "Pedro Perez",
            pse_phone: "321456789",
            pse_document_type: "CedulaDeCiudadania",
          },
        },
      };

      // Paso 4: Encriptar los datos con AES
      const encryptedData = encriptarAES(data, randomKey);

      // Paso 5: Encriptar la llave aleatoria con RSA
      const encryptedKey = encriptarRSA(randomKey, publicKeyBase64);

      // Construir el objeto final
      const resultadoEncriptado = {
        encryptedKey,
        encryptedData,
      };

      // Actualizar el estado con el resultado
      setResultado(resultadoEncriptado);
      setError(null);
    } catch (err: any) {
      console.error("Error en el proceso de encriptación:", err);
      setError(err.message);
    }
  };

  const bankOptions = [
    {
      financialInstitutionCode: "0",
      financialInstitutionName: "A continuación seleccione su banco",
    },
    {
      financialInstitutionCode: "1815",
      financialInstitutionName: "ALIANZA FIDUCIARIA",
    },
    // Agrega más bancos aquí
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const clearForm = () => setFormData(
    {
      tipoId: "0",
      identificacion: "0",
      nombre: "0",
      celular: "",
      direccion: "",
      email: "",
      confirmEmail: "",
      nit: "0",
      empresa: "",
      banco: "",
      terminos: false
    }
  )


  return (
    <section className={styles.Payment}>
      <h3 className={styles.Payment__title}>Transferencia Interbancaria PSE</h3>
      <form className={styles.Payment__form} onSubmit={handleSubmit}>
        <div className={styles.Payment__group}>
          <label>¿Eres Persona Natural o Jurídica?</label>
          <select
            name="formType"
            value={formType}
            onChange={(e) =>{
              setFormType(e.target.value as "natural" | "juridica")
              clearForm()
            
            }
            }
            className={
              errors.email
                ? styles.Payment__group_errorInput
                : styles.Payment__group_input
            }
          >
            <option value="">Seleccione</option>
            <option value="natural">Persona Natural</option>
            <option value="juridica">Persona Jurídica</option>
          </select>
        </div>

        {formType === "natural" && (
          <>
            <div className={styles.Payment__group}>
              <label>Tipo de Identificación</label>
              <select
                name="tipoId"
                value={formData.tipoId}
                onChange={handleInputChange}
                className={
                  errors.email
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              >
                <option value="">Seleccione</option>
                <option value="RegistroCivilDeNacimiento">
                  Registro Civil de Nacimiento
                </option>
                <option value="TarjetaDeIdentidad">Tarjeta de Identidad</option>
                <option value="CedulaDeCiudadania">Cédula de Ciudadanía</option>
                <option value="TarjetaDeExtranjeria">
                  Tarjeta de Extranjería
                </option>
                <option value="CedulaDeExtranjeria">
                  Cédula de Extranjería
                </option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="DocumentoDeIdentificacionExtranjero">
                  Documento de Identificación Extranjero
                </option>
              </select>
            </div>
            <div className={styles.Payment__group}>
              <label>Número de Identificación</label>
              <input
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleInputChange}
                className={
                  errors.email
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>

            <div className={styles.Payment__group}>
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ingresar el nombre"
                className={
                  errors.nombre
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>

            <div className={styles.Payment__group}>
              <label>Celular</label>
              <div className={styles.Payment__phone}>
                <span>+57</span>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  placeholder="Ingresar dígitos"
                  className={
                    errors.celular
                      ? styles.Payment__phone_errorPhone
                      : styles.Payment__phone_inputPhone
                  }
                />
              </div>
            </div>

            <div className={styles.Payment__group}>
              <label>Direccion</label>
          
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Ingresar dígitos"
                  className={
                    errors.confirmEmail
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                  }
                />
            </div>

            <div className={styles.Payment__group}>
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ingresar el correo"
                className={
                  errors.email
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>

            <div className={styles.Payment__group}>
              <label>Confirmar correo electrónico</label>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                placeholder="Ingresar el correo"
                className={
                  errors.confirmEmail
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>

            <div className={styles.Payment__group}>
              <label>Banco</label>
              <select
                name="banco"
                value={formData.banco}
                onChange={handleInputChange}
                className={
                  errors.email
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              >
                {
                megaPagos.bancos.map((bank) => (
                  <option
                    key={bank.financialInstitutionCode}
                    value={bank.financialInstitutionCode}
                  >
                    {bank.financialInstitutionName}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.Payment__checkbox}>
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleInputChange}
                className={
                  errors.terminos
                    ? styles.errorCheckbox
                    : styles.Payment__group_input
                }
              />
              <label>
                Acepto términos y condiciones y políticas de privacidad
              </label>
            </div>
          </>
        )}

        {formType === "juridica" && (
          <>
            <div className={styles.Payment__group}>
              <label>NIT</label>
              <input
                type="text"
                name="nit"
                value={formData.nit}
                onChange={handleInputChange}
                className={
                  errors.nombre
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>
            <div className={styles.Payment__group}>
              <label>Nombre de la Empresa</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                className={
                  errors.nombre
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>
            
            <div className={styles.Payment__group}>
              <label>Celular</label>
              <div className={styles.Payment__phone}>
                <span>+57</span>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  placeholder="Ingresar dígitos"
                  className={
                    errors.celular
                      ? styles.Payment__phone_errorPhone
                      : styles.Payment__phone_inputPhone
                  }
                />
              </div>
            </div>

            <div className={styles.Payment__group}>
              <label>Direccion</label>
          
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Ingresar dígitos"
                  className={
                    errors.confirmEmail
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                  }
                />
            </div>

            <div className={styles.Payment__group}>
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ingresar el correo"
                className={
                  errors.email
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>

            <div className={styles.Payment__group}>
              <label>Confirmar correo electrónico</label>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                placeholder="Ingresar el correo"
                className={
                  errors.confirmEmail
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              />
            </div>

            <div className={styles.Payment__group}>
              <label>Banco</label>
              <select
                name="banco"
                value={formData.banco}
                onChange={handleInputChange}
                className={
                  errors.email
                    ? styles.Payment__group_errorInput
                    : styles.Payment__group_input
                }
              >
                {bankOptions.map((bank) => (
                  <option
                    key={bank.financialInstitutionCode}
                    value={bank.financialInstitutionCode}
                  >
                    {bank.financialInstitutionName}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.Payment__checkbox}>
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleInputChange}
                className={
                  errors.terminos
                    ? styles.errorCheckbox
                    : styles.Payment__group_input
                }
              />
              <label>
                Acepto términos y condiciones y políticas de privacidad
              </label>
            </div>
          </>
        )}
        <button type="submit" className={styles.Payment__button}>
          Pagar
        </button>
      </form>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={transactionData}
      />
    </section>
  )
}
