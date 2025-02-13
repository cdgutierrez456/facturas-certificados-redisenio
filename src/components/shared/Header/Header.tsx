'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.sass'
import { FiMenu, FiX } from 'react-icons/fi'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.Header}>
      <h1 className={styles.Header__title}>Pago de facturas</h1>
      <button className={styles.MenuButton} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <nav className={`${styles.Nav} ${menuOpen ? styles.Nav__open : ''}`}>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/" className={styles.Nav__link}>Pagar facturas en línea</Link>
          </li>
          <li>
            <Link href="/faqs" className={styles.Nav__link}>Preguntas frecuentes</Link>
          </li>
          <li>
            <Link href="/blogg" className={styles.Nav__link}>Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}