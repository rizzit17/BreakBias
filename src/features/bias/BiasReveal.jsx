import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';
import StatBadge from '../../components/ui/StatBadge';

export default function BiasReveal({ scenario }) {
  if (!scenario.biasTypes || scenario.biasTypes.length === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 bg-card-dark border-4 border-accent shadow-game relative overflow-hidden"
    >
      {/* Hazard stripes background for gamey danger feel */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FF4D6D 10px, #FF4D6D 20px)' }}
      />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
        <div className="flex-shrink-0 w-16 h-16 bg-accent border-[3px] border-[#900021] rounded-xl flex items-center justify-center transform rotate-3 shadow-game">
          <AlertTriangle size={36} color="#0B0F1A" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-display font-black text-accent uppercase mb-2 text-game-shadow">
            SYSTEMIC BIAS DETECTED
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {scenario.biasTypes.map((bias, i) => (
              <StatBadge key={i} value={bias} color="#FF6B9D" />
            ))}
          </div>
          <div className="bg-black/40 p-3 border-l-4 border-accent text-sm font-medium text-white/80 leading-relaxed font-display">
            <Info size={14} className="inline mr-2 text-accent" />
            {scenario.biasMechanism}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
