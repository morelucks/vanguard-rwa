import { motion } from 'framer-motion';
import { Shield, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { MarketData } from '../../types';

interface StatGridProps {
  data: MarketData | null;
  isHuman: boolean;
  verifying: boolean;
  onVerify: () => void;
  getStatusColor: () => string;
}

export const StatGrid = ({ data, isHuman, verifying, onVerify, getStatusColor }: StatGridProps) => (
  <div className="stats-grid">
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
      <div className="stat-label">Vanguard Fund NAV</div>
      <div className="stat-value">$1,248,392 <span style={{ fontSize: '0.9rem', color: '#10b981' }}>+2.4%</span></div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
      <div className="stat-label">Guardian Status</div>
      <div className="stat-value" style={{ color: getStatusColor(), display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {data?.marketStatus === 'black_swan' ? <AlertTriangle size={24} /> : <Shield size={24} />}
        {data?.marketStatus?.toUpperCase() || 'INITIALIZING...'}
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
      <div className="stat-label">Governance Mode</div>
      <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem' }}>
        {isHuman ? (
          <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
             <ShieldCheck size={20} /> Human Verified
          </span>
        ) : (
          <button 
            onClick={onVerify} 
            disabled={verifying}
            className="btn-secondary" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
          >
            {verifying ? 'Verifying...' : 'Verify World ID'}
          </button>
        )}
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="stat-card">
      <div className="stat-label">Active CRE Nodes</div>
      <div className="stat-value">31 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Verified</span></div>
    </motion.div>
  </div>
);
