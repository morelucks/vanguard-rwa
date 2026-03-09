interface ControlsProps {
    onForce: (status: string) => void;
  }
  
  export const GuardianControls = ({ onForce }: ControlsProps) => (
    <div style={{ 
      marginBottom: '2rem', 
      display: 'flex', 
      gap: '1rem', 
      background: 'rgba(99, 102, 241, 0.05)', 
      padding: '1.5rem', 
      borderRadius: '20px', 
      border: '1px dashed rgba(99, 102, 241, 0.2)' 
    }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>Guardian Simulation Center</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Force market conditions to verify institutional guardian response logic.</p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn-secondary" onClick={() => onForce('stable')}>Stable</button>
        <button className="btn-secondary" style={{ borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)' }} onClick={() => onForce('volatile')}>Volatile</button>
        <button className="btn-secondary" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }} onClick={() => onForce('black_swan')}>Black Swan</button>
      </div>
    </div>
  );
