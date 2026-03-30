import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/ui/Button';
import DualLayerText from '../components/effects/DualLayerText';
import { ArrowRight, Play } from 'lucide-react';

function ParticleField() {
  const count = 30;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ['#C5A3FF', '#00D4FF', '#FF6B9D'][i % 3],
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, -40 - Math.random() * 60, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function DualFaceSVG() {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{ border: '1px solid rgba(197,163,255,0.15)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full"
        style={{ border: '1px dashed rgba(0,212,255,0.1)' }}
      />

      {/* Left identity half */}
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full rounded-l-full overflow-hidden flex items-center justify-end"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(0,102,204,0.08) 100%)' }}
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="pr-8 text-center">
          <div className="text-3xl font-display font-black text-cyan-400 opacity-80" style={{ textShadow: '0 0 20px rgba(0,212,255,0.5)' }}>AC</div>
          <div className="text-[10px] text-cyan-400/50 font-display mt-1">HE / HIM</div>
        </div>
      </motion.div>

      {/* Right identity half */}
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full rounded-r-full overflow-hidden flex items-center justify-start"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,157,0.12) 0%, rgba(255,77,109,0.08) 100%)' }}
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div className="pl-8 text-center">
          <div className="text-3xl font-display font-black opacity-80" style={{ color: '#FF6B9D', textShadow: '0 0 20px rgba(255,107,157,0.5)' }}>SC</div>
          <div className="text-[10px] font-display mt-1" style={{ color: 'rgba(255,107,157,0.5)' }}>SHE / HER</div>
        </div>
      </motion.div>

      {/* Center seam with glow */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-px w-px"
        style={{ background: 'linear-gradient(180deg, transparent, #C5A3FF, #FF4D6D, #00D4FF, transparent)', boxShadow: '0 0 10px rgba(197,163,255,0.6)' }} />

      {/* Center dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
        animate={{ scale: [1, 1.4, 1], boxShadow: ['0 0 10px rgba(197,163,255,0.8)', '0 0 25px rgba(197,163,255,1)', '0 0 10px rgba(197,163,255,0.8)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: '0 0 60px rgba(197,163,255,0.12), inset 0 0 60px rgba(0,0,0,0.3)' }} />
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(springX, [-400, 400], [-20, 20]);
  const bgY = useTransform(springY, [-400, 400], [-20, 20]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <div
      className="relative min-h-screen bg-dark overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: '#C5A3FF', filter: 'blur(120px)', opacity: 0.07 }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: '#00D4FF', filter: 'blur(100px)', opacity: 0.06 }} />
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full"
          style={{ background: '#FF4D6D', filter: 'blur(100px)', opacity: 0.05 }} />
      </motion.div>

      <ParticleField />

      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold uppercase tracking-widest glass"
            style={{ color: '#C5A3FF', border: '1px solid rgba(197,163,255,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Interactive Workplace Bias Simulation
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-2"
            style={{ letterSpacing: '-0.02em' }}>
            Workday
            <span className="block text-gradient-primary">Replay</span>
          </h1>
          <div className="text-xl md:text-2xl font-display font-light text-white/40"
            style={{ letterSpacing: '0.15em' }}>
            DUAL IDENTITY
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-12 max-w-lg"
        >
          <DualLayerText
            text="Same work. Same day. Different reality."
            altText="Same effort. Same skill. Different treatment."
            className="w-full"
            textClassName="text-xl md:text-2xl text-white/70 font-light leading-relaxed"
            altClassName="text-xl md:text-2xl font-light leading-relaxed text-gradient-primary"
          />
          <p className="mt-4 text-sm text-white/30 leading-relaxed">
            Experience the same workday through three different identities.<br />
            Watch how perception changes everything.
          </p>
        </motion.div>

        {/* Dual face visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
          className="mb-12"
        >
          <DualFaceSVG />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/intro')}
            icon={<Play size={18} />}
            iconPosition="left"
          >
            Begin the Replay
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/comparison')}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            See the Comparison
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex items-center gap-12"
        >
          {[
            { value: '3', label: 'Identities' },
            { value: '4', label: 'Scenarios' },
            { value: '7', label: 'Bias Types' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-display font-black text-gradient-primary">{stat.value}</div>
              <div className="text-[10px] text-white/30 font-display uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/20 text-xs font-display flex flex-col items-center gap-2"
        >
          <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(197,163,255,0.3))' }} />
          SCROLL
        </motion.div>
      </motion.div>
    </div>
  );
}
