import { z } from 'zod';
import type { TxType } from '../types';

export const txInputSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Pick a valid date'),
  // Coerce from string -> number and validate
  amount: z.coerce.number().positive('Amount must be > 0'),
  type: z.enum(['income', 'expense'] as const).transform(v => v as TxType),
  category: z.string().min(1, 'Pick a category'),
  note: z.string().optional(),
});

export type TxInput = z.infer<typeof txInputSchema>;

export function validateTx(input: TxInput) {
  const res = txInputSchema.safeParse(input);
  if (res.success) return { ok: true as const, data: res.data };
  return { ok: false as const, errors: res.error.flatten().fieldErrors };
}
