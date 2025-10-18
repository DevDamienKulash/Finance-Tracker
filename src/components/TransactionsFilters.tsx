import MonthPicker from './MonthPicker';
import { CATEGORIES } from '../app/categories';
import type { TxType } from '../types';
import type { TxFilters } from '../lib/filters';

export default function TransactionsFilters({
  value,
  onChange,
  onClear,
}: {
  value: TxFilters;
  onChange: (next: TxFilters) => void;
  onClear: () => void;
}) {
  const cats = ['All', ...CATEGORIES];

  return (
    <section className="bg-white border rounded-2xl p-4 shadow-sm" data-testid="filters">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700">Filters</h2>
        <button type="button" className="px-3 py-1.5 rounded-xl border text-sm" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">Month</label>
          <MonthPicker value={value.month} onChange={(v) => onChange({ ...value, month: v })} />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={value.type}
            onChange={(e) => onChange({ ...value, type: e.target.value as TxType | 'all' })}
          >
            <option value="all">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={value.category}
            onChange={(e) => onChange({ ...value, category: e.target.value as 'All' | string })}
          >
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            placeholder="Search notes or category"
          />
        </div>
      </div>
    </section>
  );
}
