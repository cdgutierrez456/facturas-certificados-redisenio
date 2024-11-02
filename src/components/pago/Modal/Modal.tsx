import React from "react";
import styles from "./Modal.module.sass";

export const TransactionModal = ({ isOpen, onClose, transaction }:any) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Transacción Exitosa</h3>
        </div>
        <p>El pago de su factura ha sido recibido exitosamente</p>
        <div className={styles.modalBody}>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Fecha</span>
            <span className={styles.spanBlack}>{transaction.date}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Valor</span>
            <span className={styles.spanBlack}>{transaction.amount}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>ID pago</span>
            <span className={styles.spanBlack}>{transaction.paymentId}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Medio de pago</span>
            <span className={styles.spanBlack}>{transaction.paymentMethod}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Estado del pago</span>
            <span className={styles.approved}>{transaction.status}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>ID de la solicitud</span>
            <span className={styles.spanBlack}>{transaction.requestId}</span>
          </div>
          <div className={styles.transactionDetail}>
            <span className={styles.span}>Correo</span>
            <span className={styles.spanBlack}>{transaction.email}</span>
          </div>
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  )
}