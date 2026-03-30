import { motion } from 'framer-motion';
import { useBiasEngine } from '../../hooks/useBiasEngine';
import { Eye, EyeOff, Zap, TrendingDown } from 'lucide-react';

export default function BiasIndicator({ className = '' }) {
  const { emotionalScore, visibilityScore, interruptionCount, biasHistory, getBiasNarrative, totalBiasEvents } = useBiasEngine();
  const narrative = getBiasNarrative();

  const metrics = [
    { label: 'Confidence', value: emotionalScore, color: '#00D4FF', icon: <TrendingDown size={10} /> },
    { label: 'Visibility', value: visibilityScore, color: '#C5A3FF', icon: <Eye size={10} /> },
    { label: 'Interruptions', value: Math.max(0, 100 - interruptionCount * 25), color: '#FF6B9D', icon: <Zap size={10} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass rounded-2xl p-4 ${className}`}
      style={{ border: '1px solid rgba(255,255,255,0.06)', minWidth: 200 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-white/40">
          Bias Meter
        </span>
        <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${narrative.color}20`, color: narrative.color, border: `1px solid ${narrative.color}40` }}>
          {narrative.label}
        </span>
      </div>

      <div className="space-y-2.5">
        {metrics.map(m => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1" style={{ color: m.color }}>
                {m.icon}
                <span className="text-[10px] font-display" style={{ color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
              </div>
              <span className="text-[10px] font-display font-semibold" style={{ color: m.color }}>{m.value}%</span>
            </div>
            <div className="h-1 rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      {totalBiasEvents > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="text-[10px] text-white/30 font-display">
            {totalBiasEvents} bias event{totalBiasEvents !== 1 ? 's' : ''} recorded
          </div>
        </div>
      )}
    </motion.div>
  );
}
