import { useState, useEffect } from 'react';
import type { MarketData, ChartDataPoint, ActivityItem } from '../types';
import { AlertTriangle, ShieldCheck, Server } from 'lucide-react';

const API_ENDPOINT = 'http://localhost:8080';

export const useVanguardData = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [history, setHistory] = useState<ChartDataPoint[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', type: 'success', title: 'System Initialized', desc: 'Vanguard Node V1.0.0 Online', time: '10m ago', icon: Server },
    { id: '2', type: 'neutral', title: 'Collateral Audit', desc: 'RWA Asset #1024 Verified', time: '1h ago', icon: ShieldCheck },
  ]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        const json = await res.json();
        setData(json);
        setIsLive(true);
        
        setHistory(prev => {
          const updated = [...prev, { time: new Date(json.timestamp).toLocaleTimeString(), price: json.price }];
          return updated.slice(-20);
        });

        if (json.marketStatus !== 'stable') {
          setActivities(prev => {
            if (prev.some(activity => activity.desc.includes(json.marketStatus))) return prev;
            
            const riskType: 'risk' | 'neutral' = json.marketStatus === 'black_swan' ? 'risk' : 'neutral';
            
            const newActivity: ActivityItem = {
              id: Date.now().toString(),
              type: riskType,
              title: 'Risk Alert Triggered',
              desc: `Market identified as ${json.marketStatus.toUpperCase()}`,
              time: 'Now',
              icon: AlertTriangle
            };

            return [newActivity, ...prev].slice(0, 10);
          });
        }
      } catch (err) {
        setIsLive(false);
        console.error("Vanguard API Offline");
      }
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const forceStatus = async (status: string) => {
    try {
      await fetch(`${API_ENDPOINT}/?status=${status}`);
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  return {
    data,
    history,
    activities,
    isLive,
    forceStatus,
    setActivities
  };
};
