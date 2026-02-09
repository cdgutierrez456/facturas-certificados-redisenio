import Link from 'next/link'

export const Footer = () => {
  return(
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Pago De Factura</h2>
          </div>
          <p className="text-sm mt-6">
            <Link href={'/login'}>&copy;</Link> 2025 Todos los derechos reservados
          </p>
        </div>
        <div className="hidden md:block w-px bg-white/20 mx-6" />
        <div className="flex flex-col gap-2">
          <ul className="space-y-1 text-sm">
            <li>Megapagos.co sas</li>
            <li>Cra 7 4 32, Aguadas, Caldas</li>
            <li>comunicaciones@certificadostradicionylibertad.co</li>
            <li>3206975857</li>
          </ul>
        </div>
        <div className="hidden md:block w-px bg-white/20 mx-6" />
        <div className="flex flex-col gap-2">
          <ul className="space-y-2 text-sm">
            <li><Link href="/politicas-privacidad" className="hover:underline">Política de privacidad</Link></li>
            <li><Link href="/terms" className="hover:underline">Términos y condiciones</Link></li>
            <li><Link href="/preguntas-frecuentes" className="hover:underline">Preguntas frecuentes</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer