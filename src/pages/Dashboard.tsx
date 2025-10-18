import { useMemo, useState } from 'react';
import { useTransactions } from '../app/store';
import MonthPicker from '../components/MonthPicker';
import { fmtCurrency } from '../lib/format';
import { totalsForMonth, categorySumsForMonth, lastNMonthsSeries } from '../lib/selectors';
import CategoryChart from '../components/CategoryChart';
import InflowIncomeChart from '../components/InflowIncomeChart';

function Card({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="card p-5">
      {(title || actions) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? <h2 className="text-sm font-medium text-gray-700">{title}</h2> : <div />}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: 'income' | 'expense' | 'net' }) {
  const toneBar = tone === 'income' ? 'bg-emerald-200' : tone === 'expense' ? 'bg-rose-200' : 'bg-brand-200';
  const toneText = tone === 'income' ? 'text-emerald-700' : tone === 'expense' ? 'text-rose-700' : 'text-brand-800';

  return (
    <div className="card p-4 border-gray-200">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${toneText}`}>{value}</div>
      <div className={`mt-3 h-1.5 rounded-full ${toneBar}`} />
    </div>
  );
}

export default function Dashboard() {
  const { state } = useTransactions();
  const [month, setMonth] = useState<string>(() => new Date().toISOString().slice(0, 7));

  const totals = useMemo(() => totalsForMonth(state.txs, month), [state.txs, month]);
  const catData = useMemo(() => categorySumsForMonth(state.txs, month), [state.txs, month]);
  const inflowData = useMemo(() => lastNMonthsSeries(state.txs, 12), [state.txs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="flex items-center gap-2">
          <MonthPicker value={month} onChange={setMonth} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Metric label="Income" value={fmtCurrency(totals.income)} tone="income" />
        <Metric label="Expenses" value={fmtCurrency(totals.expense)} tone="expense" />
        <Metric label="Net" value={fmtCurrency(totals.net)} tone="net" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Category breakdown">
          <CategoryChart data={catData} />
        </Card>

        <div className="lg:col-span-2">
          <Card title="Inflow vs Expenses (12 mo)">
            <InflowIncomeChart data={inflowData} />
          </Card>
        </div>
      </div>
    </div>
  );
}
