import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function DualLayerText({ text, altText, className = '', textClassName = '', altClassName = '', as: Tag = 'span' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <motion.span
        className={`relative z-10 block ${textClassName}`}
        animate={{ opacity: isHovered ? 0.3 : 1, y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>

      {/* Ghost alternate layer (visible on hover) */}
      <AnimatePresence>
        {altText && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            className={`absolute inset-0 block ${altClassName}`}
            style={{ pointerEvents: 'none' }}
          >
            {altText}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Chromatic aberration offset layers */}
      <span
        className="absolute inset-0 block pointer-events-none select-none"
        aria-hidden="true"
        style={{
          color: 'rgba(255, 77, 109, 0.25)',
          transform: 'translate(-1.5px, 0)',
          opacity: isHovered ? 0.8 : 0.3,
          transition: 'opacity 0.3s',
        }}
      >
        {isHovered && altText ? altText : text}
      </span>
      <span
        className="absolute inset-0 block pointer-events-none select-none"
        aria-hidden="true"
        style={{
          color: 'rgba(0, 212, 255, 0.25)',
          transform: 'translate(1.5px, 0)',
          opacity: isHovered ? 0.8 : 0.3,
          transition: 'opacity 0.3s',
        }}
      >
        {isHovered && altText ? altText : text}
      </span>
    </div>
  );
}
