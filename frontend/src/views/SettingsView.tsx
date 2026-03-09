import { motion } from 'framer-motion';
import { Shield, Zap, Eye, EyeOff } from 'lucide-react';

export const SettingsView = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="view-container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Fund Parameters</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                <div className="card-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <Shield size={22} color="var(--accent-blue)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Risk Thresholds</h3>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <SettingToggle label="Black Swan Auto-Liquidate" active={true} desc="Auto-trigger exit strategy on 20% volatility spikes." />
                        <SettingToggle label="World ID Enforcement" active={true} desc="Require human verification for all rebalances." />
                        <SettingToggle label="Oracle Discrepancy Margin" active={false} desc="Alert on 5% variance between off-chain and on-chain feeds." />
                    </div>
                </div>

                <div className="card-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <Zap size={22} color="#f59e0b" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Execution Engine</h3>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <SettingToggle label="Low Latency Mode" active={true} desc="Priority execution on high-volatility events." />
                        <SettingToggle label="Confidential HTTP Logs" active={false} desc="Store encrypted node logs in secure AWS S3 cluster." />
                        <SettingToggle label="Multi-Sig Governance" active={true} desc="Require 3/5 guardian approvals for contract updates." />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SettingToggle = ({ label, active, desc }: { label: string, active: boolean, desc: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
            <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{label}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '240px' }}>{desc}</p>
        </div>
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {active ? <Eye size={18} color="var(--accent-green)" /> : <EyeOff size={18} color="var(--text-secondary)" />}
            <div style={{ width: '40px', height: '22px', background: active ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)', borderRadius: '11px', padding: '2px', transition: 'all 0.2s', display: 'flex', justifyContent: active ? 'flex-end' : 'flex-start' }}>
                <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%' }}></div>
            </div>
        </div>
    </div>
);
