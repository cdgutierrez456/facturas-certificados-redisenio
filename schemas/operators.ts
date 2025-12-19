import { z } from 'zod';

export const dataInvoiceSchema = z.object({
  value: z.string(),
  operator: z.string(),
  referenceMethod: z.string(),
  referenceNumber: z.string(),
});
