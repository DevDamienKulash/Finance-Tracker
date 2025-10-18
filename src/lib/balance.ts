import type { Transaction } from '../types';

export function balanceAsOf(txs: Transaction[], startingBalance: number, asOfISO?: string) {
  const asOf = asOfISO ?? new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let delta = 0;
  for (const t of txs) {
    if (t.date <= asOf) {
      delta += t.type === 'income' ? t.amount : -t.amount;
    }
  }
  return startingBalance + delta;
}
