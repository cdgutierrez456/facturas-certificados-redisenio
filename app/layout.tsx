import { Roboto } from 'next/font/google'
import { Footer } from '@/components/shared/Footer'
import '../sass/globals.sass'
import '../globals.css'

const roboto = Roboto({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
