import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { RefreshCcw } from 'lucide-react';
import type { ChartDataPoint } from '../../types';

interface ChartProps {
  history: ChartDataPoint[];
  getStatusColor: () => string;
}

export const MainChart = ({ history, getStatusColor }: ChartProps) => (
  <div className="chart-section">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Real-Time Institutional Index</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RefreshCcw size={14} className="pulse" /> Live Feed
      </div>
    </div>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={history}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={getStatusColor()} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={getStatusColor()} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="time" hide />
        <YAxis domain={['auto', 'auto']} hide />
        <Tooltip 
          contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '0.8rem' }}
          itemStyle={{ color: '#fff' }}
        />
        <Area type="monotone" dataKey="price" stroke={getStatusColor()} strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
