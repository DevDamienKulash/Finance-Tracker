type Item = { label: string; onClick: () => void; active?: boolean };

export default function Sidebar({ items, footer }: { items: Item[]; footer?: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b bg-brand-100/40">
        <div className="font-semibold">Menu</div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => (
          <button
            key={it.label}
            onClick={it.onClick}
            className={`w-full text-left px-3 py-2 rounded-lg transition relative
              ${it.active
                ? "bg-brand-100/80 font-medium after:absolute after:left-0 after:top-1.5 after:bottom-1.5 after:w-1 after:bg-brand-500 after:rounded-full"
                : "hover:bg-brand-100/50"}`}
          >
            {it.label}
          </button>
        ))}
      </nav>

      {footer && <div className="p-4 border-t text-sm text-gray-600">{footer}</div>}
    </div>
  );
}
