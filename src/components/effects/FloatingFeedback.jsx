import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingFeedback({ messages = [] }) {
  // messages = [{ id, text, type: 'positive' | 'negative' | 'neutral', x, y }]

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {messages.map((msg) => {
          const isNegative = msg.type === 'negative';
          const isPositive = msg.type === 'positive';
          
          let color = '#C5A3FF';
          if (isNegative) color = '#FF4D6D';
          if (isPositive) color = '#00D4FF';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 40, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1.2 }}
              exit={{ opacity: 0, y: -60, scale: 0.8 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute font-display font-black text-2xl"
              style={{
                left: msg.x || '50%',
                top: msg.y || '50%',
                transform: 'translate(-50%, -50%)',
                color: color,
                textShadow: `0 4px 0 rgba(0,0,0,0.8), 0 0 20px ${color}80, -2px -2px 0 #fff`
              }}
            >
              {isNegative && '- '}{isPositive && '+ '}{msg.text}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
