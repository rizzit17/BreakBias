import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ─── Pixel / Roblox-style border utility ─────────────────────────── */
const pixelBorder = {
  boxShadow: `
    0 -4px 0 0 #7c3aed,
    0  4px 0 0 #7c3aed,
   -4px 0 0 0 #7c3aed,
    4px 0 0 0 #7c3aed,
    0 -4px 0 4px #4c1d95,
    0  4px 0 4px #4c1d95,
   -4px 0 0 4px #4c1d95,
    4px 0 0 4px #4c1d95
  `,
};

const cyanPixelBorder = {
  boxShadow: `
    0 -4px 0 0 #00bcd4,
    0  4px 0 0 #00bcd4,
   -4px 0 0 0 #00bcd4,
    4px 0 0 0 #00bcd4,
    0 -4px 0 4px #006064,
    0  4px 0 4px #006064,
   -4px 0 0 4px #006064,
    4px 0 0 4px #006064
  `,
};

/* ─── Floating Particle ────────────────────────────────────────────── */
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-sm pointer-events-none"
      style={style}
      animate={{ y: [-20, -80], opacity: [0.8, 0], rotate: [0, 45] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 4, ease: 'easeOut' }}
    />
  );
}

/* ─── XP Bar ───────────────────────────────────────────────────────── */
function XPBar({ label, value, color = '#a855f7' }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between text-xs font-mono uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <span>{label}</span><span style={{ color }}>{value}%</span>
      </div>
      <div className="h-3 w-full rounded-none bg-[#1a1f35] relative overflow-hidden" style={{ border: '2px solid rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full absolute left-0 top-0"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
        />
        {/* Shimmer */}
        <motion.div
          className="absolute top-0 bottom-0 w-8 opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
          animate={{ left: ['-10%', '110%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </div>
    </div>
  );
}

/* ─── Stat Badge ───────────────────────────────────────────────────── */
function FloatingBadge({ icon, title, sub, delay, color = '#a855f7' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', bounce: 0.4 }}
      className="flex items-center gap-2 px-3 py-2 rounded-none cursor-default select-none"
      style={{
        background: '#0d1120',
        border: `2px solid ${color}55`,
        boxShadow: `0 0 20px ${color}22, inset 0 0 10px ${color}11`,
      }}
    >
      <div className="w-7 h-7 flex items-center justify-center rounded-none" style={{ background: `${color}22`, color }}>
        {icon}
      </div>
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-white leading-none">{title}</div>
        <div className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</div>
      </div>
    </motion.div>
  );
}

/* ─── Main Landing ─────────────────────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-500, 500], [-8, 8]);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 6.2) % 100}%`,
    top: `${60 + (i * 7) % 35}%`,
    width: i % 3 === 0 ? 8 : 5,
    height: i % 3 === 0 ? 8 : 5,
    background: i % 2 === 0 ? '#a855f7' : '#00D4FF',
    opacity: 0.7,
  }));

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.width / 2);
    mouseY.set(e.clientY - rect.height / 2);
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center select-none"
      style={{ background: '#080c18', fontFamily: "'Fredoka One', 'Nunito', sans-serif" }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap');
        @keyframes scanline { 0%{top:-20%} 100%{top:110%} }
        @keyframes glitch {
          0%,95%,100%{clip-path:none;transform:translate(0)}
          96%{clip-path:inset(20% 0 60% 0);transform:translate(-4px,2px)}
          98%{clip-path:inset(50% 0 20% 0);transform:translate(4px,-2px)}
        }
        @keyframes pulse-ring {
          0%{transform:scale(1);opacity:.6}
          100%{transform:scale(1.6);opacity:0}
        }
        .glitch-text { animation: glitch 5s infinite; }
        .btn-roblox:hover .pulse-ring { animation: pulse-ring 0.8s ease-out infinite; }
      `}</style>

      {/* ── Deep grid background ── */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* ── Radial vignette ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #080c18 100%)'
      }} />

      {/* ── Floor glow ── */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(168,85,247,0.15) 0%, transparent 100%)',
        transform: 'perspective(800px) rotateX(50deg)',
        transformOrigin: 'bottom',
      }} />

      {/* ── Scanline sweep ── */}
      <div className="absolute left-0 right-0 h-32 pointer-events-none z-0" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.03), transparent)',
        animation: 'scanline 8s linear infinite',
      }} />

      {/* ── Particles ── */}
      {particles.map((p, i) => <Particle key={i} style={p} />)}

      {/* ── TOP HUD BAR ── */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="absolute top-6 left-0 right-0 flex justify-center gap-3 px-6 z-20"
      >
        <FloatingBadge icon={<Trophy size={14} />} title="Career" sub="Simulator Mode" delay={0.2} color="#00D4FF" />
      </motion.div>

      {/* ── MAIN CARD ── */}
      <motion.div
        style={{ rotateX, rotateY, perspective: 1200 }}
        className="relative z-10 w-full max-w-3xl px-6 text-center"
      >
        {/* Interactive Simulation Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-black uppercase tracking-[0.25em]"
          style={{
            background: '#0d1120',
            color: '#00D4FF',
            border: '2px solid #00D4FF44',
            boxShadow: '0 0 20px #00D4FF33',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          Interactive Simulation
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
        </motion.div>

        {/* ROLE */}
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.6, duration: 0.9 }}
        >
          <h1
            className="font-black uppercase leading-none text-white"
            style={{
              fontSize: 'clamp(5rem, 15vw, 10rem)',
              textShadow: '4px 4px 0px #1a0a2e',
              letterSpacing: '-0.02em',
            }}
          >
            ROLE
          </h1>
        </motion.div>

        {/* PLAYD */}
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.6, duration: 0.9, delay: 0.1 }}
          className="relative inline-block"
        >
          <h1
            className="font-black uppercase leading-none"
            style={{
              fontSize: 'clamp(5rem, 15vw, 10rem)',
              color: '#a855f7',
              letterSpacing: '-0.02em',
            }}
          >
            PLAYD
          </h1>
          {/* Underline block — Roblox style */}
          <div className="absolute -bottom-2 left-0 right-0 h-3" style={{ background: '#5b21b6', transform: 'skewX(-5deg)' }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 mb-2 text-base md:text-xl font-black uppercase tracking-[0.2em]"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Press Start to Enter Dual Reality.<br></br><br></br><br></br>
        </motion.p>
        



        {/* ── START BUTTON ── */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            className="btn-roblox relative group flex items-center gap-3 px-12 py-5 font-black uppercase text-xl md:text-2xl tracking-widest text-black cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7)',
              ...pixelBorder,
              letterSpacing: '0.12em',
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={() => navigate('/mode-select')}
          >
            {/* Pulse ring */}
            <div
              className="pulse-ring absolute inset-0 pointer-events-none"
              style={{
                border: '3px solid #a855f7',
                opacity: 0,
              }}
            />
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Play size={22} fill="black" />
            </motion.span>
            START GAME
            <motion.span
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronRight size={20} />
            </motion.span>
          </motion.button>


        </motion.div>

        {/* ── BOTTOM HINT ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-6 text-xs font-black uppercase tracking-[0.2em]"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
            Use Mouse to Navigate
          </span>
          <span className="text-white/10">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
            Headphones Recommended
          </span>
        </motion.div>
      </motion.div>

      {/* ── CORNER DECORATIONS — Roblox HUD style ── */}
      {[
        { pos: 'top-4 left-4', color: '#a855f7' },
        { pos: 'top-4 right-4', color: '#a855f7' },
        { pos: 'bottom-4 left-4', color: '#00D4FF' },
        { pos: 'bottom-4 right-4', color: '#00D4FF' },
      ].map(({ pos, color }, i) => (
        <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`}>
          <div className="absolute top-0 left-0 w-4 h-0.5" style={{ background: color }} />
          <div className="absolute top-0 left-0 w-0.5 h-4" style={{ background: color }} />
          <div className="absolute bottom-0 right-0 w-4 h-0.5" style={{ background: color }} />
          <div className="absolute bottom-0 right-0 w-0.5 h-4" style={{ background: color }} />
        </div>
      ))}
    </div>
  );
}
