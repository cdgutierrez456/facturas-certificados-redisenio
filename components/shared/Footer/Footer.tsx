import Link from 'next/link'
import styles from './Footer.module.sass'
export const Footer = () => {
  return(
    <footer className={styles.Footer}>
      <h2>Pago de facturas</h2>
      <div>
        <p>recaudodefacturas@gmail.com</p>
        <p>3146681005</p>
        <p>Medellin, Antioquia</p>
      </div>
      <div> 
        <Link href="/terms" className={styles.Footer__link}>Terminos y condiciones</Link>
        <br />
        <br />
        <Link href="/politics" className={styles.Footer__link}>Politicas de privacidad</Link>
      </div>
    </footer>
  )
}