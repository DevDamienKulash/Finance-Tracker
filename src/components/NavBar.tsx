


type Tab = 'dashboard' | 'transactions';


export default function NavBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
return (
<nav className="w-full bg-white backdrop-blur border-b">
<div className="px-4 py-3 flex items-center justify-between">
<div className="font-bold">PFT</div>
<div className="flex gap-2">
<button onClick={() => onChange('dashboard')} className={`px-3 py-1 rounded-xl ${tab==='dashboard'?'bg-gray-900 text-white':'hover:bg-gray-100'}`}>Dashboard</button>
<button onClick={() => onChange('transactions')} className={`px-3 py-1 rounded-xl ${tab==='transactions'?'bg-gray-900 text-white':'hover:bg-gray-100'}`}>Transactions</button>
</div>
</div>
</nav>
);
}