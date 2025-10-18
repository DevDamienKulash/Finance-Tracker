export type TxType = 'income' | 'expense';


export interface Transaction {
id: string;
date: string; // YYYY-MM-DD
amount: number; // positive; sign derived from type
type: TxType;
category: string;
note?: string;
account?: string;
createdAt: string; // ISO
updatedAt: string; // ISO
}


export interface Filters {
monthISO: string; // YYYY-MM
search?: string;
category?: string;
type?: TxType | 'all';
}