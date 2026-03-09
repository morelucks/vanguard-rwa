interface HeaderProps {
    isLive: boolean;
    walletAddress: string | null;
    onConnect: () => void;
  }
  
  export const Header = ({ isLive, walletAddress, onConnect }: HeaderProps) => (
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
        <button className="btn-primary" onClick={onConnect}>
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>
    </header>
  );
