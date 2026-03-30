import { motion, AnimatePresence } from 'framer-motion';

const ROLE_OVERLAYS = {
  'male-manager': {
    color: '#00D4FF',
    gradient: 'radial-gradient(ellipse at 30% 40%, rgba(0, 212, 255, 0.08) 0%, transparent 60%)',
    borderColor: 'rgba(0, 212, 255, 0.15)',
  },
  'female-employee': {
    color: '#FF6B9D',
    gradient: 'radial-gradient(ellipse at 70% 40%, rgba(255, 107, 157, 0.08) 0%, transparent 60%)',
    borderColor: 'rgba(255, 107, 157, 0.15)',
  },
  'intern': {
    color: '#C5A3FF',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(197, 163, 255, 0.08) 0%, transparent 60%)',
    borderColor: 'rgba(197, 163, 255, 0.15)',
  },
};

export default function IdentityOverlay({ roleId, children, className = '', showBorder = true }) {
  const cfg = ROLE_OVERLAYS[roleId] || ROLE_OVERLAYS['male-manager'];

  return (
    <div className={`relative ${className}`}>
      {/* Ambient gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{ background: cfg.gradient, zIndex: 0 }}
      />

      {/* Border accent */}
      {showBorder && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{ border: `1px solid ${cfg.borderColor}`, zIndex: 1 }}
        />
      )}

      {/* Top edge glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: cfg.color, opacity: 0.4, boxShadow: `0 0 8px ${cfg.color}` }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
