import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export default function PageWrapper({ children, className = '', ambientOrbs = true }) {
  const { state } = useApp();
  const roleId = state.selectedRole?.id;

  const orbConfigs = {
    'male-manager': { c1: '#00D4FF', c2: '#C5A3FF', c3: '#0066CC' },
    'female-employee': { c1: '#FF6B9D', c2: '#C5A3FF', c3: '#FF4D6D' },
    'intern': { c1: '#C5A3FF', c2: '#9B59B6', c3: '#00D4FF' },
    default: { c1: '#C5A3FF', c2: '#00D4FF', c3: '#FF4D6D' },
  };
  const orbs = orbConfigs[roleId] || orbConfigs.default;

  return (
    <div className={`relative min-h-screen bg-dark overflow-hidden ${className}`}>
      {/* Ambient glow orbs */}
      {ambientOrbs && (
        <>
          <div className="orb orb-1 w-96 h-96 -top-32 -left-32"
            style={{ background: orbs.c1, position: 'absolute', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08, pointerEvents: 'none' }} />
          <div className="orb-2 w-80 h-80 top-1/3 -right-24"
            style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06, background: orbs.c2, pointerEvents: 'none' }} />
          <div className="orb-3 w-64 h-64 bottom-0 left-1/3"
            style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.07, background: orbs.c3, pointerEvents: 'none' }} />
        </>
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
