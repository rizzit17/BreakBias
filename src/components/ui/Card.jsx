import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, glow = false, glowColor = 'primary', onClick, style }) {
  const glowColors = {
    primary: 'rgba(197, 163, 255, 0.15)',
    accent: 'rgba(255, 77, 109, 0.15)',
    cyan: 'rgba(0, 212, 255, 0.15)',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: glow ? `0 20px 60px ${glowColors[glowColor] || glowColors.primary}` : undefined } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`glass rounded-2xl ${hover ? 'cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
