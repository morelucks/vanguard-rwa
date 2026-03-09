import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GuardianControls } from './components/dashboard/GuardianControls';
import { StatGrid } from './components/dashboard/StatGrid';
import { MainChart } from './components/dashboard/MainChart';
import { ActivityFeed } from './components/dashboard/ActivityFeed';
import { useVanguardData } from './hooks/useVanguard';
import { ShieldCheck } from 'lucide-react';

const App = () => {
  const { data, history, activities, isLive, forceStatus, setActivities } = useVanguardData();
  const [isHuman, setIsHuman] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setActivities(prev => [{
            id: Date.now().toString(),
            type: 'success',
            title: 'Wallet Linked',
            desc: `Session authorized for ${accounts[0].slice(0, 8)}`,
            time: 'Now',
            icon: ShieldCheck
          }, ...prev]);
      } catch (err) {
        console.error("User rejected connection");
      }
    } else {
      alert("Please install MetaMask to link your institutional wallet.");
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

  const getStatusColor = () => {
    if (!data) return '#94a3b8';
    if (data.marketStatus === 'stable') return '#10b981';
    if (data.marketStatus === 'volatile') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar walletAddress={walletAddress} />

      <main className="main-content">
        <Header isLive={isLive} walletAddress={walletAddress} onConnect={handleConnect} />

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
      </main>
    </div>
  );
};

export default App;
