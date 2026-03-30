import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ROLE_CONFIGS = {
  'male-manager': {
    color: '#00D4FF',
    gradient: 'linear-gradient(135deg, #00D4FF 0%, #0066CC 100%)',
    symbol: '◈',
    initials: 'AC',
    shape: '40% 60% 60% 40% / 60% 30% 70% 40%',
  },
  'female-employee': {
    color: '#FF6B9D',
    gradient: 'linear-gradient(135deg, #FF6B9D 0%, #FF4D6D 100%)',
    symbol: '◇',
    initials: 'SC',
    shape: '60% 40% 30% 70% / 40% 70% 30% 60%',
  },
  'intern': {
    color: '#C5A3FF',
    gradient: 'linear-gradient(135deg, #C5A3FF 0%, #9B59B6 100%)',
    symbol: '○',
    initials: 'J',
    shape: '50% 50% 50% 50% / 50% 50% 50% 50%',
  },
};

export default function AvatarMorph({ roleId, targetRoleId, isAnimating = false, size = 80, showRing = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const cfg = ROLE_CONFIGS[roleId] || ROLE_CONFIGS['male-manager'];
  const targetCfg = ROLE_CONFIGS[targetRoleId] || cfg;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      {showRing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered
              ? `0 0 30px ${cfg.color}88, 0 0 60px ${cfg.color}44`
              : `0 0 15px ${cfg.color}44`,
          }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: '50%' }}
        />
      )}

      {/* Avatar blob */}
      <motion.div
        className="w-full h-full flex items-center justify-center cursor-pointer relative overflow-hidden"
        style={{ background: cfg.gradient }}
        animate={{
          borderRadius: isAnimating
            ? [cfg.shape, targetCfg.shape, cfg.shape]
            : isHovered
            ? targetCfg.shape
            : cfg.shape,
        }}
        transition={{
          duration: isAnimating ? 2 : 0.6,
          ease: 'easeInOut',
          repeat: isAnimating ? Infinity : 0,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
          }} />

        {/* Identity text */}
        <motion.span
          className="relative z-10 font-display font-bold text-white"
          style={{ fontSize: size * 0.28 }}
          animate={{ opacity: isAnimating ? [1, 0.5, 1] : 1 }}
          transition={{ duration: 2, repeat: isAnimating ? Infinity : 0 }}
        >
          {cfg.initials}
        </motion.span>

        {/* Ghost layer of target identity on hover */}
        <AnimatePresence>
          {isHovered && targetRoleId && targetRoleId !== roleId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: targetCfg.gradient }}
            >
              <span className="font-display font-bold text-white" style={{ fontSize: size * 0.28 }}>
                {targetCfg.initials}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Identity symbol */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
        style={{
          background: cfg.color,
          boxShadow: `0 0 8px ${cfg.color}88`,
          color: '#0B0F1A',
          fontSize: 10,
          fontWeight: 700,
        }}
        animate={{ scale: isHovered ? 1.2 : 1 }}
      >
        {cfg.symbol}
      </motion.div>
    </div>
  );
}
