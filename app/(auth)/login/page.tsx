import { X, ArrowLeft } from 'lucide-react'
import Link from 'next/link';

import FormLogin from '@/components/modules/login/FormLogin';

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl z-10">
        <Link href={'/'} className='flex gap-3'>
          <ArrowLeft />
          Home
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenid@</h2>
          <p className="text-gray-400 text-sm">Ingresa tus datos para gestionar la plataforma</p>
        </div>

        <FormLogin />

      </div>
    </div>
  );
}