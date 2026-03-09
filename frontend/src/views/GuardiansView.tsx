import { motion } from 'framer-motion';
import { Server, ShieldCheck, Activity, Globe } from 'lucide-react';

export const GuardiansView = () => {
    const nodes = [
        { id: 'sentinel-01', region: 'Frankfurt (AWS)', performance: '99.9%', latency: '4ms', status: 'Online', icon: ShieldCheck },
        { id: 'sentinel-02', region: 'New York (GCP)', performance: '98.5%', latency: '12ms', status: 'Active', icon: Activity },
        { id: 'sentinel-03', region: 'Singapore (Azure)', performance: '99.9%', latency: '5ms', status: 'Online', icon: Globe },
        { id: 'sentinel-04', region: 'London (On-Premise)', performance: '97.2%', latency: '24ms', status: 'Active', icon: Server },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="view-container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Active CRE Sentinels</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {nodes.map((node) => (
                    <div key={node.id} className="stat-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
                            <node.icon size={28} color="var(--accent-blue)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                <span style={{ fontWeight: 700 }}>{node.id}</span>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></div>
                                    {node.status}
                                </div>
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{node.region}</div>
                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Performance</p>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{node.performance}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Latency</p>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{node.latency}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
