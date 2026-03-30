import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AvatarMorph from '../components/effects/AvatarMorph';
import GlitchEffect from '../components/effects/GlitchEffect';
import { useApp } from '../context/AppContext';
import { useBiasEngine } from '../hooks/useBiasEngine';
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

export default function Summary() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { selectedRole, biasHistory, emotionalScore, totalBiasEvents } = state;
  const { getBiasSeverity, getBiasNarrative, getEmotionalState, interruptionCount, visibilityScore } = useBiasEngine();

  if (!selectedRole) { navigate('/role-select'); return null; }

  const severity = getBiasSeverity();
  const narrative = getBiasNarrative();
  const emotional = getEmotionalState();
  const isFragmented = severity > 60;

  const metrics = [
    { label: 'Emotional Score', value: emotionalScore, max: 100, color: '#00D4FF', icon: <TrendingDown size={14} /> },
    { label: 'Visibility', value: visibilityScore, max: 100, color: '#C5A3FF', icon: <TrendingDown size={14} /> },
    { label: 'Bias Events', value: totalBiasEvents, max: 4, color: '#FF4D6D', icon: <AlertTriangle size={14} /> },
    { label: 'Interruptions', value: interruptionCount, max: 5, color: '#FF6B9D', icon: <AlertTriangle size={14} /> },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Mid-day fragmented header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <GlitchEffect active={isFragmented} intensity="low">
              <div className="mb-4 flex justify-center">
                <AvatarMorph roleId={selectedRole.id} size={72} isAnimating={isFragmented} />
              </div>
              <div className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
                style={{ color: selectedRole.color }}>
                Mid-Day Check-In
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-black text-white mb-3"
                style={{
                  textShadow: isFragmented
                    ? '-2px 0 rgba(255,77,109,0.4), 2px 0 rgba(0,212,255,0.4)'
                    : 'none',
                  letterSpacing: '-0.02em',
                }}>
                How is <span style={{ color: selectedRole.color }}>{selectedRole.name}</span> feeling?
              </h1>
            </GlitchEffect>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `${narrative.color}15`,
                border: `1px solid ${narrative.color}30`,
                color: narrative.color,
              }}
            >
              <span className="text-lg">{emotional.icon}</span>
              <span className="font-display font-semibold">{emotional.label}</span>
              <span className="text-xs opacity-60">— {narrative.label}</span>
            </motion.div>
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl p-5 glass"
                style={{
                  border: `1px solid ${m.color}22`,
                  background: isFragmented && m.color === '#FF4D6D' ? 'rgba(255,77,109,0.04)' : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-display text-white/40">{m.label}</span>
                  <span style={{ color: m.color }}>{m.icon}</span>
                </div>
                <div className="text-2xl font-display font-black mb-2" style={{ color: m.color }}>
                  {m.value}{m.label.includes('Score') || m.label === 'Visibility' ? '%' : ''}
                </div>
                <div className="h-1.5 rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((m.value / m.max) * 100, 100)}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: m.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bias history timeline */}
          {biasHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 rounded-2xl p-5 glass"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="text-xs font-display font-semibold uppercase tracking-widest text-white/40 mb-4">
                Bias Timeline
              </div>
              <div className="space-y-3">
                {biasHistory.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FF4D6D' }} />
                    <div className="flex-1">
                      <div className="text-xs font-display text-white/60">{ev.biasLabel}</div>
                    </div>
                    <div className="text-xs font-display font-semibold" style={{ color: '#FF4D6D' }}>
                      {ev.biasLevel}%
                    </div>
                    <div className="w-20 h-1 rounded-full bg-white/5">
                      <div className="h-full rounded-full" style={{ width: `${ev.biasLevel}%`, background: 'linear-gradient(90deg, #FF6B9D, #FF4D6D)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Emotional note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-10 rounded-2xl p-5"
            style={{ background: isFragmented ? 'rgba(255,77,109,0.04)' : 'rgba(0,212,255,0.04)', border: `1px solid ${isFragmented ? 'rgba(255,77,109,0.15)' : 'rgba(0,212,255,0.1)'}` }}
          >
            <p className="text-sm text-white/60 leading-relaxed italic">
              {isFragmented
                ? `"${selectedRole.name} has been interrupted ${interruptionCount} time${interruptionCount !== 1 ? 's' : ''} today. Their ideas have gone unattributed. Their confidence score has dropped ${100 - emotionalScore} points. The afternoon is still ahead."`
                : `"${selectedRole.name} has had an equitable morning. Their ideas were heard, their contributions credited. This is how every workday should feel."`
              }
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/scenario/2')}
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Continue the Day
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/comparison')}>
              Skip to Comparison
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
