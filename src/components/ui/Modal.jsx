import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] ${sizes[size]} z-[60]`}
          >
            <div className="glass-strong rounded-3xl overflow-hidden border border-white/10"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,163,255,0.1)' }}>
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h3 className="font-display font-semibold text-white">{title}</h3>
                  <button onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center glass hover:bg-white/10 transition-colors">
                    <X size={16} className="text-white/60" />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
