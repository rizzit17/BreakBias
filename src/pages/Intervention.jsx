import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import PolicyToggle from '../features/intervention/PolicyToggle';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import GlitchEffect from '../components/effects/GlitchEffect';

export default function Intervention() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { activeInterventions } = state;
  const policiesActive = activeInterventions.length;
  const systemStable = policiesActive >= 3;

  return (
    <PageWrapper ambientOrbs={false}>
      {/* Dynamic background that stabilizes based on active interventions */}
      <motion.div
        className="fixed inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: systemStable
            ? 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, #0B0F1A 80%)'
            : 'radial-gradient(ellipse at center, rgba(255,77,109,0.06) 0%, rgba(197,163,255,0.03) 40%, #0B0F1A 80%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">

          {/* Left col - Info */}
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold uppercase tracking-widest glass mb-6"
                style={{ color: systemStable ? '#00D4FF' : '#FF4D6D', border: `1px solid ${systemStable ? 'rgba(0,212,255,0.3)' : 'rgba(255,77,109,0.3)'}` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: systemStable ? '#00D4FF' : '#FF4D6D' }} />
                System {systemStable ? 'Stabilized' : 'Biased'}
              </div>

              <GlitchEffect active={!systemStable} intensity="low" className="mb-6">
                <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Systemic problems need{' '}
                  <span style={{ color: systemStable ? '#00D4FF' : '#C5A3FF' }} className="transition-colors duration-1000">
                    systemic fixes
                  </span>
                </h1>
              </GlitchEffect>

              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Telling individuals to "be more assertive" doesn't fix a system that penalizes them when they are. Bias isn't just an attitude; it's a design flaw in how we work. Toggle structural interventions to stabilize the system.
              </p>

              {/* Status block */}
              <motion.div
                className="rounded-3xl p-6 glass transition-all duration-1000"
                style={{
                  border: systemStable ? '1px solid rgba(0,212,255,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  background: systemStable ? 'rgba(0,212,255,0.03)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {systemStable
                    ? <CheckCircle2 size={32} className="text-cyan drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
                    : <Activity size={32} className="text-white/20" />
                  }
                  <div>
                    <div className="text-sm font-display font-semibold text-white">Current Structural Equity</div>
                    <div className="text-xs text-white/40">{policiesActive} of 4 interventions active</div>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ background: systemStable ? '#00D4FF' : 'linear-gradient(90deg, #FF6B9D, #C5A3FF)' }}
                    animate={{ width: `${(policiesActive / 4) * 100}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right col - Interventions */}
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="text-xs font-display font-semibold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                <ShieldCheck size={14} /> Available Policies
              </div>
              <PolicyToggle className="mb-10" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: systemStable ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
              >
                <Button
                  variant={systemStable ? 'cyan' : 'ghost'}
                  size="xl"
                  className="w-full"
                  onClick={() => navigate('/reflection')}
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Conclude Experience
                </Button>
                {!systemStable && (
                  <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-4 font-display">
                    Enable at least 3 policies to advance
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
