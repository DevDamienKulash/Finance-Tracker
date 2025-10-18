import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import type { Transaction } from '../types';
import { fmtCurrency } from '../lib/format';
import { balanceAsOf } from '../lib/balance';
import { settingsStore } from '../app/settings';

export default function AccountTotal({ txs }: { txs: Transaction[] }) {
  const [starting, setStarting] = useState<number>(() => settingsStore.load().startingBalance);

  // persist when starting changes
  useEffect(() => {
    settingsStore.save({ startingBalance: starting });
  }, [starting]);

  const today = new Date().toISOString().slice(0, 10);
  const total = useMemo(() => balanceAsOf(txs, starting, today), [txs, starting, today]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (Number.isFinite(val)) setStarting(val);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600">Starting balance</div>
      <input
        type="number"
        step="0.01"
        className="w-full rounded-lg border px-3 py-2"
        value={starting}
        onChange={onChange}
      />
      <div className="pt-2 border-t">
        <div className="text-sm text-gray-600">Total as of today</div>
        <div className="text-2xl font-semibold">{fmtCurrency(total)}</div>
      </div>
    </div>
  );
}
