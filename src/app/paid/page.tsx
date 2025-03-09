'use client'
import { useEffect, useState } from "react"
import forge from "node-forge"
import { getLastTransaction } from "app/utils/storage"
import { manejarEncriptacion } from "app/utils/encript"
import { realizarConsultaPagoPSE } from "app/services/megaPagos/consultasMegaPagos"
import Swal from "sweetalert2"
import styles from "./Paid.module.sass"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()
    const [lastTransaction, setLastTransaction] = useState<any>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [transaction, setTransaction] = useState<any>(
        {
            codigoPago: "",
            date: "",
            amount: "",
            paymentId: "",
            paymentMethod: "",
            status: "",
            requestId: "",
            email: "",
            bank: "",
            convenio:"",
            referencia: "",
            cost : "",
            sucursal: ""
          }
    )

    useEffect(() => {
        const data = getLastTransaction()
        if (data) {
            setLastTransaction(data)
        }
    }, [])

    useEffect(() => {
        consultarT()
    }, [lastTransaction]);

    const procesar = async () => {
        if (!lastTransaction) return
        try {
            const encriptedData = await manejarEncriptacion(
                parseInt(forge.util.decode64(lastTransaction.tansactionId)), 
                lastTransaction.publicKey
            )

            if (encriptedData) {
                const consultaInf = await realizarConsultaPagoPSE(
                    lastTransaction.bearer,
                    encriptedData
                )
                console.log(consultaInf)
                mapearTransaction(consultaInf)
            }
        } catch (error) {
            console.error("Error procesando la transacción:", error)
        }
    }

    const mapearTransaction = (data: any) => {
        const nuevaTransaccion = {
            codigoPago: data.externalDetails.payment_code ,
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
        }
    
        console.log(nuevaTransaccion)
        setTransaction(nuevaTransaccion)
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
                        Swal.showLoading(Swal.getDenyButton())
                    },
                });
    
                await procesar(); // Consulta los datos de la transacción
    
                Swal.close(); // Cierra el Swal de carga cuando la consulta termina
            } else {
                console.log("El usuario canceló la consulta.");
            }
        })
    }

    const onClose= () => {
        router.push( "https://pagos-rose.vercel.app/")
    }

    const nextFactura = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % lastTransaction.length)
    }
  
    const prevFactura = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + lastTransaction.length) % lastTransaction.length)
    }

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
          <h3 className={transaction.status === 109 ? styles.rejected : styles.approved}>
                        {transaction.status === 1 ? "Pago aprobado" : "Transacción rechazada"}
                    </h3>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Código de pago</span>
              <span className={styles.spanBlack}>{transaction.codigoPago}</span>
            </div>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Estado</span>
              <span className={transaction.status === 109 ? styles.rejected : styles.approved}>
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
              <h3 className={transaction.status === 109 ? styles.rejected : styles.approved}>
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
            <div className={styles.modalHeader}>
              <h3 className={transaction.status === 109 ? styles.rejected : styles.approved}>
                Comprobante de pago Factura
                </h3>
            </div>
            {lastTransaction.length > 0 && (
          <div className={styles.carouselContainer}>
            <button className={styles.navButton} onClick={prevFactura}>&#9664;</button>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Cantidad</span>
              <span className={styles.spanBlack}>{lastTransaction.cantidad}</span>
            </div>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Fecha</span>
              <span className={styles.spanBlack}>{transaction.date}</span>
            </div>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Sucursal</span>
              <span className={styles.spanBlack}>{transaction.sucursal}</span>
            </div>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Dispositivo</span>
              <span className={styles.spanBlack}>0123456</span>
            </div>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Id Trx</span>
              <span className={styles.spanBlack}>0123456</span>
            </div>
            <div className={styles.transactionDetail}>
              <span className={styles.span}>Id Aut</span>
              <span className={styles.spanBlack}>0123456</span>
            </div>
            <button className={styles.navButton} onClick={nextFactura}>&#9654;</button>
          </div>
        )}
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            Finalizar
          </button>
        </div>
      </div>
    )
}
