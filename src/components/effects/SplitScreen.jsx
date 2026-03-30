import { motion } from 'framer-motion';

export default function SplitScreen({ leftContent, rightContent, leftLabel, rightLabel, leftColor, rightColor, className = '' }) {
  return (
    <div className={`relative flex h-full ${className}`}>
      {/* Left panel */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col overflow-hidden relative"
        style={{ borderRight: `1px solid ${leftColor || '#00D4FF'}22` }}
      >
        {leftLabel && (
          <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: leftColor || '#00D4FF', borderBottom: `1px solid ${leftColor || '#00D4FF'}22` }}>
            {leftLabel}
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {leftContent}
        </div>
        {/* Identity color bar at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: leftColor || '#00D4FF', boxShadow: `0 0 10px ${leftColor || '#00D4FF'}88` }} />
      </motion.div>

      {/* Divider */}
      <div className="split-divider flex-shrink-0 relative" style={{ width: 2 }}>
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent, ${leftColor || '#00D4FF'}, ${rightColor || '#FF4D6D'}, transparent)` }} />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ background: 'white', boxShadow: '0 0 15px rgba(197,163,255,0.9), 0 0 30px rgba(197,163,255,0.5)' }} />
      </div>

      {/* Right panel */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col overflow-hidden relative"
      >
        {rightLabel && (
          <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: rightColor || '#FF4D6D', borderBottom: `1px solid ${rightColor || '#FF4D6D'}22` }}>
            {rightLabel}
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {rightContent}
        </div>
        {/* Identity color bar at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: rightColor || '#FF4D6D', boxShadow: `0 0 10px ${rightColor || '#FF4D6D'}88` }} />
      </motion.div>
    </div>
  );
}
