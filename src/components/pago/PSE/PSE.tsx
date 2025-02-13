"use client";
import React, { useEffect, useState } from "react";
import styles from "./PSE.module.sass";
import Swal from "sweetalert2";
import { TransactionModal } from "../Modal/Modal";
import {
  consultarBancos,
  consultarLlave,
  realizarConsultaPagoPSE,
  realizarLoging,
  realizarPagoPSE,
} from "app/services/megaPagos/consultasMegaPagos";
import forge from "node-forge";

export const PSE = () => {
  const [resultado, setResultado] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    pseURL:"",
    tansactionId:""
  });
  const [formType, setFormType] = useState<"natural" | "juridica" | "">(
    "natural"
  );
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
    terminos: false,
  });

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
  });

  const results: results = {
    data: "",
    error: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionData = {
    date: "19 / 02 / 2023",
    amount: "$440.000",
    paymentId: "15252dfdd",
    paymentMethod: "PSE",
    status: "APROBADO",
    requestId: "125263asdsad",
    email: "some@hotmail",
  };

  const handleSubmit = async (e: any) => {
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
            externalurl: "https://pagos-rose.vercel.app/",
          },
          step1: {
            name: "Servicios Moviles",
            description: "Pago Servicios Moviles",
            value: 10000.58,
            in_stock: true,
            idimpuesto: 21,
            shipping_cost: 0,
            requested_units: 1,
            total_amount: 10000.58,
            payment_amount: 0,
          },
          step3: {
            terms_and_conditions: true,
            payment_method: "pse",
            biller_name: formData.nombre,
            biller_email: formData.email,
            biller_address: formData.direccion,
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
      }

      console.log("encript 1")
      const resultadoEncriptado = await manejarEncriptacion(data);

      await crearPago(resultadoEncriptado);

      setTimeout(async () => {
        Swal.fire({
          title: "Transaccion ejecutada",
          text: "Consultar como va tu transaccion.",
          icon: "success",
          confirmButtonText: "Consultat",
        });

        // Aquí puedes manejar el envío del formulario o limpiar los campos después del éxito
        console.log("encript 2")
        const data2 = {
          transactionId: forge.util.decode64(megaPagos.tansactionId)
        }
        const encriptedData = await manejarEncriptacion(data2)
        
        if (encriptedData){
          const consultaInf = await realizarConsultaPagoPSE(megaPagos.bearer, encriptedData)

          console.log(consultaInf)
        } 
        
        openModal();
      }, 10000); // 5 segundos de espera
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const crearPago = async (resultadoEncriptado: any) => {
    const pago = await realizarPagoPSE(megaPagos.bearer, resultadoEncriptado)
    megaPagos.codeTrazabilidad = pago.data.trazabilityCode
    megaPagos.tansactionId = pago.data.transactionId
    megaPagos.pseURL = pago.data.pseURL

    setMegaPagos(megaPagos)

    window.open(megaPagos.pseURL, "_blank", "width=900,height=600,scrollbars=yes,resizable=yes");

  }

  const ejecutarConsultas = async () => {
    try {
      // Ejecuta todas las consultas
      const consulta = await realizarLoging();

      results.data = consulta.data.token.accessToken;

      megaPagos.bearer = results.data;
      megaPagos.idCliente = consulta.data.comercio.idusuario;

      const banks = await consultarBancos(results.data);

      results.data = banks.data;
      megaPagos.bancos = results.data;

      const keys = await consultarLlave();

      results.data = keys.data.public_key;
      megaPagos.publicKey = results.data;

      setMegaPagos(megaPagos);
    } catch (error) {
      console.error("Error en la ejecución de consultas:", error);
    } finally {
      //llamar bancos
    }
  }

  // Ejecutar la función solo una vez al montar el componente
  useEffect(() => {
    ejecutarConsultas()
  }, []); // Array vacío asegura que se ejecuta solo una vez

  // Función para generar una llave aleatoria
  const generarLlaveAleatoria = (): string => {
    return forge.random.getBytesSync(32); // se usa plana
  }

  // Función para encriptar con AES
  const encriptarAES = (value: any, key: string): string => {
    const keyBytes = forge.util.createBuffer(key);
    // Generate a random IV
    const iv = forge.random.getBytesSync(16);
    // Create a cipher object
    const cipherObject = forge.cipher.createCipher("AES-CBC", keyBytes);

    cipherObject.start({ iv: iv });
    cipherObject.update(forge.util.createBuffer(value, "utf8"));
    cipherObject.finish();

    const ciphertext = cipherObject.output.getBytes();
    const ivBase64 = forge.util.encode64(iv);
    const ciphertextBase64 = forge.util.encode64(ciphertext);

    return forge.util.encode64(
      JSON.stringify({ iv: ivBase64, value: ciphertextBase64 })
    );
  }

  // Función para encriptar la llave aleatoria con la llave pública usando RSA
  const encriptarRSA = (key: string, publicKeyBase64: string): string => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyBase64); // Crear la llave pública RSA

    const encryptedKey = publicKey.encrypt(key, "RSA-OAEP", {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    }); // Encriptar con RSA-OAEP
    return forge.util.encode64(encryptedKey);
  }

  const manejarEncriptacion = async (data:any) => {
    try {
      // Paso 1: Obtener la llave pública desde la API
      const publicKeyBase64 = megaPagos.publicKey;
      const derBytes = Buffer.from(publicKeyBase64, "base64").toString("ascii");

      // Paso 2: Generar una llave aleatoria de 256 bits
      const randomKey = generarLlaveAleatoria();

      console.log(data)

      const dataString = JSON.stringify(data)

      // Paso 4: Encriptar los datos con AES
      const encryptedData = encriptarAES(dataString, randomKey)

      // Paso 5: Encriptar la llave aleatoria con RSA
      const encryptedKey = encriptarRSA(randomKey, derBytes)

      // Construir el objeto final
      const resultadoEncriptado = {
        encryptedKey,
        encryptedData,
      }

      // Paso 6: Codificar el resultado en Base64
      const resultadoBase64 = forge.util.encode64(
        JSON.stringify(resultadoEncriptado)
      )

      // Actualizar el estado con el resultado
      setResultado(resultadoBase64)
      setError(null)
      return resultadoBase64
    } catch (err: any) {
      console.error("Error en el proceso de encriptación:", err)
      setError(err.message)
    }
  }

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
      direccion: "",
      email: "",
      confirmEmail: "",
      nit: "0",
      empresa: "",
      banco: "",
      terminos: false,
    });

  return (
    <section className={styles.Payment}>
      <h3 className={styles.Payment__title}>Transferencia Interbancaria PSE</h3>
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
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={transactionData}
      />
    </section>
  );
};
