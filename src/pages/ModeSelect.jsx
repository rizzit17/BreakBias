import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GameCard from '../components/ui/GameCard';
import { useMode } from '../context/ModeContext';
import { MonitorPlay, User as UserIcon } from 'lucide-react';
import StatBadge from '../components/ui/StatBadge';

export default function ModeSelect() {
  const navigate = useNavigate();
  const { setMode } = useMode();

  function handleSelect(chosenMode) {
    setMode(chosenMode);
    if (chosenMode === 'simulation') {
      navigate('/intro');
    } else {
      navigate('/login');
    }
  }

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen pt-24 pb-16 px-6 bg-[#0B0F1A] flex flex-col items-center justify-center">
        
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-black text-white uppercase text-game-shadow">
            CHOOSE YOUR <span className="text-primary">EXPERIENCE</span>
          </h1>
          <p className="mt-4 text-white/50 font-bold uppercase tracking-widest text-sm">
            Select how you want to play
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <GameCard
              hoverGlowColor="cyan"
              onClick={() => handleSelect('simulation')}
              className="h-full p-8 flex flex-col items-center text-center cursor-pointer border-4 border-[#1f2937]"
            >
              <div className="w-20 h-20 rounded-2xl bg-cyan/10 border-4 border-cyan flex items-center justify-center mb-6 shadow-game">
                <MonitorPlay size={40} className="text-cyan drop-shadow-[0_0_10px_#00D4FF]" />
              </div>
              <h2 className="text-3xl font-display font-black text-white uppercase mb-4 text-game-shadow">
                SIMULATION MODE
              </h2>
              <div className="flex gap-2 mb-6">
                <StatBadge value="HACKATHON" color="#00D4FF" />
                <StatBadge value="GUEST" color="#C5A3FF" />
              </div>
              <p className="text-white/60 font-display font-medium leading-relaxed">
                Experience a pre-built static scenario designed to showcase the system. No login required.
              </p>
            </GameCard>
          </motion.div>

          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <GameCard
              hoverGlowColor="accent"
              onClick={() => handleSelect('personal')}
              className="h-full p-8 flex flex-col items-center text-center cursor-pointer border-4 border-[#1f2937]"
            >
              <div className="w-20 h-20 rounded-2xl bg-accent/10 border-4 border-accent flex items-center justify-center mb-6 shadow-game">
                <UserIcon size={40} className="text-accent drop-shadow-[0_0_10px_#FF4D6D]" />
              </div>
              <h2 className="text-3xl font-display font-black text-white uppercase mb-4 text-game-shadow">
                PERSONAL MODE
              </h2>
              <div className="flex gap-2 mb-6">
                <StatBadge value="LOGIN REQ" color="#FF6B9D" />
                <StatBadge value="CUSTOM" color="#00D4FF" />
              </div>
              <p className="text-white/60 font-display font-medium leading-relaxed">
                See how bias affects YOUR specific reality based on your industry and role. Requires account creation.
              </p>
            </GameCard>
          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}
