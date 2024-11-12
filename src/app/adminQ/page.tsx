"use client"
import {AdminPanel} from 'app/components/questions/Admin';
import withAuth from 'app/services/firebase/withAut';
import styles from "./AdminQ.module.sass"

const AdminPage = () => {
  return (
    <div className={styles.Container}>
      <h2>Panel de Administración</h2>
      <AdminPanel />
    </div>
  )
}

export default withAuth(AdminPage);
