'use client'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase/serviciosFaqs";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

import { zodResolver } from '@hookform/resolvers/zod';

import { LoginDTO } from '@/interfaces/Login';
import { loginSchema } from '@/schemas/login';

export default function FormLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async ({ email, password }: LoginDTO) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/adminQ");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, intenta nuevamente.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-300 ml-1 uppercase tracking-wider">
          Correo Electrónico
        </label>
        <div className="relative group">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors
            ${errors.email ? 'text-red-400' : 'text-gray-500 group-focus-within:text-yellow'}`}>
            <Mail size={20} />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="ejemplo@correo.com"
            className={`w-full bg-gray-900/50 border text-white placeholder-gray-600 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 transition-all
              ${errors.email
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-700 focus:border-yellow focus:ring-yellow'
              }`}
          />
        </div>
        {errors.email && (
          <span className="text-xs text-red-400 ml-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Contraseña</label>
        </div>
        <div className="relative group">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors
            ${errors.password ? 'text-red-400' : 'text-gray-500 group-focus-within:text-yellow'}`}>
            <Lock size={20} />
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={`w-full bg-gray-900/50 border text-white placeholder-gray-600 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 transition-all
              ${errors.password
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-700 focus:border-yellow focus:ring-yellow'
              }`}
          />
        </div>
          {errors.password && (
          <span className="text-xs text-red-400 ml-1 block">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow hover:bg-yellow-300 text-black font-bold py-3.5 rounded-full shadow-lg hover:shadow-yellow/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Iniciar Sesión <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  )
}
