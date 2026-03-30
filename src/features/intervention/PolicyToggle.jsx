import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import GameCard from '../../components/ui/GameCard';
import { Check, X } from 'lucide-react';
import scenariosData from '../../data/scenarios.json';

export default function PolicyToggle({ className = '' }) {
  const { state, dispatch } = useApp();
  const { activeInterventions } = state;
  const policies = scenariosData.interventions;

  function toggle(policyId) {
    dispatch({ type: 'TOGGLE_INTERVENTION', payload: policyId });
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {policies.map((p, i) => {
        const isActive = activeInterventions.includes(p.id);

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GameCard
              hover={true}
              onClick={() => toggle(p.id)}
              className={`p-4 flex items-center gap-4 cursor-pointer border-4 transition-all duration-300
                ${isActive 
                  ? 'bg-cyan/10 border-cyan text-cyan' 
                  : 'bg-card-dark border-gray-800 text-white/60 hover:border-white/20'}`}
            >
              {/* Switch Box */}
              <div 
                className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center border-4 shadow-game transition-colors duration-300
                  ${isActive ? 'bg-cyan border-[#00B3CC] text-[#0B0F1A]' : 'bg-[#0B0F1A] border-gray-800'}`}
              >
                {isActive ? <Check size={24} strokeWidth={4} /> : <X size={20} />}
              </div>
              
              <div className="flex-1">
                <div className={`font-display font-black text-lg uppercase mb-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {p.title}
                </div>
                <div className="font-display text-sm font-medium opacity-80 leading-snug">
                  {p.description}
                </div>
              </div>

              {isActive && (
                <div className="hidden sm:block text-[10px] font-display font-black bg-cyan text-[#0B0F1A] px-2 py-1 uppercase tracking-widest shadow-game border-2 border-[#00B3CC] rotate-3">
                  MOD ACTIVE
                </div>
              )}
            </GameCard>
          </motion.div>
        );
      })}
    </div>
  );
}
