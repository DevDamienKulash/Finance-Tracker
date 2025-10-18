import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { nanoid } from 'nanoid';
import type { Transaction } from '../types';
import { storage } from './storage';


interface State { txs: Transaction[] }

type Action =
  | { type: 'load'; payload: Transaction[] }
  | { type: 'add'; payload: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'update'; payload: Transaction }
  | { type: 'remove'; payload: { id: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return { txs: action.payload };
    case 'add': {
      const now = new Date().toISOString();
      const next: Transaction = { id: nanoid(), createdAt: now, updatedAt: now, ...action.payload };
      return { txs: [next, ...state.txs] };
    }
    case 'update': {
      const tx = action.payload;
      return { txs: state.txs.map(t => (t.id === tx.id ? { ...tx, updatedAt: new Date().toISOString() } : t)) };
    }
    case 'remove':
      return { txs: state.txs.filter(t => t.id !== action.payload.id) };
    default:
      return state;
  }
}

const StoreCtx = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: { txs: [] }, dispatch: () => {} });

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { txs: [] });

  // Load once from LocalStorage
  useEffect(() => {
    dispatch({ type: 'load', payload: storage.load() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to LocalStorage on change
  useEffect(() => {
    storage.save(state.txs);
  }, [state.txs]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useTransactions() {
  return useContext(StoreCtx);
}
