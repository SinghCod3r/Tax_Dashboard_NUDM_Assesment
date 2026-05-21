import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { aggregateByCity, formatINR } from '../utils/calculations';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="chart-tooltip-value" style={{ color: entry.color }}>
          {entry.name}: {entry.dataKey === 'totalCollection' ? formatINR(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
};

function ComparisonChart({ data }) {
  const chartData = useMemo(() => aggregateByCity(data), [data]);

  return (
    <section className="chart-container" id="comparison-chart">
      <h2 className="section-title">📊 City-wise Collection Comparison</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <defs>
              <linearGradient id="collectionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#667eea" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#764ba2" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="approvedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="rejectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="city"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(102, 126, 234, 0.06)' }} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ paddingBottom: '10px' }}
              iconType="circle"
            />
            <Bar
              dataKey="totalCollection"
              name="Total Collection (₹)"
              fill="url(#collectionGradient)"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ComparisonChart;
