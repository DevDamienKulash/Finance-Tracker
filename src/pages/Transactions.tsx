import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTransactions } from '../app/store';
import { CATEGORIES } from '../app/categories';
import type { TxType } from '../types';
import { fmtCurrency } from '../lib/format';

import TransactionsFilters from '../components/TransactionsFilters';
import {
  applyFilters,
  DEFAULT_FILTERS,
  loadFilters,
  saveFilters,
  type TxFilters,
} from '../lib/filters';

import { validateTx, type TxInput } from '../lib/validation';
import EditTransactionModal from '../components/EditTransactionModal';
import type { Transaction } from '../types';

type FormState = TxInput;

export default function Transactions({ defaultType = 'expense' }: { defaultType?: TxType }) {
  const { state, dispatch } = useTransactions();

  // add-form state
  const [form, setForm] = useState<FormState>({
    date: new Date().toISOString().slice(0, 10),
    amount: 0,
    type: defaultType,
    category: 'Other',
    note: '',
  });
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  // filters state (persisted)
  const [filters, setFilters] = useState<TxFilters>(() => loadFilters());
  useEffect(() => { saveFilters(filters); }, [filters]);

  // update form if quick-add type changes
  useEffect(() => {
    setForm(f => ({ ...f, type: defaultType }));
  }, [defaultType]);

  // edit modal state
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const openEdit = (tx: Transaction) => { setEditing(tx); setEditOpen(true); };
  const closeEdit = () => { setEditOpen(false); setEditing(null); };

  // submit add
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = validateTx(form);
    if (!res.ok) { setErrors(res.errors); return; }
    setErrors({});
    dispatch({ type: 'add', payload: { ...form } });
    setForm(f => ({ ...f, amount: 0, note: '' }));
  };

  // derive filtered list
  const filtered = useMemo(() => applyFilters(state.txs, filters), [state.txs, filters]);
  const hasRows = filtered.length > 0;

  // confirm delete
  const removeTx = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'remove', payload: { id } });
    }
  };

  // helpers
  const fieldErr = (name: keyof FormState) => errors?.[name]?.[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transactions</h1>
      </div>

      {/* Filters */}
      <TransactionsFilters
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(DEFAULT_FILTERS)}
      />

      {/* Add Transaction */}
      <section className="bg-white border rounded-2xl p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-medium text-gray-700">Add a transaction</h2>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-6">
          <label className="sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-gray-600">Date</span>
            <input
              type="date"
              className={`w-full rounded-lg border px-3 py-2 ${fieldErr('date') ? 'border-rose-400' : ''}`}
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              aria-invalid={!!fieldErr('date')}
            />
            {fieldErr('date') && <p className="mt-1 text-xs text-rose-600">{fieldErr('date')}</p>}
          </label>

          <label className="sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-gray-600">Amount</span>
            <input
              type="number"
              step="0.01"
              min="0"
              className={`w-full rounded-lg border px-3 py-2 ${fieldErr('amount') ? 'border-rose-400' : ''}`}
              value={form.amount}
              onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
              placeholder="0.00"
              aria-invalid={!!fieldErr('amount')}
            />
            {fieldErr('amount') && <p className="mt-1 text-xs text-rose-600">{fieldErr('amount')}</p>}
          </label>

          <label>
            <span className="mb-1 block text-xs font-medium text-gray-600">Type</span>
            <select
              className={`w-full rounded-lg border px-3 py-2 ${fieldErr('type') ? 'border-rose-400' : ''}`}
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as TxType })}
              aria-invalid={!!fieldErr('type')}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {fieldErr('type') && <p className="mt-1 text-xs text-rose-600">{fieldErr('type')}</p>}
          </label>

          <label>
            <span className="mb-1 block text-xs font-medium text-gray-600">Category</span>
            <select
              className={`w-full rounded-lg border px-3 py-2 ${fieldErr('category') ? 'border-rose-400' : ''}`}
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              aria-invalid={!!fieldErr('category')}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {fieldErr('category') && <p className="mt-1 text-xs text-rose-600">{fieldErr('category')}</p>}
          </label>

          <label className="sm:col-span-4">
            <span className="mb-1 block text-xs font-medium text-gray-600">Note</span>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={form.note ?? ''}
              onChange={e => setForm({ ...form, note: e.target.value })}
              placeholder="Optional note"
            />
          </label>

          <div className="sm:col-span-2 flex items-end">
            <button className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
              Add
            </button>
          </div>
        </form>
      </section>

      {/* Table */}
      <section className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-medium text-gray-700">History</h2>
        </div>

        {hasRows ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="border-b text-gray-500">
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Category</th>
                  <th className="p-3 text-right font-medium">Amount</th>
                  <th className="p-3 text-left font-medium">Note</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-b last:border-b-0 hover:bg-gray-50/60">
                    <td className="p-3">{t.date}</td>
                    <td className="p-3 capitalize">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                          t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="p-3">{t.category}</td>
                    <td className="p-3 text-right font-medium">
                      {t.type === 'income' ? '+' : '-'}
                      {fmtCurrency(t.amount)}
                    </td>
                    <td className="p-3">{t.note ?? ''}</td>
                    <td className="p-3 text-right space-x-3">
                      <button
                        className="text-gray-700 underline-offset-2 hover:underline"
                        onClick={() => openEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 underline-offset-2 hover:underline"
                        onClick={() => removeTx(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-10 text-center text-sm text-gray-500">
            No results. Try clearing filters.
          </div>
        )}
      </section>

      {/* Edit modal */}
      <EditTransactionModal
        open={isEditOpen}
        tx={editing}
        onSave={(next) => {
          dispatch({ type: 'update', payload: next });
          closeEdit();
        }}
        onClose={closeEdit}
      />
    </div>
  );
}
