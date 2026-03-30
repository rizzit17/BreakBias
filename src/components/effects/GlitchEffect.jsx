import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GlitchEffect({ active = false, intensity = 'medium', children, className = '' }) {
  const [glitchFrame, setGlitchFrame] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setGlitchFrame(f => (f + 1) % 6);
    }, 80);
    return () => clearInterval(interval);
  }, [active]);

  const intensityMap = {
    low: { tx: 1, filter: 'hue-rotate(20deg)' },
    medium: { tx: 3, filter: 'hue-rotate(90deg) saturate(2)' },
    high: { tx: 6, filter: 'hue-rotate(180deg) saturate(3)' },
  };

  const cfg = intensityMap[intensity] || intensityMap.medium;
  const frames = [
    { x: 0, y: 0, filter: 'none' },
    { x: -cfg.tx, y: cfg.tx, filter: cfg.filter },
    { x: cfg.tx, y: -cfg.tx, filter: 'none' },
    { x: -cfg.tx / 2, y: cfg.tx / 2, filter: cfg.filter },
    { x: cfg.tx / 2, y: -cfg.tx / 2, filter: 'none' },
    { x: 0, y: 0, filter: 'none' },
  ];

  const curr = active ? frames[glitchFrame] : frames[0];

  return (
    <div className={`relative ${className}`} style={{ position: 'relative' }}>
      {/* Main content */}
      <motion.div
        animate={{ x: curr.x, y: curr.y }}
        transition={{ duration: 0 }}
        style={{ filter: curr.filter }}
      >
        {children}
      </motion.div>

      {/* Chromatic aberration red layer */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              filter: 'url(#redChannel)',
              transform: `translate(${-curr.x * 1.5}px, 0)`,
              color: 'rgba(255, 77, 109, 0.5)',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chromatic aberration cyan layer */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              filter: 'url(#cyanChannel)',
              transform: `translate(${curr.x * 1.5}px, 0)`,
              color: 'rgba(0, 212, 255, 0.5)',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanlines during glitch */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
              zIndex: 20,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
