import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio" })
    .email(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
});