import { useEffect, useState, type FormEvent } from "react";
import type { Transaction, TxType } from "../types";
import { CATEGORIES } from "../app/categories";
import Modal from "./Modal";
import { validateTx } from "../lib/validation";

export default function EditTransactionModal({
  open,
  tx,
  onSave,
  onClose,
}: {
  open: boolean;
  tx: Transaction | null;
  onSave: (next: Transaction) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Transaction | null>(tx);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  useEffect(() => { setForm(tx); setErrors({}); }, [tx]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const res = validateTx({
      date: form.date,
      amount: form.amount,
      type: form.type,
      category: form.category,
      note: form.note,
    });
    if (!res.ok) { setErrors(res.errors); return; }
    setErrors({});
    onSave({ ...form, updatedAt: new Date().toISOString() });
  };

  const fieldErr = (name: 'date' | 'amount' | 'type' | 'category' | 'note') => errors?.[name]?.[0];

  return (
    <Modal open={open} title="Edit transaction" onClose={onClose} footer={
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded-xl border" onClick={onClose} type="button">Cancel</button>
        <button className="px-4 py-2 rounded-xl bg-gray-900 text-white" onClick={submit as any}>Save</button>
      </div>
    }>
      {!form ? null : (
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-6">
          <label className="sm:col-span-2">
            <span className="block text-xs font-medium text-gray-600 mb-1">Date</span>
            <input
              type="date"
              className={`w-full border rounded-lg px-3 py-2 ${fieldErr('date') ? 'border-rose-400' : ''}`}
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
            {fieldErr('date') && <p className="mt-1 text-xs text-rose-600">{fieldErr('date')}</p>}
          </label>

          <label className="sm:col-span-2">
            <span className="block text-xs font-medium text-gray-600 mb-1">Amount</span>
            <input
              type="number"
              step="0.01"
              min="0"
              className={`w-full border rounded-lg px-3 py-2 ${fieldErr('amount') ? 'border-rose-400' : ''}`}
              value={form.amount}
              onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
            />
            {fieldErr('amount') && <p className="mt-1 text-xs text-rose-600">{fieldErr('amount')}</p>}
          </label>

          <label>
            <span className="block text-xs font-medium text-gray-600 mb-1">Type</span>
            <select
              className={`w-full border rounded-lg px-3 py-2 ${fieldErr('type') ? 'border-rose-400' : ''}`}
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as TxType })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {fieldErr('type') && <p className="mt-1 text-xs text-rose-600">{fieldErr('type')}</p>}
          </label>

          <label>
            <span className="block text-xs font-medium text-gray-600 mb-1">Category</span>
            <select
              className={`w-full border rounded-lg px-3 py-2 ${fieldErr('category') ? 'border-rose-400' : ''}`}
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {fieldErr('category') && <p className="mt-1 text-xs text-rose-600">{fieldErr('category')}</p>}
          </label>

          <label className="sm:col-span-6">
            <span className="block text-xs font-medium text-gray-600 mb-1">Note</span>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.note ?? ''}
              onChange={e => setForm({ ...form, note: e.target.value })}
              placeholder="Optional note"
            />
          </label>
        </form>
      )}
    </Modal>
  );
}
