import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartData {
  date: string;
  scrape: number;
  crawl: number;
  map: number;
  extract: number;
}

export function CreditUsageChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(val: string) => val.slice(5)}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area type="monotone" dataKey="scrape" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        <Area type="monotone" dataKey="crawl" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
        <Area type="monotone" dataKey="map" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
        <Area type="monotone" dataKey="extract" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
