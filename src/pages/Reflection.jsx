import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GameButton from '../components/ui/GameButton';
import GameCard from '../components/ui/GameCard';
import StatBadge from '../components/ui/StatBadge';
import { useApp } from '../context/AppContext';
import { RefreshCw, Github, Link2, MonitorPlay } from 'lucide-react';

export default function Reflection() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  function handleRestart() {
    dispatch({ type: 'RESET' });
    navigate('/');
  }

  return (
    <PageWrapper ambientOrbs={false}>
      {/* Intense Arcade Background */}
      <div className="absolute inset-0 bg-[#0B0F1A] pointer-events-none">
         <div className="absolute inset-0 bg-game-grid opacity-20"></div>
         {/* Glowing core */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-fast"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="max-w-2xl text-center z-10 w-full"
        >
          {/* Subtle logo */}
          <div className="flex justify-center mb-8">
            <StatBadge icon={<MonitorPlay />} value="SYSTEM ADMIN" color="#00D4FF" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-none uppercase text-game-shadow">
            GAME <span className="text-primary">OVER</span>
          </h1>

          <GameCard hover={false} className="p-8 mb-12 border-4 border-gray-800 bg-[#151928] text-center shadow-game">
             <div className="text-2xl font-display font-black text-cyan uppercase mb-6">
               Thanks for playing <br className="sm:hidden" /> [ WORKDAY REPLAY ]
             </div>

             <div className="space-y-6 text-lg text-white/50 leading-relaxed font-display font-medium">
               <p>
                 When lag occurs, we don't blame the player's controller—we fix the server.
               </p>
               <p className="p-4 bg-black/50 border-2 border-white/10 rounded-xl text-white/80 font-bold uppercase tracking-wide">
                 Inequity is a design flaw.<br/>Structure dictates behavior.
               </p>
               <p>
                 By re-coding the structure — enabling blind reviews, inclusive metrics, and active sponsorship — we stop trying to fix the people, and start fixing the workplace.
               </p>
             </div>
          </GameCard>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
               <GameButton
                 variant="primary"
                 size="xl"
                 onClick={handleRestart}
                 icon={<RefreshCw size={24} />}
                 iconPosition="left"
                 className="px-12 animate-pulse"
               >
                 INSERT COIN (RESTART)
               </GameButton>
            </motion.div>

            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" 
                 className="w-16 h-16 rounded-xl bg-card-dark border-4 border-gray-800 shadow-game flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:-translate-y-1 transition-all">
                <Github size={28} />
              </a>
              <a href="#" 
                 className="w-16 h-16 rounded-xl bg-card-dark border-4 border-gray-800 shadow-game flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:-translate-y-1 transition-all">
                <Link2 size={28} />
              </a>
            </div>
          </div>

          <div className="mt-12 text-[10px] text-white/20 font-display uppercase font-black tracking-widest">
            © 2026 WORKDAY REPLAY STUDIO | DUAL IDENTITY
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
