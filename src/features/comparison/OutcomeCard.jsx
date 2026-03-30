import { motion } from 'framer-motion';
import Badge from '../../components/ui/Badge';
import { CheckCircle, XCircle, TrendingDown, TrendingUp } from 'lucide-react';

export default function OutcomeCard({ outcome, role, isReference = false }) {
  const biasLevel = outcome?.biasLevel || 0;
  const isBiased = biasLevel > 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 space-y-3"
      style={{
        background: isReference ? 'rgba(0,212,255,0.04)' : isBiased ? 'rgba(255,77,109,0.04)' : 'rgba(0,212,255,0.04)',
        border: `1px solid ${isReference ? 'rgba(0,212,255,0.12)' : isBiased ? 'rgba(255,77,109,0.12)' : 'rgba(0,212,255,0.12)'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: `${role?.color}22`, color: role?.color }}>
            {role?.name?.[0]}
          </div>
          <div>
            <div className="text-xs font-display font-semibold text-white">{role?.name}</div>
            <div className="text-[10px] text-white/30">{role?.pronoun}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isBiased
            ? <XCircle size={14} className="text-accent" />
            : <CheckCircle size={14} className="text-emerald-400" />
          }
          <span className="text-[10px] font-display font-semibold" style={{ color: isBiased ? '#FF4D6D' : '#34d399' }}>
            {isBiased ? 'Bias Detected' : 'Equitable'}
          </span>
        </div>
      </div>

      {/* Outcome text */}
      {(outcome.content || outcome.quote) && (
        <p className="text-xs text-white/60 leading-relaxed italic">
          "{outcome.content?.slice(0, 160) || outcome.quote}"
          {outcome.content?.length > 160 ? '...' : ''}
        </p>
      )}

      {/* Bias level bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-white/30 font-display">Bias Severity</span>
          <span className="text-[10px] font-display font-semibold" style={{ color: role?.color }}>{biasLevel}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${biasLevel}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: isBiased ? 'linear-gradient(90deg, #FF6B9D, #FF4D6D)' : 'linear-gradient(90deg, #00D4FF, #C5A3FF)' }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {outcome.biasLabel && <Badge variant="danger" dot>{outcome.biasLabel}</Badge>}
        {outcome.reaction && (
          <Badge variant={outcome.reaction === 'praised' || outcome.reaction === 'promoted' ? 'success' : 'ghost'}>
            {outcome.reaction}
          </Badge>
        )}
        {outcome.creditGiven === true && <Badge variant="success">Credit Given</Badge>}
        {outcome.creditGiven === false && biasLevel > 0 && <Badge variant="danger">Credit Denied</Badge>}
      </div>

      {/* Emotional score */}
      {outcome.emotionalScore !== undefined && (
        <div className="flex items-center gap-2">
          {outcome.emotionalScore > 60 ? <TrendingUp size={10} className="text-emerald-400" /> : <TrendingDown size={10} className="text-accent" />}
          <span className="text-[10px] text-white/30 font-display">
            Emotional impact: <span style={{ color: outcome.emotionalScore > 60 ? '#34d399' : '#FF4D6D' }}>{outcome.emotionalScore}%</span>
          </span>
        </div>
      )}
    </motion.div>
  );
}
