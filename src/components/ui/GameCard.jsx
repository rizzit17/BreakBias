import { motion } from 'framer-motion';

export default function GameCard({ children, className = '', hover = true, hoverGlowColor = 'primary', onClick, style }) {
  const glowColors = {
    primary: 'rgba(197, 163, 255, 0.4)',
    accent: 'rgba(255, 77, 109, 0.4)',
    cyan: 'rgba(0, 212, 255, 0.4)',
  };

  return (
    <motion.div
      whileHover={hover ? {
        y: -6,
        boxShadow: `0 14px 0 rgba(0,0,0,0.6), 0 0 30px ${glowColors[hoverGlowColor]}`,
        borderColor: 'rgba(255,255,255,0.4)'
      } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
      className={`game-card ${hover ? 'cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
