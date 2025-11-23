'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.sass'

const menuItems = [
  { text: 'Paga tu factura en línea', link: '/pagar-factura' },
  { text: 'Blog', link: '/blog' },
  { text: 'Preguntas frecuentes', link: '/preguntas-frecuentes' },
];

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pago de facturas</h1>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.link} className={styles.menuItem}>
              {item.text}
            </Link>
          ))}
        </nav>
        {/* Menú hamburguesa */}
        <div className={styles.hamburger} onClick={toggleMobileMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>
    </header>
  )
}