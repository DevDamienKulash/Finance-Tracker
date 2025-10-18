import { z } from 'zod';
import type { Transaction } from '../types';

const KEY = 'pft::v1::transactions';

const TxSchema: z.ZodType<Transaction> = z.object({
  id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  amount: z.number(),
  type: z.union([z.literal('income'), z.literal('expense')]),
  category: z.string(),
  note: z.string().optional(),
  account: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const TxArraySchema: z.ZodType<Transaction[]> = z.array(TxSchema);

export const storage = {
  load(): Transaction[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return TxArraySchema.parse(data); // typed as Transaction[]
    } catch (e) {
      console.warn('Failed to load transactions; resetting.', e);
      return [];
    }
  },
  save(txs: Transaction[]): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(txs));
    } catch (e) {
      console.error('Failed to save transactions', e);
    }
  },
  clear(): void {
    localStorage.removeItem(KEY);
  },
};
