import type { LucideIcon } from 'lucide-react';

export type MarketStatus = 'stable' | 'volatile' | 'black_swan';

export interface MarketData {
  price: number;
  timestamp: number;
  marketStatus: MarketStatus;
  source: string;
}

export interface ActivityItem {
  id: string;
  type: 'neutral' | 'risk' | 'success';
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
}

export interface ChartDataPoint {
  time: string;
  price: number;
}
