import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import { AppShell } from './components/AppShell';
import type { TxType } from './types';
import { useTransactions } from './app/store';
import AccountTotal from './components/AccountTotal';

type Tab = 'dashboard' | 'transactions';

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [defaultType, setDefaultType] = useState<TxType>('expense');
  const { state } = useTransactions();

  const goQuickAdd = (type: TxType) => {
    setDefaultType(type);
    setTab('transactions');
  };

  return (
    <div className="min-h-screen w-screen grid place-items-center">
      <AppShell
        sidebar={
          <Sidebar
            items={[
              { label: 'Dashboard', onClick: () => setTab('dashboard'), active: tab === 'dashboard' },
              { label: 'Transactions', onClick: () => setTab('transactions'), active: tab === 'transactions' },
            ]}
            footer={<AccountTotal txs={state.txs} />}
          />
        }
        header={
          <HeaderBar
            title="Finance Tracker"
            right={
              <div className="flex gap-2">
                <button className="btn btn-danger" onClick={() => goQuickAdd('expense')}>+ Add expense</button>
                <button className="btn btn-primary" onClick={() => goQuickAdd('income')}>+ Add income</button>
              </div>
            }
          />
        }
      >
        {tab === 'dashboard' ? <Dashboard /> : <Transactions defaultType={defaultType} />}
      </AppShell>
    </div>
  );
}
