import type { Transaction, TxType } from '../types';

export type TxFilters = {
  month: string; // YYYY-MM
  type: TxType | 'all';
  category: 'All' | string;
  search: string;
};

export const DEFAULT_FILTERS: TxFilters = {
  month: new Date().toISOString().slice(0, 7),
  type: 'all',
  category: 'All',
  search: '',
};

const KEY = 'pft::v1::filters';
const ym = (d: string) => d.slice(0, 7);

export function loadFilters(): TxFilters {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_FILTERS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_FILTERS, ...parsed } as TxFilters;
  } catch {
    return DEFAULT_FILTERS;
  }
}

export function saveFilters(f: TxFilters) {
  try {
    localStorage.setItem(KEY, JSON.stringify(f));
  } catch {}
}

export function applyFilters(list: Transaction[], f: TxFilters): Transaction[] {
  const q = f.search.trim().toLowerCase();
  return list.filter((t) => {
    if (ym(t.date) !== f.month) return false;
    if (f.type !== 'all' && t.type !== f.type) return false;
    if (f.category !== 'All' && t.category !== f.category) return false;
    if (q) {
      const hay = `${t.category} ${t.note ?? ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
