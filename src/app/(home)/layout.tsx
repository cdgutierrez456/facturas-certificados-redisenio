import styles from './HomeLayout.module.sass'
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "📲 Pago de Facturas | Claro, Tigo, Movistar, WOM, Virgin",
  description: "Paga tus facturas de operadores telefónicos de forma rápida y segura. Compatible con Claro, Tigo, Movistar, WOM y Virgin Mobile.",
  keywords: [
    "pago de facturas",
    "operadores telefónicos",
    "Claro",
    "Tigo",
    "Movistar",
    "WOM",
    "Virgin",
    "facturas en línea",
    "servicios móviles",
    "pago seguro"
  ],
  authors:[{ name: "pagos de facturas Team", url: "https://pagosdefacturas" },],
  robots: "index, follow", // Asegura que los motores de búsqueda rastreen y sigan los enlaces
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}