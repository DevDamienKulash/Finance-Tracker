import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function InflowIncomeChart({ data }: { data: { month: string; income: number; expenses: number }[] }) {
  if (!data.length) return null;
  return (
    <div className="h-64">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ left: 8, right: 8 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
          <XAxis dataKey="month" tickFormatter={(m) => m.slice(5)} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" stackId="a" radius={[4,4,0,0]} />
          <Bar dataKey="expenses" stackId="a" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
