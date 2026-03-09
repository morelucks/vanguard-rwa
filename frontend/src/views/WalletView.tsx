import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, History } from 'lucide-react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

export const WalletView = () => {
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });

    const recentTx = [
        { id: 1, type: 'Inflow', asset: 'USDC', amount: '+50,000.00', date: '2026-03-08', status: 'Confirmed' },
        { id: 2, type: 'Outflow', asset: 'ETH', amount: '-1.450', date: '2026-03-07', status: 'Confirmed' },
        { id: 3, type: 'Allocation', asset: 'RWA-Ondas', amount: '+2,100', date: '2026-03-06', status: 'Pending' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="view-container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Fund Treasury</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--accent-blue) 0%, #4338ca 100%)', color: '#fff', border: 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <Wallet size={24} />
                            <ShieldCheck size={24} style={{ opacity: 0.6 }} />
                        </div>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Liquidity</p>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                            {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}` : '0.00 ETH'}
                        </h1>
                        <p style={{ marginTop: '2rem', opacity: 0.8, fontSize: '0.8rem', letterSpacing: '0.05em' }}>{address ? `${address.slice(0, 16)}...${address.slice(-6)}` : '0xNotConnected'}</p>
                    </div>
                </div>

                <div className="card-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <History size={20} color="var(--text-secondary)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Treasury Activity</h3>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentTx.map((tx) => (
                            <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, background: tx.type === 'Inflow' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {tx.type === 'Inflow' ? <ArrowDownLeft size={18} color="var(--accent-green)" /> : <ArrowUpRight size={18} color="var(--accent-red)" />}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tx.asset} {tx.type}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tx.date}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 700, fontSize: '1rem', color: tx.amount.startsWith('+') ? 'var(--accent-green)' : 'var(--text-primary)' }}>{tx.amount}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
