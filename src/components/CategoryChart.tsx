import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = ['#8ab87f', '#cfe1c8', '#9fc494', '#6ea060', '#587e4d', '#e0e7e9', '#b7d2ad', '#3f5c38', '#e8f1e6'];


export default function CategoryChart({ data }: { data: { name: string; value: number }[] }) {
if (!data.length) return <div className="text-sm text-gray-500">No expenses this month.</div>;
return (
<div className="h-64">
<ResponsiveContainer>
<PieChart>
<Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} stroke="#fff" strokeWidth={1}>
{data.map((_, i) => (
<Cell key={i} fill={COLORS[i % COLORS.length]} />
))}
</Pie>
<Tooltip />
<Legend verticalAlign="bottom" height={36} />
</PieChart>
</ResponsiveContainer>
</div>
);
}