import { z } from 'zod';

export const dataInvoiceSchema = z.object({
  value: z.string().optional(),
  operator: z.string(),
  referenceMethod: z.string().optional(),
  referenceNumber: z
    .string()
    .min(1, { message: "El campo no puede estar vacío" })
    .regex(/^\d+$/, { message: "Solo se permiten números" })
    .max(30, { message: "El número no puede exceder los 30 dígitos" }),
});
