import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Users, ChevronRight, Zap, Target, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <div className="landing-container" style={{ width: '100%', overflowX: 'hidden', backgroundColor: '#05070a' }}>
            {/* Nav */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 4rem', alignItems: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 1000, background: 'rgba(5,7,10,0.7)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Shield color="#6366f1" size={28} />
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '1px' }}>VANGUARD</span>
                </div>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Features</a>
                    <a href="#tech" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Technology</a>
                    <Link to="/dashboard" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Launch App</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', background: 'radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '999px', color: '#818cf8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem', letterSpacing: '0.05em' }}>
                        BUILT ON CHAINLINK RUNTIME ENVIRONMENT (CRE)
                    </div>
                    <h1 style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(to bottom, #fff 40%, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', maxWidth: '900px' }}>
                        The Autonomous Guardian for Institutional RWAs.
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                        Privacy-preserving portfolio management for tokenized assets. Protect proprietary alpha with Confidential Compute and secure governance.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/dashboard" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            Get Started <ChevronRight size={20} />
                        </Link>
                        <button className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>Read Documentation</button>
                    </div>
                </motion.div>

                {/* Grid Effect */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: -1 }}></div>
            </section>

            {/* Stat Bar */}
            <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>$1.2B+</div>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Projected AUM Capacity</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>100%</div>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Confidential Execution</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>Sub-Second</div>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Risk Monitoring Latency</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>31+</div>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Active CRE Node Validators</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{ padding: '10rem 4rem', maxWidth: '1300px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>Institutional-Grade Infrastructure</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Engineered for the security and privacy needs of global financial funds.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    <FeatureCard 
                        icon={<Lock size={24} color="#6366f1" />}
                        title="Confidential Strategy"
                        desc="Execute proprietary rebalancing logic within the CRE without ever revealing your alpha on-chain."
                    />
                    <FeatureCard 
                        icon={<Users size={24} color="#10b981" />}
                        title="World ID Governance"
                        desc="Human-in-the-loop protection using privacy-preserving ZK identity verification for critical trades."
                    />
                    <FeatureCard 
                        icon={<Activity size={24} color="#f59e0b" />}
                        title="Automated Safeguards"
                        desc="Detect black-swan events via real-time market feeds and auto-trigger collateral liquidation."
                    />
                     <FeatureCard 
                        icon={<Globe size={24} color="#ef4444" />}
                        title="Global RWA Registry"
                        desc="Unified monitoring layer for tokenized real estate, private debt, and institutional credit."
                    />
                    <FeatureCard 
                        icon={<Zap size={24} color="#6366f1" />}
                        title="Sub-ms Execution"
                        desc="Instant cross-capability coordination between HTTP data feeds and EVM settlement."
                    />
                    <FeatureCard 
                        icon={<Target size={24} color="#10b981" />}
                        title="Dynamic Allocation"
                        desc="AI-driven weight adjustment based on confidential institutionalNAV signals."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '6rem 4rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                    <Shield color="#6366f1" size={24} />
                    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>VANGUARD</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>© 2026 Vanguard Institutional. Built for the Chainlink Constellation Hackathon.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <motion.div whileHover={{ y: -5 }} className="stat-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>{title}</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{desc}</p>
        </div>
    </motion.div>
);
