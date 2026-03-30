import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { RefreshCw, Github, Link2 } from 'lucide-react';
import DualLayerText from '../components/effects/DualLayerText';

export default function Reflection() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  function handleRestart() {
    dispatch({ type: 'RESET' });
    navigate('/');
  }

  return (
    <PageWrapper ambientOrbs={false}>
      {/* Calm, glowing center point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(197,163,255,1) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,1) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl text-center z-10"
        >
          {/* Subtle logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(197,163,255,0.2)]">
              <span className="font-display font-black text-gradient-primary">WR</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Perception shapes reality. <br />
            <span className="text-white/50 font-light">Structure changes it.</span>
          </h1>

          <div className="space-y-6 text-lg text-white/50 leading-relaxed mb-12">
            <p>
              When bias occurs, the burden is often placed on the individual to speak louder, work harder, or lean in.
            </p>
            <p>
              <DualLayerText
                text="But the data is clear: inequity is a design flaw."
                altText="Structure dictates behavior."
                className="font-medium text-white/70"
                altClassName="text-gradient-primary"
              />
            </p>
            <p>
              By fixing the structure — through blind reviews, inclusive metrics, and active sponsorship — we stop trying to fix the people, and start fixing the workplace.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass mb-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleRestart}
              icon={<RefreshCw size={18} />}
              iconPosition="left"
            >
              Play Another Role
            </Button>

            <div className="w-px h-12 bg-white/10 hidden sm:block" />

            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/5">
                <Github size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/5">
                <Link2 size={20} />
              </a>
            </div>
          </div>

          <div className="text-xs text-white/20 font-display uppercase tracking-widest">
            Workday Replay: Dual Identity 2026
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
