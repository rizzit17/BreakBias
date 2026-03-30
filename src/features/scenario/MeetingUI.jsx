import { motion } from 'framer-motion';
import { Video, MicOff, Settings, Users } from 'lucide-react';

export default function MeetingUI({ outcome, roleId, biasActive }) {
  const isTargeted = ['female-employee', 'intern'].includes(roleId);

  const PARTICIPANTS = [
    { id: 1, name: 'MARK', role: 'Director', color: '#00D4FF' },
    { id: 2, name: 'DAVID', role: 'Lead', color: '#FF6B9D' },
    { id: 3, name: 'EMILY', role: 'Design', color: '#C5A3FF' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#151928] border-2 border-white/5 rounded-xl overflow-hidden shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)]">
      
      {/* Video Grid */}
      <div className="flex-1 p-2 grid grid-cols-2 gap-2 bg-[#0B0F1A]">
        {PARTICIPANTS.map((p, i) => (
          <motion.div 
            key={p.id} 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className={`
               relative rounded-xl overflow-hidden border-[3px] shadow-[0_4px_0_rgba(0,0,0,0.5)] 
               bg-[#1f2937] flex items-center justify-center
               ${biasActive && p.id === 1 && isTargeted ? 'border-accent shadow-[0_0_20px_rgba(255,77,109,0.5),_0_4px_0_#900021]' : `border-[${p.color}]10`}
            `}
          >
             <div className="text-4xl font-display font-black text-white/10" style={{ fontFamily: 'Fredoka' }}>{p.name.charAt(0)}</div>
             
             {/* Participant Tag */}
             <div className="absolute bottom-2 left-2 bg-black/80 px-3 py-1 rounded-md border border-white/10 flex items-center gap-2 shadow-game">
                <div className={`w-2 h-2 rounded-full ${biasActive && p.id === 1 && isTargeted ? 'bg-accent animate-pulse' : 'bg-green-400'}`} />
                <div>
                   <div className="text-[10px] font-display font-bold text-white uppercase">{p.name}</div>
                   <div className="text-[8px] font-display text-white/50 uppercase tracking-widest">{p.role}</div>
                </div>
             </div>

             {/* Speaking Indicator */}
             {biasActive && p.id === 1 && isTargeted && (
                <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-[10px] uppercase font-black font-display animate-pulse shadow-game border-2 border-[#900021]">
                   Speaking Over You
                </div>
             )}
          </motion.div>
        ))}

        {/* You Box */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className={`
               relative rounded-xl overflow-hidden border-[3px] shadow-[0_4px_0_rgba(0,0,0,0.5)] 
               bg-black flex items-center justify-center
               ${biasActive && isTargeted ? 'border-white/10 grayscale filter arcade-glitch' : 'border-primary/50'}
            `}
        >
             <div className="text-4xl font-display font-black text-white/5 opacity-50">YOU</div>
             <div className="absolute bottom-2 left-2 bg-black/80 px-3 py-1 rounded-md border border-white/10 shadow-game">
                <div className="text-[10px] font-display font-bold text-primary uppercase">YOU</div>
                <div className="text-[8px] font-display text-white/50 uppercase tracking-widest">Player 1</div>
             </div>
             {biasActive && isTargeted && (
               <div className="absolute inset-0 bg-accent/10 pointer-events-none mix-blend-overlay"></div>
             )}
        </motion.div>

      </div>

      {/* Controls Bar */}
      <div className="h-16 bg-[#1f2937] border-t-[3px] border-[#0B0F1A] flex items-center justify-center gap-4 px-4 shadow-[inset_0_4px_0_rgba(255,255,255,0.05)]">
        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white border-b-2 border-black/50 hover:translate-y-[1px] hover:border-b-[1px]"><Video size={18} /></button>
        <button className={`w-10 h-10 rounded-full flex items-center justify-center text-white border-b-2 border-black/50 transition-all ${biasActive && isTargeted ? 'bg-[#FF4D6D] border-[#900021] pointer-events-none' : 'bg-[#FF4D6D] border-[#900021] hover:translate-y-[1px] hover:border-b-[1px]'}`}>
           <MicOff size={18} />
        </button>
        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/50 border-b-2 border-black/50"><Users size={14} /></button>
        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/50 border-b-2 border-black/50"><Settings size={14} /></button>
      </div>

    </div>
  );
}
