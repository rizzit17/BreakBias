import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, Mic, MicOff, MessageSquare, Clock } from 'lucide-react';
import GlitchEffect from '../../components/effects/GlitchEffect';
import Badge from '../../components/ui/Badge';

const PARTICIPANTS = {
  'male-manager': [
    { name: 'Alex Chen', role: 'You', color: '#00D4FF', speaking: false, isYou: true },
    { name: 'Mark', role: 'Director', color: '#C5A3FF', speaking: true },
    { name: 'David', role: 'PM', color: '#9B59B6' },
    { name: 'Emily', role: 'Designer', color: '#FF6B9D' },
  ],
  'female-employee': [
    { name: 'Sarah Chen', role: 'You', color: '#FF6B9D', isYou: true },
    { name: 'Mark', role: 'Director', color: '#C5A3FF', speaking: true },
    { name: 'David', role: 'PM', color: '#9B59B6' },
    { name: 'Emily', role: 'Designer', color: '#00D4FF' },
  ],
  'intern': [
    { name: 'Jamie', role: 'You', color: '#C5A3FF', isYou: true },
    { name: 'Mark', role: 'Director', color: '#9B59B6', speaking: true },
    { name: 'David', role: 'PM', color: '#00D4FF' },
    { name: 'Emily', role: 'Designer', color: '#FF6B9D' },
  ],
};

export default function MeetingUI({ outcome, roleId, biasActive = false }) {
  const [isMuted, setIsMuted] = useState(false);
  const participants = PARTICIPANTS[roleId] || PARTICIPANTS['male-manager'];
  const biasLevel = outcome?.biasLevel || 0;

  return (
    <GlitchEffect active={biasActive && biasLevel > 60} intensity="medium">
      <div className="rounded-2xl overflow-hidden glass" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Meeting header */}
        <div className="bg-black/30 px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-display font-semibold text-white/70">LIVE — Q3 Strategy Meeting</span>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs font-display">
            <Clock size={10} />
            <span>42:18</span>
          </div>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-2 gap-2 p-3" style={{ background: '#0a0d16' }}>
          {participants.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-xl overflow-hidden aspect-video flex items-center justify-center"
              style={{
                background: p.isYou && biasActive && biasLevel > 50
                  ? 'rgba(255,77,109,0.05)'
                  : 'rgba(255,255,255,0.02)',
                border: p.speaking
                  ? `2px solid ${p.color}`
                  : p.isYou
                  ? `1px solid ${p.color}44`
                  : '1px solid rgba(255,255,255,0.04)',
                boxShadow: p.speaking ? `0 0 15px ${p.color}44` : 'none',
              }}
            >
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>
                {p.name[0]}
              </div>
              <span className="absolute bottom-1.5 left-2 text-[10px] text-white/60 font-display">
                {p.isYou ? 'You' : p.name}
              </span>
              {p.speaking && (
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: p.color }}
                />
              )}

              {/* Bias visual - blur out your avatar if being ignored */}
              {p.isYou && biasActive && biasLevel > 70 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl backdrop-blur-sm"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Meeting outcome */}
        {outcome && (
          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex items-start gap-2">
              <MessageSquare size={12} className="text-white/30 mt-0.5 flex-shrink-0" />
              <div>
                {outcome.quote && (
                  <p className="text-xs text-white/60 italic mb-1">"{outcome.quote}"</p>
                )}
                {outcome.speakerName && (
                  <p className="text-[10px] text-white/30 font-display">— {outcome.speakerName}</p>
                )}
              </div>
            </div>
            {outcome.interruptions > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="danger" dot>Interrupted {outcome.interruptions}×</Badge>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="bg-black/30 px-4 py-2.5 flex items-center justify-center gap-4 border-t border-white/5">
          <button onClick={() => setIsMuted(m => !m)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: isMuted ? 'rgba(255,77,109,0.2)' : 'rgba(255,255,255,0.06)' }}>
            {isMuted ? <MicOff size={14} className="text-accent" /> : <Mic size={14} className="text-white/60" />}
          </button>
          <button className="px-4 py-1.5 rounded-lg text-xs font-display font-semibold"
            style={{ background: 'rgba(255,77,109,0.15)', color: '#FF4D6D', border: '1px solid rgba(255,77,109,0.2)' }}>
            Leave
          </button>
        </div>
      </div>
    </GlitchEffect>
  );
}
