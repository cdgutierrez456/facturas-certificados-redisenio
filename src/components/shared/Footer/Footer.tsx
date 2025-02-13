import styles from './Footer.module.sass'
export const Footer = () => {
  return(
    <footer className={styles.Footer}>
      <h2>Pago de facturas</h2>
      <div>
        <p>megapagosco@gmail.com</p>
        <p>3100000000</p>
        <p>Medellin, Antioquia</p>
      </div>
      <div> 
        <p>Terminos y condiciones</p>
        <p>Politicas de privacidad</p>
      </div>
    </footer>
  )
}