import { z } from 'zod';

export const paymentSchema = z.object({
  userType: z.string().min(1, 'Campo requerido'),
  idType: z.string().min(1, 'Campo requerido'),
  idNumber: z
    .string()
    .min(1, 'Campo requerido')
    .regex(/^\d+$/, 'El número de identificación debe contener solo números'),
  fullName: z
    .string()
    .min(1, 'Campo requerido')
    .regex(/^[a-zA-Z\s\u00C0-\u00FF]+$/, 'El nombre solo puede contener letras y espacios'),
  cellphone: z
    .string()
    .min(10, 'El celular debe tener al menos 10 dígitos')
    .regex(/^\d+$/, 'El celular debe contener solo números'),
  email: z
    .email('Ingresa un correo electrónico válido'),
  confirmEmail: z
    .string()
    .min(1, 'Confirma tu correo'),
  bank: z.string().min(1, 'Campo requerido'),
  terms: z.literal(true),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Los correos electrónicos no coinciden",
  path: ["confirmEmail"],
});