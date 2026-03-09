import { 
  Shield, 
  TrendingUp, 
  LayoutDashboard, 
  Wallet, 
  Settings,
  Server
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  walletAddress: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar = ({ walletAddress, activeView, setActiveView }: SidebarProps) => (
    <nav className="sidebar">
    <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
      <Shield color="#6366f1" size={32} />
      <h1>VANGUARD</h1>
    </Link>
    
    <div className="nav-links">
      <div onClick={() => setActiveView('dashboard')} className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
        <LayoutDashboard size={20} />
        Dashboard
      </div>
      <div onClick={() => setActiveView('assets')} className={`nav-link ${activeView === 'assets' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
        <TrendingUp size={20} />
        Assets
      </div>
      <div onClick={() => setActiveView('guardians')} className={`nav-link ${activeView === 'guardians' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
        <Server size={20} />
        Guardians
      </div>
      <div onClick={() => setActiveView('wallet')} className={`nav-link ${activeView === 'wallet' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
        <Wallet size={20} />
        Wallet
      </div>
      <div onClick={() => setActiveView('settings')} className={`nav-link ${activeView === 'settings' ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
        <Settings size={20} />
        Settings
      </div>
    </div>

    <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Operator Session</p>
      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{walletAddress ? `${walletAddress.slice(0, 10)}...` : '0xDisconnected'}</p>
    </div>
  </nav>
);
