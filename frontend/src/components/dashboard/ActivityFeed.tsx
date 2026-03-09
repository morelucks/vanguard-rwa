import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { ActivityItem } from '../../types';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => (
  <div className="feed-section">
    <div className="card-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Guardian Activity Log</h3>
        <button className="btn-secondary" style={{ fontSize: '0.8rem' }}>View All</button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence>
          {activities.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, x: -15 }} 
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
);
