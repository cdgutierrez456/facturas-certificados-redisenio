'use client'

import Link from 'next/link'
import { useState } from 'react'

import { X, Menu } from 'lucide-react'

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
    <header className={`flex h-[110px] fixed top-0 left-0 w-full items-center z-50 shadow-md ${isSolid ? 'bg-white' : 'bg-black/50 backdrop-blur-md'}`}>
      <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center px-4 md:px-8">
        <Link href="/">
          <h1 className={`font-bold text-xl md:text-2xl ${isSolid ? 'text-black' : 'text-white'}`}>
            Pago de facturas
          </h1>
        </Link>
        <nav className="hidden md:flex gap-5 justify-end">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`text-[18px] hover:text-yellow-500 transition-colors ${isSolid ? 'text-black' : 'text-white'}`}
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <button
          onClick={toggleMobileMenu}
          className="block md:hidden text-black focus:outline-none"
        >
          {isMobileMenuOpen
            ? <X size={30} className={isSolid ? 'text-black' : 'text-white'} />
            : <Menu size={30} className={isSolid ? 'text-black' : 'text-white'} />
          }
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          className={`md:hidden absolute top-[110px] left-0 w-full shadow-lg border-t border-gray-100 flex flex-col items-center py-6 gap-6 animate-in slide-in-from-top-5 duration-300 ${isSolid ? 'bg-white' : 'bg-black/50 backdrop-blur-md'}`}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[20px] font-medium hover:text-yellow-500 ${isSolid ? 'text-black' : 'text-white'}`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}