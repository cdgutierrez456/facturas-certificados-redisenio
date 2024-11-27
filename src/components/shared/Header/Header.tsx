import Link from 'next/link'
import styles from './Header.module.sass'

export const Header = async () => {
  
    return (
      <header className={styles.Header}>
        <h1 className={styles.Header__title}>Pago de facturas</h1>
        <nav>
          <ul className={styles.Header__list}>
            <li>
              <Link href="/">
                Pagar facturas en linea
              </Link>
            </li>
            <li>
              <Link href="/faqs">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/blogg">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </header>)
  }