# Personal Finance Tracker

A minimalist, responsive finance tracker that lets you record income and expenses, filter by month/type/category, visualize spending, and see a running **Total as of today** from a user-set **Starting balance**.

## Features

- **Transactions:** Add / edit (modal) / delete with confirm
- **Validation:** Zod-powered, inline error messages
- **Filters with persistence:** month, type, category, search (saved to localStorage)
- **Charts:** Category breakdown + 12-month inflow vs. expenses (Recharts)
- **Monthly KPIs:** Income / Expenses / Net
- **Starting balance:** User-entered; total auto-updates based on dated transactions
- **Local-first:** No backend; everything persisted to `localStorage`
- **Responsive UI:** Tailwind + a small token layer (buttons/cards/badges)

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (PostCSS)
- **Validation:** Zod
- **Charts:** Recharts
- **State:** React Context + Reducer + typed selectors
- **Persistence:** `localStorage`

## Screenshots

> Add project screenshots here (Dashboard + Transactions + Edit modal).
> Example filenames:
>
> - `docs/screenshot-dashboard.png`
> - `docs/screenshot-transactions.png`

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (or pnpm/yarn)

### Install

```bash
npm install

Development
npm run dev

Type-check
npm run typecheck

Production build
npm run build
npm run preview
```

Project Structure
src/
app/
store.ts(x) # Context + reducer, persistence effect
storage.ts # localStorage helpers + zod schema
settings.ts # Starting balance persistence
components/
AppShell.tsx # Layout shell (sidebar + header)
Sidebar.tsx
HeaderBar.tsx
MonthPicker.tsx
Modal.tsx
EditTransactionModal.tsx
AccountTotal.tsx
CategoryChart.tsx
InflowIncomeChart.tsx
TransactionsFilters.tsx
lib/
filters.ts # TxFilters type, load/save/apply
selectors.ts # Totals, category sums, 12-month series
validation.ts # zod schema for tx input
balance.ts # starting balance + delta as of date
format.ts # currency formatting
pages/
Dashboard.tsx
Transactions.tsx
types.ts # Transaction, TxType, etc.
index.css # Tailwind + small token layer
main.tsx # App bootstrap
App.tsx # Tabs + shell wiring

Data Model
// types.ts
export type TxType = 'income' | 'expense';

export type Transaction = {
id: string;
date: string; // 'YYYY-MM-DD'
amount: number; // positive
type: TxType;
category: string;
note?: string;
createdAt: string;
updatedAt: string;
};

Notable Implementation Details

Local-first store: The reducer writes to localStorage on change; reads on init.

Selectors: Centralized computations for monthly aggregates and chart series.

Filters: TxFilters persisted separately to keep UI state across sessions.

Validation: zod schema shared by Add and Edit flows.

Modal: Lightweight modal with Escape-to-close and click-outside support.

A11y: Labels, focus rings, and keyboard support on inputs and actions.

Roadmap / Nice-to-haves

CSV import/export

“As of date” switcher for the account total

Currency settings

Unit tests (selectors + reducer)

PWA (offline + installable shell)

Google Sheets sync (optional bonus)

Development Notes

If Tailwind utilities fail to compile after config changes, clear Vite cache:

# Windows PowerShell

Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
npm run dev

This project uses Tailwind via @tailwindcss/postcss in vite.config.ts and postcss.config.js.
