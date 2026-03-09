import { motion } from 'framer-motion';
import { Landmark, Briefcase, Building2, TrendingUp, AlertTriangle } from 'lucide-react';

export const AssetsView = () => {
    const assets = [
        { id: 1, name: 'US Treasury Bills (Ondas)', type: 'Fixed Income', value: '$850,230', change: '+0.12%', weight: '45%', status: 'Stable', icon: Landmark },
        { id: 2, name: 'Private Credit Fund A', type: 'Private Credit', value: '$210,400', change: '+2.45%', weight: '18%', status: 'Active', icon: Briefcase },
        { id: 3, name: 'Commercial Real Estate (Berlin)', type: 'Real Estate', value: '$120,500', change: '-1.20%', weight: '12%', status: 'Risk Alert', icon: Building2 },
        { id: 4, name: 'Corporate Bonds Index', type: 'Bonds', value: '$67,262', change: '+0.05%', weight: '25%', status: 'Stable', icon: TrendingUp },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="view-container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Asset Inventory</h2>
            
            <div className="card-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <tr>
                            <th style={{ padding: '1.25rem' }}>Asset Name</th>
                            <th>Type</th>
                            <th>Current Value</th>
                            <th>Allocation</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <tr key={asset.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                        <asset.icon size={20} color="var(--accent-blue)" />
                                    </div>
                                    <span style={{ fontWeight: 500 }}>{asset.name}</span>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{asset.type}</td>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{asset.value}</div>
                                    <div style={{ fontSize: '0.75rem', color: asset.change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                        {asset.change}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginTop: '4px' }}>
                                        <div style={{ width: asset.weight, height: '100%', background: 'var(--accent-blue)', borderRadius: '3px' }}></div>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{asset.weight}</div>
                                </td>
                                <td>
                                    <div style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '0.4rem', 
                                        padding: '0.25rem 0.75rem', 
                                        borderRadius: '999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: asset.status === 'Risk Alert' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                        color: asset.status === 'Risk Alert' ? 'var(--accent-red)' : 'var(--accent-green)'
                                    }}>
                                        {asset.status === 'Risk Alert' && <AlertTriangle size={12} />}
                                        {asset.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
