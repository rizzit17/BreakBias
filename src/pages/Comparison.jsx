import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ComparisonView from '../features/comparison/ComparisonView';
import GameButton from '../components/ui/GameButton';
import { useApp } from '../context/AppContext';
import { useMode } from '../context/ModeContext';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { mode } = useMode();
  const { selectedRole } = state;
  const isPersonalMode = mode === 'personal';

  if (!selectedRole) { navigate(isPersonalMode ? '/setup' : '/role-select'); return null; }
  if (isPersonalMode) { navigate('/dashboard'); return null; }

  const isMaleManager = selectedRole.id === 'male-manager';

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen flex flex-col bg-game-grid bg-[#070A13]">
        
        {/* Game UI Header */}
        <div className="bg-[#151928] border-b-4 border-gray-800 px-6 py-4 flex items-center justify-between z-20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-4">
            <GameButton variant="ghost" size="sm" onClick={() => navigate('/summary')} icon={<ArrowLeft size={18} />}>
              BACK
            </GameButton>
            <div>
              <h1 className="text-2xl font-display font-black text-white uppercase text-game-shadow">VS MODE</h1>
              <div className="text-[10px] text-white/40 font-display uppercase tracking-widest font-bold">
                Multiplayer Comparison View
              </div>
            </div>
          </div>
          <GameButton variant="primary" onClick={() => navigate('/intervention')} icon={<ShieldAlert size={18} />}>
            MOD SETTINGS
          </GameButton>
        </div>

        {/* Main VS Container */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-1 relative flex flex-col">
          
          {/* Big VS Element */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <motion.div 
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: 'spring', bounce: 0.6, delay: 0.5 }}
               className="w-24 h-24 bg-accent rounded-full border-8 border-[#070A13] flex items-center justify-center shadow-game"
            >
              <span className="font-display font-black text-4xl text-[#0B0F1A] pb-1 italic">VS</span>
            </motion.div>
          </div>

          {/* The actual comparison view (Split Screen) */}
          <div className="flex-1 flex w-full relative">
            <ComparisonView
              roleIdA="male-manager"
              roleIdB={isMaleManager ? 'female-employee' : selectedRole.id}
            />
          </div>

          {/* Callout */}
          <motion.div 
             initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
             className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
             <div className="bg-[#151928] border-4 border-accent p-4 rounded-xl shadow-game text-center max-w-lg">
                <div className="text-sm font-display font-black uppercase text-accent mb-2">Notice the Reality Gap?</div>
                <p className="text-xs font-display font-medium text-white/70 leading-relaxed mb-4">
                  Player 1 and Player 2 pressed the exact same inputs, but the server reacted differently based on their avatar. This isn't a skill issue. The environment is bugged.
                </p>
                <GameButton variant="ghost" size="sm" onClick={() => navigate('/intervention')} className="text-xs w-full">
                  ACCESS SERVER MODS
                </GameButton>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </PageWrapper>
  );
}
