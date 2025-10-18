export default function HeaderBar({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-b from-white/90 to-white/60 supports-[backdrop-filter]:backdrop-blur">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
