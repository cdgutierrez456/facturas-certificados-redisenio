"use client"
import {AdminPanel} from 'app/components/questions/Admin';
import styles from "./AdminQ.module.sass";

const AdminPage = () => {
  return (
    <div className={styles.Container}>
      <h2>Panel de Administración de preguntas</h2>
      <AdminPanel />
    </div>
  )
}

export default AdminPage;
