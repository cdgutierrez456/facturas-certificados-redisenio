"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import forge from "node-forge";
import Image from "next/image";

import Header from "@/components/shared/Header/Header";
import PaymentStatus from "@/components/modules/payment/PaymentStatus";

import { consultarLlave, realizarConsultaPagoPSE } from "@/services/megaPagos/consultasMegaPagos";
import { getLastTransaction } from "@/utils/storage";
import { manejarEncriptacion } from "@/utils/encript";

import styles from "./Paid.module.sass";

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

  // useEffect(() => {
  //   consultarT();
  // }, [lastTransaction])

  useEffect(() => {
    // const data = getLastTransaction()
    // if (data) {
    //   setLastTransaction(data)
    //   const cantidad = data.cantidad;
    //   const facturasMap = Array.from({ length: cantidad }, (_, i) => ({
    //     fecha: transaction.date,
    //     sucursal: transaction.sucursal,
    //     dispositivo: `Disp-${i + 1}`,
    //     idTrx: `Trx-${i + 1}`,
    //     idAut: `Aut-${i + 1}`,
    //   }));

    //   setFacturas(facturasMap);
    // }
    procesar()
  }, [])

  const procesar = async () => {
    const tansactionId = localStorage.getItem('transactionId')
    const accessToken = localStorage.getItem('accessToken')
    if (!tansactionId) return;
    try {
      const keysResponse = await consultarLlave();
      const publicKey = keysResponse.data.public_key;
      const paseData = parseInt(forge.util.decode64(tansactionId))
      const encriptedData = await manejarEncriptacion(paseData, publicKey);
      if (encriptedData) {
        const consultaInf = await realizarConsultaPagoPSE(
          `${accessToken}`,
          encriptedData
        );
        // mapearTransaction(consultaInf);
        setTransaction(consultaInf)
      }
    } catch (error) {
      console.error("Error procesando la transacción:");
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

    setTransaction(nuevaTransaccion);
  }

  const onClose = () => {
    router.push("/");
  }

  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -382, behavior: "smooth" });
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  }


  return (
    // <div className={styles.modalOverlay}>

    //   <Header />
    //   <div className={styles.modalContent}>
    //     <div className={styles.modalHeader}>
    //       <h3
    //         className={
    //           transaction.status === 109 ? styles.rejected : styles.approved
    //         }
    //       >
    //         {transaction.status === 1
    //           ? "Pago aprobado"
    //           : "Transacción rechazada"}
    //       </h3>
    //     </div>
    //     <div className={styles.modalBody}>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Código de pago</span>
    //         <span className={styles.spanBlack}>{transaction.codigoPago}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Estado</span>
    //         <span
    //           className={
    //             transaction.status === 109 ? styles.rejected : styles.approved
    //           }
    //         >
    //           {transaction.status === 1 ? "Aprobado" : "Rechazado"}
    //         </span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Fecha de pago</span>
    //         <span className={styles.spanBlack}>{transaction.date}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Medio de pago</span>
    //         <span className={styles.spanBlack}>
    //           {transaction.paymentMethod}
    //         </span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Banco</span>
    //         <span className={styles.spanBlack}>{transaction.banco}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>ID pago</span>
    //         <span className={styles.spanBlack}>{transaction.paymentId}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>ID solicitud</span>
    //         <span className={styles.spanBlack}>{transaction.requestId}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Email del pagador</span>
    //         <span className={styles.spanBlack}>{transaction.email}</span>
    //       </div>
    //       <div className={styles.modalHeader}>
    //         <h3
    //           className={
    //             transaction.status === 109 ? styles.rejected : styles.approved
    //           }
    //         >
    //           Pago de factura
    //         </h3>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Convenio</span>
    //         <span className={styles.spanBlack}>{transaction.convenio}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Numero de referencia</span>
    //         <span className={styles.spanBlack}>{transaction.referencia}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Valor</span>
    //         <span className={styles.spanBlack}>{transaction.amount}</span>
    //       </div>
    //       <div className={styles.transactionDetail}>
    //         <span className={styles.span}>Costo de transaccion</span>
    //         <span className={styles.spanBlack}>{transaction.cost}</span>
    //       </div>
    //       <div className={styles.carouselControls}>
    //         <button onClick={scrollLeft} className={styles.scrollButton}>
    //         ◀
    //         </button>
    //         <div className={styles.carouselContainer} ref={carouselRef}>
    //           {facturas.map((factura, index) => (
    //             <div key={index} className={styles.facturaSlide}>
    //               <div className={styles.modalHeader}>
    //                 <h3
    //                   className={
    //                     transaction.status === 109
    //                       ? styles.rejected
    //                       : styles.approved
    //                   }
    //                 >
    //                   Comprobante de pago Factura # {index + 1}
    //                 </h3>
    //               </div>
    //               <div className={styles.transactionDetail}>
    //                 <span className={styles.span}>Fecha</span>
    //                 <span className={styles.spanBlack}>{factura.fecha}</span>
    //               </div>
    //               <div className={styles.transactionDetail}>
    //                 <span className={styles.span}>Sucursal</span>
    //                 <span className={styles.spanBlack}>
    //                   {factura.sucursal}
    //                 </span>
    //               </div>
    //               <div className={styles.transactionDetail}>
    //                 <span className={styles.span}>Dispositivo</span>
    //                 <span className={styles.spanBlack}>{factura.dispositivo}</span>
    //               </div>
    //               <div className={styles.transactionDetail}>
    //                 <span className={styles.span}>Id Trx</span>
    //                 <span className={styles.spanBlack}>{factura.dispositivo}</span>
    //               </div>
    //               <div className={styles.transactionDetail}>
    //                 <span className={styles.span}>Id Aut</span>
    //                 <span className={styles.spanBlack}>{factura.dispositivo}</span>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //         <button onClick={scrollRight} className={styles.scrollButton}>
    //           ▶
    //         </button>
    //       </div>
    //     </div>
    //     <button onClick={onClose} className={styles.closeButton}>
    //       Finalizar
    //     </button>
    //   </div>
    // </div>
    <section className="relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          className="absolute object-cover"
          src="/images/hero-bg.png"
          alt="Background general del home"
          fill
        />
      </div>
      <Header />
      <PaymentStatus
        infoTransaction={transaction}
      />
    </section>
  );
}
