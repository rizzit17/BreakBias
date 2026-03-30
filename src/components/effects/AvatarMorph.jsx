import { motion } from 'framer-motion';

export default function AvatarMorph({ roleId, size = 64, isAnimating = false }) {
  const configs = {
    'male-manager': { color: '#00D4FF', letter: 'ALEX', border: '#006B8A' },
    'female-employee': { color: '#FF4D6D', letter: 'SARAH', border: '#900021' },
    'intern': { color: '#C5A3FF', letter: 'JAMIE', border: '#6C3483' },
    'default': { color: '#ffffff', letter: '??', border: '#666' }
  };

  const config = configs[roleId] || configs['default'];

  return (
    <motion.div
      className="relative flex items-center justify-center font-display font-black"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: config.color,
        border: `4px solid ${config.border}`,
        boxShadow: `0 ${(size/10)}px 0 ${config.border}, inset 0 ${(size/15)}px 0 rgba(255,255,255,0.4), inset 0 -${(size/15)}px 0 rgba(0,0,0,0.2)`
      }}
      animate={isAnimating ? {
        y: [0, -size/8, 0],
        rotate: [0, -5, 5, 0]
      } : {}}
      transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0, ease: 'easeInOut' }}
    >
      <span style={{ 
        fontSize: size * 0.35,
        color: '#0B0F1A', 
        textShadow: '0 2px 0 rgba(255,255,255,0.5)'
      }}>
        {config.letter.substring(0, 1)}
      </span>
    </motion.div>
  );
}
