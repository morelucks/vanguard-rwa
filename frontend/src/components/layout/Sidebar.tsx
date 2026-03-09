import { 
  Shield, 
  TrendingUp, 
  LayoutDashboard, 
  Wallet, 
  Settings,
  Server
} from 'lucide-react';

interface SidebarProps {
  walletAddress: string | null;
}

export const Sidebar = ({ walletAddress }: SidebarProps) => (
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
        <Server size={20} />
        Guardians
      </a>
      <a href="#" className="nav-link">
        <Wallet size={20} />
        Wallet
      </a>
      <a href="#" className="nav-link">
        <Settings size={20} />
        Settings
      </a>
    </div>

    <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Operator Session</p>
      <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{walletAddress ? `${walletAddress.slice(0, 10)}...` : '0xDisconnected'}</p>
    </div>
  </nav>
);
