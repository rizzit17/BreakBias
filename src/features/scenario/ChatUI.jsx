import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ChatUI({ outcome, roleId, biasActive }) {
  const isFemale = roleId === 'female-employee';

  return (
    <div className="flex flex-col h-full bg-[#151928] border-2 border-white/5 font-mono text-sm relative">
      
      {/* Glitch Overlay if active */}
      {biasActive && isFemale && (
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none"
          animate={{ background: ['rgba(255,77,109,0)', 'rgba(255,77,109,0.1)', 'rgba(0,212,255,0.05)', 'rgba(255,77,109,0)'] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      )}

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="text-center text-xs text-white/30 uppercase tracking-widest font-bold mb-6">
          --- Today ---
        </div>
        
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col items-start gap-1">
          <div className="text-cyan font-bold mx-2">David [Frontend]</div>
          <div className="bg-[#1f2937] text-white p-3 rounded-lg border-2 border-white/10 shadow-[0_4px_0_rgba(0,0,0,0.5)]">
            Hey team, we need a solution for the caching issue.
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col items-end gap-1">
          <div className="text-primary font-bold mx-2">You</div>
          <div className="bg-[#2D1B4E] text-white p-3 rounded-lg border-2 border-primary/50 shadow-[0_4px_0_#1a0f2e]">
             What if we use stale-while-revalidate for the dashboard? It should mask the latency.
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 2.5 }} 
          className="flex flex-col items-start gap-1 mt-6"
        >
          <div className="text-accent font-bold mx-2">Mark [Lead] <span className="text-[10px] bg-accent/20 px-1 rounded ml-2">Admin</span></div>
          <div className={`p-3 rounded-lg border-2 shadow-[0_4px_0_rgba(0,0,0,0.5)] transition-colors
                           ${biasActive && isFemale ? 'bg-[#900021] border-accent text-white arcade-glitch' : 'bg-[#1f2937] border-white/10 text-white'}`}>
            {isFemale ? "That's exactly what David said yesterday. Good memory." : "Great idea Alex. Let's implement that immediately."}
          </div>
        </motion.div>

        {biasActive && isFemale && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 3 }}
                className="self-center bg-accent text-black font-display font-black uppercase px-4 py-1 border-[3px] border-[#900021] rotate-[-5deg] mt-4 shadow-game">
                [ CREDIT STOLEN ]
            </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#0B0F1A] border-t-2 border-white/5 flex gap-2">
        <div className="flex-1 bg-[#1f2937] border-2 border-white/10 rounded-md p-2 text-white/40">
           Type message...
        </div>
        <button disabled className="w-10 h-10 bg-[#1f2937] rounded-md border-2 border-white/10 flex items-center justify-center text-white/30">
          <Send size={16} />
        </button>
      </div>

    </div>
  );
}
