import { useState, useEffect } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  RefreshCcw, 
  Server, 
  LayoutDashboard, 
  Wallet, 
  Settings,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketData {
  price: number;
  timestamp: number;
  marketStatus: 'stable' | 'volatile' | 'black_swan';
  source: string;
}

interface ActivityItem {
  id: string;
  type: 'neutral' | 'risk' | 'success';
  title: string;
  desc: string;
  time: string;
  icon: any;
}

const App = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', type: 'success', title: 'System Initialized', desc: 'Vanguard Node V1.0.0 Online', time: '10m ago', icon: Server },
    { id: '2', type: 'neutral', title: 'Collateral Audit', desc: 'RWA Asset #1024 Verified', time: '1h ago', icon: ShieldCheck },
  ]);
  const [isLive, setIsLive] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // ... rest of the code stays same ...
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080');
        const json = await res.json();
        setData(json);
        setIsLive(true);
        
        setHistory(prev => {
          const updated = [...prev, { time: new Date(json.timestamp).toLocaleTimeString(), price: json.price }];
          return updated.slice(-20); // Keep last 20 points
        });

        // Add to activity if market status changes to risk
        if (json.marketStatus !== 'stable') {
          setActivities(prev => {
            if (prev[0]?.desc.includes(json.marketStatus)) return prev;
            return [{
              id: Date.now().toString(),
              type: json.marketStatus === 'black_swan' ? 'risk' : 'neutral',
              title: 'Risk Alert Triggered',
              desc: `Market identified as ${json.marketStatus.toUpperCase()}`,
              time: 'Now',
              icon: AlertTriangle
            }, ...prev].slice(0, 10);
          });
        }
      } catch (err) {
        setIsLive(false);
        console.error("API Offline");
      }
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!data) return '#94a3b8';
    if (data.marketStatus === 'stable') return '#10b981';
    if (data.marketStatus === 'volatile') return '#f59e0b';
    return '#ef4444';
  };

  const forceStatus = async (status: string) => {
    try {
      await fetch(`http://localhost:8080/?status=${status}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setIsHuman(true);
      setVerifying(false);
      setActivities(prev => [{
        id: Date.now().toString(),
        type: 'success',
        title: 'World ID Verified',
        desc: 'Human-in-the-Loop Governance Active',
        time: 'Now',
        icon: ShieldCheck
      }, ...prev]);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo-container">
          <Shield color="#6366f1" size={32} />
          <h1>VANGUARD</h1>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-link active">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" className="nav-link">
            <TrendingUp size={20} />
            Assets
          </a>
          <a href="#" className="nav-link">
            <Shield size={20} />
            Guardians
          </a>
          <a href="#" className="nav-link">
            <Wallet size={20} />
            Wallet
          </a>
          <a href="#" className="nav-link shadow">
            <Settings size={20} />
            Settings
          </a>
        </div>

        <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Operator</p>
          <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>0x82...f9e1</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Portfolio Overview</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Vanguard Guardian Agent.</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="status-badge">
              <div className="status-dot" style={{ backgroundColor: isLive ? '#10b981' : '#ef4444' }}></div>
              Node: {isLive ? 'Online' : 'Offline'}
            </div>
            <button className="btn-primary">Connect Wallet</button>
          </div>
        </header>

        {/* Action Controls for Demo */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', background: 'rgba(99, 102, 241, 0.05)', padding: '1.25rem', borderRadius: '16px', border: '1px dashed rgba(99, 102, 241, 0.2)' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>Guardian Simulation Controls</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Trigger market events to test institutional guardian response.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={() => forceStatus('stable')}>Stable</button>
            <button className="btn-secondary" style={{ borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)' }} onClick={() => forceStatus('volatile')}>Volatile</button>
            <button className="btn-secondary" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }} onClick={() => forceStatus('black_swan')}>Black Swan</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
            <div className="stat-label">Vanguard Fund NAV</div>
            <div className="stat-value">$1,248,392 <span style={{ fontSize: '0.9rem', color: '#10b981' }}>+2.4%</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
            <div className="stat-label">Guardian Status</div>
            <div className="stat-value" style={{ color: getStatusColor(), display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {data?.marketStatus === 'black_swan' ? <AlertTriangle size={24} /> : <Shield size={24} />}
              {data?.marketStatus.toUpperCase() || 'INITIALIZING...'}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
            <div className="stat-label">Governance Mode</div>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem' }}>
              {isHuman ? (
                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                   <ShieldCheck size={20} /> Human Verified
                </span>
              ) : (
                <button 
                  onClick={handleVerify} 
                  disabled={verifying}
                  className="btn-secondary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
                >
                  {verifying ? 'Verifying...' : 'Verify World ID'}
                </button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="stat-card">
            <div className="stat-label">Active CRE Nodes</div>
            <div className="stat-value">31 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Verified</span></div>
          </motion.div>
        </div>

        {/* Chart */}
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

        <div className="feed-section">
          <div className="card-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Guardian Activity Log</h3>
              <button className="btn-secondary" style={{ fontSize: '0.8rem' }}>View All</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence>
              {activities.map((item, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  key={item.id} 
                  className="activity-item"
                >
                  <div className="activity-icon" style={{ color: item.type === 'risk' ? 'var(--accent-red)' : item.type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)' }}>
                    <item.icon size={20} />
                  </div>
                  <div className="activity-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</div>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="card-panel" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(13, 15, 20, 0.4) 100%)' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Smart Rebalancing</h3>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
               Vanguard Guardians are configured to swap your RWA tokens to Tokenized T-Bills during extreme volatility.
             </p>
             <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem' }}>Yield Shield</span>
                  <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Active</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: '#10b981' }}></div>
                </div>
             </div>
             <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Update Strategy <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
