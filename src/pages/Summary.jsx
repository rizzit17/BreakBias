import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GameButton from '../components/ui/GameButton';
import GameCard from '../components/ui/GameCard';
import ProgressBar from '../components/ui/ProgressBar';
import AvatarMorph from '../components/effects/AvatarMorph';
import { useApp } from '../context/AppContext';
import { useBiasEngine } from '../hooks/useBiasEngine';
import { useMode } from '../context/ModeContext';
import { TrendingDown, TrendingUp, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function Summary() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { mode } = useMode();
  const { selectedRole, emotionalScore, totalBiasEvents } = state;
  const {
    getBiasSeverity,
    getEmotionalState,
    interruptionCount,
    visibilityScore,
    getAccumulationIndex,
    getCompoundDisadvantageLabel,
    getInvisibleLaborLoad,
    getInterventionImpactPreview
  } = useBiasEngine();
  const isPersonalMode = mode === 'personal';

  if (!selectedRole) { navigate(isPersonalMode ? '/setup' : '/role-select'); return null; }

  const severity = getBiasSeverity();
  const emotional = getEmotionalState();
  const isHardMode = severity > 60;
  const compoundLabel = getCompoundDisadvantageLabel();

  const metrics = [
    { label: 'Confidence XP', value: emotionalScore, max: 100, color: '#C5A3FF', icon: <TrendingUp size={16} /> },
    { label: 'Visible Impact', value: visibilityScore, max: 100, color: '#00D4FF', icon: <TrendingDown size={16} /> },
    { label: 'Bias DMG Taken', value: totalBiasEvents * 25, max: 100, color: '#FF4D6D', icon: <AlertTriangle size={16} /> },
    { label: 'Interrupt Drops', value: interruptionCount * 20, max: 100, color: '#FF6B9D', icon: <ShieldAlert size={16} /> },
  ];

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen pt-24 pb-16 px-6 bg-[#0B0F1A]">
        {/* Striped Game Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 20px)' }}
        />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          
          {/* Header Scorecard */}
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase text-game-shadow mb-4">
              LEVEL <span className="text-primary">COMPLETE</span>
            </h1>
            <div className={`px-6 py-2 rounded-xl inline-block border-[3px] border-b-[6px] shadow-game font-display font-black text-xl 
                            ${isHardMode ? 'bg-[#900021] border-accent text-white' : 'bg-[#00D4FF]/20 border-cyan text-cyan'}`}>
              Rank: {isHardMode ? 'D (SYSTEM FAILURE)' : 'S (EQUITABLE)'}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-8 w-full">
            
            {/* Player Profile Panel */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="col-span-12 md:col-span-4">
              <GameCard hover={false} className="p-8 h-full flex flex-col items-center justify-center text-center border-4 border-gray-800 bg-card-dark">
                <AvatarMorph roleId={selectedRole.id} size={120} />
                <h2 className="mt-6 text-3xl font-display font-black text-white uppercase">{selectedRole.name}</h2>
                <div className="text-sm font-display font-bold text-white/50 uppercase tracking-widest mt-1 mb-6">
                  {selectedRole.title}
                </div>
                <div className={`w-full py-4 px-2 rounded-xl border-2 font-display font-bold uppercase
                                ${isHardMode ? 'bg-[#FF4D6D]/10 border-accent text-accent' : 'bg-cyan/10 border-cyan text-cyan'}`}>
                  Status: {emotional.label}
                </div>
              </GameCard>
            </motion.div>

            {/* Stat Bars Panel */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-12 md:col-span-8">
              <GameCard hover={false} className="p-8 w-full border-4 border-gray-800 bg-card-dark">
                <h3 className="text-2xl font-display font-black text-white uppercase border-b-4 border-white/10 pb-4 mb-6 text-game-shadow">
                  Post-Game Stats
                </h3>
                <div className="space-y-6">
                  {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}>
                      <ProgressBar 
                        value={m.value} 
                        max={m.max} 
                        label={m.label} 
                        icon={m.icon}
                        color={m.color} 
                        className="scale-y-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </GameCard>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full mt-8">
            <GameCard hover={false} className="p-6 border-4 border-gray-800 bg-card-dark">
              <div className="text-xs font-display font-black uppercase tracking-widest mb-2" style={{ color: compoundLabel.color }}>
                Compound Disadvantage
              </div>
              <div className="text-3xl font-display font-black text-white">{getAccumulationIndex()}</div>
              <div className="text-sm font-display font-bold mt-2" style={{ color: compoundLabel.color }}>{compoundLabel.label}</div>
            </GameCard>
            <GameCard hover={false} className="p-6 border-4 border-gray-800 bg-card-dark">
              <div className="text-xs font-display font-black uppercase tracking-widest mb-2 text-cyan">
                Invisible Labor Load
              </div>
              <div className="text-3xl font-display font-black text-white">{getInvisibleLaborLoad()}</div>
              <div className="text-sm font-display font-bold mt-2 text-white/60">times support work became hidden tax</div>
            </GameCard>
            <GameCard hover={false} className="p-6 border-4 border-gray-800 bg-card-dark">
              <div className="text-xs font-display font-black uppercase tracking-widest mb-2 text-primary">
                Intervention Test Value
              </div>
              <div className="text-3xl font-display font-black text-white">{getInterventionImpactPreview()}</div>
              <div className="text-sm font-display font-bold mt-2 text-white/60">projected bias points recoverable with active policy design</div>
            </GameCard>
          </div>

          {/* Nav Buttons */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="mt-12 flex flex-col sm:flex-row gap-6">
             {isPersonalMode ? (
               <>
                 <GameButton variant="accent" size="lg" onClick={() => navigate('/dashboard')} className="px-12 text-lg">
                    RETURN TO PERSONAL HUB
                 </GameButton>
                 <GameButton variant="ghost" size="lg" onClick={() => navigate('/reflection')} className="px-12 text-lg">
                    COMPLETE PERSONAL RUN
                 </GameButton>
               </>
             ) : (
               <>
                 <GameButton variant="accent" size="lg" onClick={() => navigate('/comparison')} className="px-12 animate-pulse text-lg">
                    ENTER VS. MODE
                 </GameButton>
                 <GameButton variant="ghost" size="lg" onClick={() => navigate('/intervention')} className="px-12 text-lg">
                    SKIP TO MOD MENU
                 </GameButton>
               </>
             )}
          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}
