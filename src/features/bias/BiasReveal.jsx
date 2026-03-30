import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { useBiasEngine } from '../../hooks/useBiasEngine';

export default function BiasReveal({ scenario, className = '' }) {
  const [expanded, setExpanded] = useState(false);
  const { roleId, getOutcome, allRoles } = useBiasEngine();
  const myOutcome = getOutcome(scenario);

  // Find the male-manager outcome for comparison
  const referenceOutcome = scenario?.identityOutcomes?.['male-manager'];
  const isReference = roleId === 'male-manager';
  const biasLevel = myOutcome?.biasLevel || 0;

  if (!myOutcome || biasLevel === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{ border: '1px solid rgba(255,77,109,0.2)', background: 'rgba(255,77,109,0.04)' }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-accent" />
          <span className="text-sm font-display font-semibold text-accent">
            {myOutcome.biasLabel || 'Bias Detected'}
          </span>
          <span className="text-xs font-display px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,77,109,0.15)', color: '#FF4D6D' }}>
            {biasLevel}% severity
          </span>
        </div>
        {expanded ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 pb-4"
        >
          <div className="text-xs text-white/40 mb-3 font-display uppercase tracking-widest">
            What happened vs. what should have happened
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ background: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.2)' }}>
              <div className="text-[10px] text-accent font-display font-semibold uppercase tracking-widest mb-2">Your experience</div>
              <p className="text-xs text-white/60 leading-relaxed">{myOutcome.content || myOutcome.quote}</p>
            </div>
            {referenceOutcome && (
              <div className="rounded-xl p-3" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <div className="text-[10px] text-cyan font-display font-semibold uppercase tracking-widest mb-2">Alex's experience</div>
                <p className="text-xs text-white/60 leading-relaxed">{referenceOutcome.content || referenceOutcome.quote}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
