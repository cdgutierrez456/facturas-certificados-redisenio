"use client";
import { useEffect, useRef, useState } from "react";
import forge from "node-forge";
import { getLastTransaction } from "app/utils/storage";
import { manejarEncriptacion } from "app/utils/encript";
import { realizarConsultaPagoPSE } from "app/services/megaPagos/consultasMegaPagos";
import Swal from "sweetalert2";
import styles from "./Paid.module.sass";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [lastTransaction, setLastTransaction] = useState<any>({ cantidad: 0 });
  const [facturas, setFacturas] = useState<any[]>([
    {
      fecha: "",
      sucursal: "",
      dispositivo: "",
      idTrx: "",
      idAut: "",
    },
  ]);
  const [transaction, setTransaction] = useState<any>({
    codigoPago: "",
    date: "",
    amount: "",
    paymentId: "",
    paymentMethod: "",
    status: "",
    requestId: "",
    email: "",
    bank: "",
    convenio: "",
    referencia: "",
    cost: "",
    sucursal: "",
  })

  useEffect(() => {
    consultarT();
  }, [lastTransaction])

  useEffect(() => {
    const data = getLastTransaction()
    if (data) {
      setLastTransaction(data)
      console.log("oeoeoeo",data)
      const cantidad = data.cantidad;
      const facturasMap = Array.from({ length: cantidad }, (_, i) => ({
        fecha: transaction.date,
        sucursal: transaction.sucursal,
        dispositivo: `Disp-${i + 1}`,
        idTrx: `Trx-${i + 1}`,
        idAut: `Aut-${i + 1}`,
      }));

      setFacturas(facturasMap);
    }
  }, [])

  const procesar = async () => {
    if (!lastTransaction) return;
    try {
      const encriptedData = await manejarEncriptacion(
        parseInt(forge.util.decode64(lastTransaction.tansactionId)),
        lastTransaction.publicKey
      );

      if (encriptedData) {
        const consultaInf = await realizarConsultaPagoPSE(
          lastTransaction.bearer,
          encriptedData
        );
        console.log(lastTransaction);
        console.log(consultaInf);
        mapearTransaction(consultaInf);
      }
    } catch (error) {
      console.error("Error procesando la transacción:", error);
    }
  }

  const mapearTransaction = (data: any) => {
    const nuevaTransaccion = {
      codigoPago: data.externalDetails.payment_code,
      status: data.status,
      date: data.internalDetails.date_payment,
      paymentMethod: "PSE",
      banco: lastTransaction.banco,
      paymentId: data.transaction_id,
      requestId: data.externalDetails.ticketId,
      email: data.payerDetails.email,
      convenio: data.internalDetails.description_product,
      referencia: data.externalDetails.payment_code,
      amount: data.amount,
      cost: "200",
      sucursal: data.externalDetails.entity_franquise,
    };

    console.log(nuevaTransaccion);
    setTransaction(nuevaTransaccion);
  }

  const consultarT = () => {
    Swal.fire({
      title: "Transacción ejecutada",
      text: "Consultar cómo va tu transacción.",
      icon: "success",
      confirmButtonText: "Consultar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cargando...",
          text: "Estamos consultando el estado de tu transacción.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(Swal.getDenyButton());
          },
        });

        await procesar(); // Consulta los datos de la transacción

        Swal.close(); // Cierra el Swal de carga cuando la consulta termina
      } else {
        console.log("El usuario canceló la consulta.");
      }
    });
  }

  const onClose = () => {
    router.push("https://pagos-rose.vercel.app/");
  }

  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  }


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3
            className={
              transaction.status === 109 ? styles.rejected : styles.approved
            }
          >
            {transaction.status === 1
              ? "Pago aprobado"
              : "Transacción rechazada"}
          </h3>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Código de pago</span>
            <span className={styles.spanBlack}>{transaction.codigoPago}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Estado</span>
            <span
              className={
                transaction.status === 109 ? styles.rejected : styles.approved
              }
            >
              {transaction.status === 1 ? "Aprobado" : "Rechazado"}
            </span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Fecha de pago</span>
            <span className={styles.spanBlack}>{transaction.date}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Medio de pago</span>
            <span className={styles.spanBlack}>
              {transaction.paymentMethod}
            </span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Banco</span>
            <span className={styles.spanBlack}>{transaction.banco}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>ID pago</span>
            <span className={styles.spanBlack}>{transaction.paymentId}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>ID solicitud</span>
            <span className={styles.spanBlack}>{transaction.requestId}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Email del pagador</span>
            <span className={styles.spanBlack}>{transaction.email}</span>
          </div>
          <div className={styles.modalHeader}>
            <h3
              className={
                transaction.status === 109 ? styles.rejected : styles.approved
              }
            >
              Pago de factura
            </h3>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Convenio</span>
            <span className={styles.spanBlack}>{transaction.convenio}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Numero de referencia</span>
            <span className={styles.spanBlack}>{transaction.referencia}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Valor</span>
            <span className={styles.spanBlack}>{transaction.amount}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Costo de transaccion</span>
            <span className={styles.spanBlack}>{transaction.cost}</span>
          </div>
          <div className={styles.carouselControls}>
            <button onClick={scrollLeft} className={styles.scrollButton}>
            ◀
            </button>
            <div className={styles.carouselContainer} ref={carouselRef}>
              {facturas.map((factura, index) => (
                <div key={index} className={styles.facturaSlide}>
                  <div className={styles.modalHeader}>
                    <h3
                      className={
                        transaction.status === 109
                          ? styles.rejected
                          : styles.approved
                      }
                    >
                      Comprobante de pago Factura # {index + 1}
                    </h3>
                  </div>
                  <div className={styles.transactionDetail}>
                    <span className={styles.span}>Fecha</span>
                    <span className={styles.spanBlack}>{factura.fecha}</span>
                  </div>
                  <div className={styles.transactionDetail}>
                    <span className={styles.span}>Sucursal</span>
                    <span className={styles.spanBlack}>
                      {factura.sucursal}
                    </span>
                  </div>
                  <div className={styles.transactionDetail}>
                    <span className={styles.span}>Dispositivo</span>
                    <span className={styles.spanBlack}>{factura.dispositivo}</span>
                  </div>
                  <div className={styles.transactionDetail}>
                    <span className={styles.span}>Id Trx</span>
                    <span className={styles.spanBlack}>{factura.dispositivo}</span>
                  </div>
                  <div className={styles.transactionDetail}>
                    <span className={styles.span}>Id Aut</span>
                    <span className={styles.spanBlack}>{factura.dispositivo}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={scrollRight} className={styles.scrollButton}>
            ▶
            </button>
          </div>
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Finalizar
        </button>
      </div>
    </div>
  );
}
