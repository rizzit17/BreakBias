import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import PolicyToggle from '../features/intervention/PolicyToggle';
import GameButton from '../components/ui/GameButton';
import GameCard from '../components/ui/GameCard';
import StatBadge from '../components/ui/StatBadge';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Save, ShieldAlert } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';

export default function Intervention() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { activeInterventions } = state;
  const policiesActive = activeInterventions.length;
  const systemStable = policiesActive >= 3;

  return (
    <PageWrapper ambientOrbs={false}>
      {/* Background stabilized */}
      <div 
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 bg-game-grid"
        style={{
          background: systemStable
            ? '#0B0F1A'
            : '#1A0B12', /* red tint */
        }}
      />

      <div className="relative min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">

          {/* Left col - Info Console */}
          <div className="flex-1 sticky top-24">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              
              <StatBadge 
                 value={systemStable ? 'STABILIZED' : 'COMPROMISED'} 
                 label="Server Integrity" 
                 color={systemStable ? '#00D4FF' : '#FF4D6D'} 
                 icon={systemStable ? <ShieldCheck size={16}/> : <ShieldAlert size={16}/>}
                 pulse={!systemStable}
                 className="mb-8 block max-w-max"
              />

              <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-6 uppercase leading-none text-game-shadow">
                SERVER <br/> <span className="text-primary">MOD MENU</span>
              </h1>

              <GameCard hover={false} className={`p-6 border-4 mb-8 bg-[#0B0F1A] transition-colors duration-1000
                 ${systemStable ? 'border-cyan' : 'border-accent'}`}>
                  <p className="font-display font-medium text-white/70 text-lg leading-relaxed mb-6">
                    Telling individual players to "git gud" doesn't fix a server that drops their frames. Bias isn't a strategy flaw; it's a bug in the code. Enable global mods to stabilize the workplace environment.
                  </p>
                  
                  <div className="space-y-2">
                    <ProgressBar 
                       value={policiesActive} max={4} 
                       label="Server Patch Progress" 
                       color={systemStable ? '#00D4FF' : '#FF6B9D'}
                    />
                  </div>
              </GameCard>
            </motion.div>
          </div>

          {/* Right col - Mod List */}
          <div className="flex-1 w-full">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-[#151928] p-2 flex items-center justify-center gap-2 border-4 border-gray-800 rounded-xl mb-8 shadow-game text-white/50 font-display font-black uppercase text-sm tracking-widest">
                <Save size={16} /> Available Server Mods
              </div>
              
              <PolicyToggle className="mb-10 w-full" />

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: systemStable ? 1 : 0.4 }} transition={{ duration: 0.4 }}>
                <GameButton
                  variant={systemStable ? 'cyan' : 'primary'}
                  size="xl"
                  className="w-full text-xl"
                  onClick={() => navigate('/reflection')}
                  icon={<ArrowRight size={24} />}
                  iconPosition="right"
                  disabled={!systemStable}
                >
                  SAVE & EXIT TO MENU
                </GameButton>
                {!systemStable && (
                  <p className="text-center text-xs font-display text-accent uppercase font-black tracking-widest mt-4">
                    [ Install 3+ mods to reboot server ]
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
