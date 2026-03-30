import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AlertTriangle } from 'lucide-react';

export default function BiasFlash() {
  const { state } = useApp();
  const { showBiasFlash, currentBiasEvent } = state;

  return (
    <AnimatePresence>
      {showBiasFlash && currentBiasEvent && (
        <>
          {/* Red flash overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.1, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.1, 0.3, 0.5, 1] }}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ background: 'rgba(255, 77, 109, 0.15)', mixBlendMode: 'screen' }}
          />

          {/* Bias notification card */}
          <motion.div
            initial={{ opacity: 0, y: -80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-6 right-6 z-[60] max-w-sm"
          >
            <div className="glass rounded-2xl p-4 border border-red-500/30 shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(255, 77, 109, 0.3)' }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255, 77, 109, 0.2)', border: '1px solid rgba(255, 77, 109, 0.4)' }}>
                  <AlertTriangle size={16} className="text-red-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">
                    Bias Detected
                  </div>
                  <div className="text-sm font-medium text-white mb-1">
                    {currentBiasEvent.biasLabel}
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.1)', width: '100%' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentBiasEvent.biasLevel}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #FF6B9D, #FF4D6D)' }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Severity: {currentBiasEvent.biasLevel}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
