import type { Transaction, TxType } from '../types';


export const ym = (d: string) => d.slice(0, 7); // YYYY-MM


export function totalsForMonth(txs: Transaction[], monthISO: string) {
let income = 0, expense = 0;
for (const t of txs) {
if (ym(t.date) !== monthISO) continue;
if (t.type === 'income') income += t.amount; else expense += t.amount;
}
return { income, expense, net: income - expense };
}


export function categorySumsForMonth(txs: Transaction[], monthISO: string) {
const map = new Map<string, number>();
for (const t of txs) {
if (ym(t.date) !== monthISO || t.type !== 'expense') continue; // chart expenses by category
map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
}
return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}


export function lastNMonthsSeries(txs: Transaction[], n = 12) {
const months: string[] = [];
const now = new Date();
for (let i = n - 1; i >= 0; i--) {
const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
const m = d.toISOString().slice(0, 7);
months.push(m);
}
return months.map(m => {
let income = 0, expense = 0;
for (const t of txs) {
if (ym(t.date) !== m) continue;
if (t.type === 'income') income += t.amount; else expense += t.amount;
}
return { month: m, income, expenses: expense };
});
}