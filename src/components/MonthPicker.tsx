export default function MonthPicker({ value, onChange }: { value: string; onChange: (v: string)=>void }) {
  return (
    <input
      type="month"
      className="w-full min-w-40 border rounded-lg px-3 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
