import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import scenariosData from '../../data/scenarios.json';

const ICON_MAP = {
  calendar: '📅',
  shield: '🛡',
  'check-circle': '✅',
  users: '👥',
};

export default function PolicyToggle({ className = '' }) {
  const { state, dispatch } = useApp();
  const { activeInterventions } = state;

  function toggle(id) {
    dispatch({ type: 'TOGGLE_INTERVENTION', payload: id });
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {scenariosData.interventions.map((policy, i) => {
        const isActive = activeInterventions.includes(policy.id);
        return (
          <motion.div
            key={policy.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-4 transition-all duration-400 cursor-pointer group"
            style={{
              background: isActive ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isActive ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
              boxShadow: isActive ? '0 0 20px rgba(0,212,255,0.08)' : 'none',
            }}
            onClick={() => toggle(policy.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{ICON_MAP[policy.icon] || '🔧'}</span>
                <div>
                  <div className="text-sm font-display font-semibold text-white mb-1">
                    {policy.title}
                  </div>
                  <div className="text-xs text-white/40 leading-relaxed mb-2">
                    {policy.description}
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-display font-semibold"
                      style={{ background: 'rgba(0,212,255,0.12)', color: '#00D4FF' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                      {policy.impact}
                    </motion.div>
                  )}
                </div>
              </div>
              {/* Toggle switch */}
              <div
                className="flex-shrink-0 w-10 h-5 rounded-full relative transition-all duration-300"
                style={{ background: isActive ? '#00D4FF' : 'rgba(255,255,255,0.1)' }}
              >
                <motion.div
                  className="absolute top-0.5 bottom-0.5 w-4 rounded-full bg-white shadow"
                  animate={{ left: isActive ? '22px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
