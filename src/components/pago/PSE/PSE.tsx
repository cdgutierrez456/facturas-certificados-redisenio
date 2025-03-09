"use client"
import React, { useEffect, useState } from "react"
import styles from "./PSE.module.sass"
import Swal from "sweetalert2"
import {
  consultarBancos,
  consultarLlave,
  realizarLoging,
  realizarPagoPSE,
} from "app/services/megaPagos/consultasMegaPagos"
import { saveToCache } from "app/utils/storage"
import { manejarEncriptacion } from "app/utils/encript"
import { useRouter } from "next/navigation"

interface PSEProps {
  total: number
  cantidad: number
}

export const PSE = ({ total, cantidad }: PSEProps) => {
  const router = useRouter()
  const [megaPagos, setMegaPagos] = useState({
    bearer: "",
    bancos: [
      {
        financialInstitutionCode: "",
        financialInstitutionName: "",
      },
    ],
    publicKey: "",
    idCliente: "",
    codeTrazabilidad: "",
    pseURL: "",
    tansactionId: "",
    bank: "",
    cantidad: 0
  })

  const [formType, setFormType] = useState<"natural" | "juridica" | "">(
    "natural"
  )

  const [formData, setFormData] = useState({
    tipoId: "CedulaDeCiudadania",
    identificacion: "",
    nombre: "",
    celular: "",
    email: "",
    confirmEmail: "",
    nit: "",
    empresa: "",
    banco: "",
    terminos: false,
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
    terminos: false,
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors }

    if(!formData.banco || formData.banco === "0" || formData.banco === ""){
      newErrors.terminos = true
      valid = false
      Swal.fire({
        title: "Selecciona un Banco",
        text: "Por favor, selecciona un banco.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }

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
      });
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
      });
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
      });
    }

    setErrors(newErrors); // Actualiza el estado de errores

    if (valid) {
      // Si todo está correcto, muestra éxito
      Swal.fire({
        title: "Enviando formulario...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(null); // Muestra el spinner
        },
      });

      // Paso 3: Datos de ejemplo para encriptar
      const data = {
        data: {
          extraData: {
            idusuario: megaPagos.idCliente, //viene en el login capturar
            idtipooperacion: 5,
            idtiposolicitud: 5,
            linkcode: "-1",
            solicitudenvio: "N",
            //externalurl: "http://localhost:3000/paid",
            externalurl: "https://pagos-rose.vercel.app/paid",
          },
          step1: {
            name: "Servicios Moviles",
            description: "Pago Servicios Moviles",
            value: total,
            in_stock: true,
            idimpuesto: 21,
            shipping_cost: 0,
            requested_units: 1,
            total_amount: total,
            payment_amount: 0,
          },
          step3: {
            terms_and_conditions: true,
            payment_method: "pse",
            biller_name: formData.nombre,
            biller_email: formData.email,
            biller_address: "cra 12345",
            payment_info: {
              pse_bank: formData.banco,
              pse_person_type: "person",
              pse_document: formData.identificacion,
              pse_name: formData.nombre,
              pse_phone: formData.celular,
              pse_document_type: formData.tipoId,
            },
          },
        },
      };

      const dataString = JSON.stringify(data);
      const resultadoEncriptado = await manejarEncriptacion(dataString,megaPagos.publicKey)

      await crearPago(resultadoEncriptado);

      setTimeout(async () => {
        Swal.fire({
          title: "Transaccion ejecutada",
          text: "Consultar como va tu transaccion.",
          icon: "success",
          confirmButtonText: "Consultar",
        })
      }, 5000) // 5 segundos de espera
    }
  }

  const crearPago = async (resultadoEncriptado: any) => {
    console.log("hola ñero",megaPagos.bearer, "ahahahhahahahhahahhah" ,resultadoEncriptado)
    const pago = await realizarPagoPSE(megaPagos.bearer, resultadoEncriptado)
    console.log("hola ñero II",pago)
    megaPagos.codeTrazabilidad = pago.data.trazabilityCode
    megaPagos.tansactionId = pago.data.transactionId
    megaPagos.pseURL = pago.data.pseURL
    megaPagos.bank = formData.banco
    megaPagos.cantidad = cantidad

    setMegaPagos(megaPagos)
    saveToCache(megaPagos)

    // Abrimos la URL ANTES de cerrar la pestaña actual
    router.push(
      megaPagos.pseURL
    )
  }

  const ejecutarConsultas = async () => {
    try {
      const consulta = await realizarLoging();
    const accessToken = consulta.data.token.accessToken;
    const idCliente = consulta.data.comercio.idusuario;

    // Obtener los bancos
    const banksResponse = await consultarBancos(accessToken);
    const bancos = banksResponse.data; // Asegurar que obtenemos el array correcto

    // Obtener la llave pública
    const keysResponse = await consultarLlave();
    const publicKey = keysResponse.data.public_key;

    setMegaPagos((prevState) => ({
      ...prevState,
      bearer: accessToken,
      idCliente,
      bancos, // Actualizamos los bancos correctamente
      publicKey,
    }));
    } catch (error) {
      console.error("Error en la ejecución de consultas:", error);
    } finally {
      //llamar bancos
    }
  }

  // Ejecutar la función solo una vez al montar el componente
  useEffect(() => {
    ejecutarConsultas()
  }, []) // Array vacío asegura que se ejecuta solo una vez

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const clearForm = () =>
    setFormData({
      tipoId: "0",
      identificacion: "0",
      nombre: "0",
      celular: "",
      email: "",
      confirmEmail: "",
      nit: "0",
      empresa: "",
      banco: "",
      terminos: false,
    })

  return (
    <section className={styles.Payment}>
      <h3 className={styles.Payment__title}>PSE</h3>
      <form className={styles.Payment__form} onSubmit={handleSubmit}>
        <div className={styles.Payment__group}>
          <label>¿Eres Persona Natural o Jurídica?</label>
          <select
            name="formType"
            value={formType}
            onChange={(e) => {
              setFormType(e.target.value as "natural" | "juridica");
              clearForm();
            }}
            className={
              errors.email
                ? styles.Payment__group_errorInput
                : styles.Payment__group_input
            }
          >
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
                {megaPagos.bancos.map((bank) => (
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
                {megaPagos.bancos.map((bank) => (
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
    </section>
  )
}
