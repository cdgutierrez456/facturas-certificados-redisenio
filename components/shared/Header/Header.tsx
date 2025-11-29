'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.sass'

interface HeaderProps {
  isSolid?: boolean
}

const menuItems = [
  { text: 'Paga tu factura en línea', link: '/' },
  { text: 'Blog', link: '/blog' },
  { text: 'Preguntas frecuentes', link: '/preguntas-frecuentes' },
];

export default function Header({ isSolid }: HeaderProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {
        isSolid ? (
          <header className="bg-white flex h-[110px] fixed top-0 left-0 w-full items-center z-50 shadow-md">
            <div className='w-full max-w-7xl flex justify-between mx-auto'>
              <Link href='/'>
                <h1 className="font-bold text-2xl text-black flex-1">Pago de facturas</h1>
              </Link>
              <nav className="flex gap-5 justify-end">
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.link} className="text-black text-[20px]">
                    {item.text}
                  </Link>
                ))}
              </nav>
              {/* Menú hamburguesa */}
              {/* <div className={styles.hamburger} onClick={toggleMobileMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
              </div> */}
            </div>
          </header>
        ) : (
          <header className={styles.header}>
            <div className={styles.container}>
              <Link href='/'>
                <h1 className={styles.title}>Pago de facturas</h1>
              </Link>
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
    </>
  )
}