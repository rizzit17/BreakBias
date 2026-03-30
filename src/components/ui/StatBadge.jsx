import { motion } from 'framer-motion';

export default function StatBadge({ value, label, icon, color = '#C5A3FF', pulse = false }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${pulse ? 'animate-pulse' : ''}`}
      style={{
        background: '#151928',
        border: `2px solid ${color}40`,
        boxShadow: `0 4px 0 rgba(0,0,0,0.5)`,
      }}
    >
      {icon && <span style={{ color }}>{icon}</span>}
      <span className="text-sm font-display font-black text-white">{value}</span>
      {label && <span className="text-[10px] font-display font-medium uppercase tracking-widest text-white/50">{label}</span>}
    </motion.div>
  );
}
