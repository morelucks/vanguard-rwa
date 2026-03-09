import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { GuardianControls } from '../components/dashboard/GuardianControls';
import { StatGrid } from '../components/dashboard/StatGrid';
import { MainChart } from '../components/dashboard/MainChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { useVanguardData } from '../hooks/useVanguard';
import { ShieldCheck } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

const Dashboard = () => {
  const { data, history, activities, isLive, forceStatus, setActivities } = useVanguardData();
  const [isHuman, setIsHuman] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  
  // Reown/Wagmi Hooks
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  useEffect(() => {
    if (isConnected && address) {
        setActivities(prev => {
            if (prev.some(a => a.desc.includes(address.slice(0, 8)))) return prev;
            return [{
                id: Date.now().toString(),
                type: 'success',
                title: 'Wallet Multi-linked',
                desc: `Reown session authorized: ${address.slice(0, 8)}`,
                time: 'Now',
                icon: ShieldCheck
              }, ...prev];
        });
    }
  }, [isConnected, address, setActivities]);

  const handleConnect = async () => {
    await open();
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

  const getStatusColor = () => {
    if (!data) return '#94a3b8';
    if (data.marketStatus === 'stable') return '#10b981';
    if (data.marketStatus === 'volatile') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar walletAddress={address || null} activeView={activeView} setActiveView={setActiveView} />

      <main className="main-content">
        <Header isLive={isLive} walletAddress={address || null} onConnect={handleConnect} />

        {activeView === 'dashboard' ? (
          <>
            <GuardianControls onForce={forceStatus} />

            <StatGrid 
              data={data} 
              isHuman={isHuman} 
              verifying={verifying} 
              onVerify={handleVerify} 
              getStatusColor={getStatusColor} 
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <MainChart history={history} getStatusColor={getStatusColor} />
            </motion.div>

            <ActivityFeed activities={activities} />
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-panel" 
            style={{ textAlign: 'center', padding: '6rem 2rem', borderStyle: 'dashed' }}
          >
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '25px', display: 'inline-block', marginBottom: '1.5rem' }}>
              <ShieldCheck size={48} color="var(--accent-blue)" style={{ opacity: 0.4 }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{activeView.charAt(0).toUpperCase() + activeView.slice(1)} Module</h2>
            <p style={{ color: 'var(--text-secondary)' }}>This institutional feature is currently under final CRE maintenance.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
