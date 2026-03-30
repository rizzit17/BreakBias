import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GameButton from '../components/ui/GameButton';
import GameCard from '../components/ui/GameCard';
import StatBadge from '../components/ui/StatBadge';
import { Gamepad2, Users2, Swords, ShieldAlert } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    icon: <Users2 size={24} />, color: '#00D4FF',
    title: 'Character Select',
    desc: 'Pick your identity. Every character plays the same level, but the difficulty multiplier changes based on who you are.',
  },
  {
    icon: <Swords size={24} />, color: '#C5A3FF',
    title: 'The Daily Grind',
    desc: 'Survive meetings, endure chat threads, and read emails. Watch your Conf XP. It drains when you lose credit.',
  },
  {
    icon: <Gamepad2 size={24} />, color: '#FF6B9D',
    title: 'Multiplayer VS Mode',
    desc: 'Compare your run side-by-side with another player. Did they get the promotion for the same action?',
  },
  {
    icon: <ShieldAlert size={24} />, color: '#FF4D6D',
    title: 'Mod The Server',
    desc: 'You can\'t beat a rigged game by playing harder. Toggle server policies to patch the bugs in the system.',
  },
];

export default function Intro() {
  const navigate = useNavigate();

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-game-dark">
        
        {/* Header HUD */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10 w-full max-w-3xl flex justify-between items-end">
          <div className="text-left">
            <StatBadge value="TUTORIAL" color="#C5A3FF" pulse className="mb-2 inline-block" />
            <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase mt-4 text-game-shadow">
              HOW TO <span className="text-primary">PLAY</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-display text-white/40 uppercase tracking-widest block mb-1">Quest Log</span>
            <span className="text-sm font-display text-cyan font-bold bg-[#0B0F1A] px-3 py-1 rounded-md border-2 border-cyan/30">
              Survive the Workday
            </span>
          </div>
        </motion.div>

        {/* Tutorial Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
          {TUTORIAL_STEPS.map((step, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               transition={{ delay: i * 0.15 + 0.2 }}
             >
               <GameCard hover={false} className="p-6 h-full flex flex-col items-start border-l-4" style={{ borderLeftColor: step.color }}>
                 <div className="p-3 rounded-xl mb-4" style={{ background: `${step.color}20`, border: `2px solid ${step.color}50`, color: step.color }}>
                   {step.icon}
                 </div>
                 <h2 className="text-xl font-display font-black text-white uppercase mb-2">
                   {step.title}
                 </h2>
                 <p className="text-white/60 text-sm font-medium leading-relaxed">
                   {step.desc}
                 </p>
               </GameCard>
             </motion.div>
          ))}
        </div>

        {/* Play Action */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
          <GameButton
            variant="cyan"
            size="xl"
            onClick={() => navigate('/role-select')}
          >
            I UNDERSTAND &rarr;
          </GameButton>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
