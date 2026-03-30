import { motion } from 'framer-motion';

export default function ProgressBar({ value, max = 100, label, color = '#C5A3FF', icon, className = '' }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || icon) && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon && <span style={{ color }}>{icon}</span>}
            {label && <span className="text-xs font-display font-medium text-white/70 uppercase tracking-widest">{label}</span>}
          </div>
          <span className="text-sm font-display font-black" style={{ color }}>{value}/{max}</span>
        </div>
      )}
      
      {/* Track */}
      <div 
        className="h-6 w-full rounded-lg relative overflow-hidden"
        style={{ 
          background: '#0B0F1A',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.6)'
        }}
      >
        {/* Tick marks for Roblox/Game feel */}
        <div 
          className="absolute inset-0 z-10 opacity-20 pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.5) 18px, rgba(255,255,255,0.5) 20px)'
          }}
        />

        {/* Animated fill */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="h-full relative overflow-hidden"
          style={{ 
            background: color,
            boxShadow: `0 0 15px ${color}`
          }}
        >
          {/* Top highlight for 3D bar feel */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'rgba(255,255,255,0.4)' }} />
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: 'rgba(0,0,0,0.2)' }} />
          
          {/* Glint animation */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            className="absolute top-0 bottom-0 w-8"
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              skewX: '-20deg'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
