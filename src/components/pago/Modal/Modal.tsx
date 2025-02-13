import React from "react";
import styles from "./Modal.module.sass";

export const TransactionModal = ({ isOpen, onClose, transaction }: any) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Pago aprobado</h3>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Código de pago</span>
            <span className={styles.approved}>{transaction.status}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Estado</span>
            <span className={styles.approved}>{transaction.status}</span>
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
            <span className={styles.spanBlack}>Banco lord</span>
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
            <h3>Pago de factura</h3>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Convenio</span>
            <span className={styles.spanBlack}>14 claro soluciones moviles</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Numero de referencia</span>
            <span className={styles.spanBlack}>123456</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Valor</span>
            <span className={styles.spanBlack}>{transaction.amount}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Costo de transaccion</span>
            <span className={styles.spanBlack}>5000.00</span>
          </div>
          <div className={styles.modalHeader}>
            <h3>Comprobante de pago Factura</h3>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Fecha</span>
            <span className={styles.spanBlack}>{transaction.date}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Sucursal</span>
            <span className={styles.spanBlack}>8502</span>
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
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Finalizar
        </button>
      </div>
    </div>
  )
}
