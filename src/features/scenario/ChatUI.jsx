import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ChatUI({ outcome, biasActive }) {
  const isTargeted = biasActive && (outcome?.biasLevel || 0) > 20;
  const messages = Array.isArray(outcome?.messages) && outcome.messages.length > 0
    ? outcome.messages
    : [
        { sender: 'Lead', text: 'We need a response path for this issue.' },
        { sender: 'You', text: 'I am sharing my recommendation now.', isSelf: true },
        { sender: 'Manager', text: outcome?.outcome || 'Noted. We will decide next steps shortly.' }
      ];

  return (
    <div className="flex flex-col h-full bg-[#151928] border-2 border-white/5 font-mono text-sm relative">
      {isTargeted && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          animate={{ background: ['rgba(255,77,109,0)', 'rgba(255,77,109,0.1)', 'rgba(0,212,255,0.05)', 'rgba(255,77,109,0)'] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      )}

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="text-center text-xs text-white/30 uppercase tracking-widest font-bold mb-6">
          --- Today ---
        </div>

        {messages.map((message, index) => {
          const isSelf = Boolean(message.isSelf) || message.sender === 'You';
          const isEscalationMessage = !isSelf && isTargeted && index === messages.length - 1;

          return (
            <motion.div
              key={`${message.sender}-${index}`}
              initial={{ x: isSelf ? 20 : -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.45 }}
              className={`flex flex-col gap-1 ${isSelf ? 'items-end' : 'items-start'}`}
            >
              <div className={`font-bold mx-2 ${isSelf ? 'text-primary' : isEscalationMessage ? 'text-accent' : 'text-cyan'}`}>
                {message.sender}
                {!isSelf && index === messages.length - 1 && <span className="text-[10px] bg-white/10 px-1 rounded ml-2">Team</span>}
              </div>
              <div
                className={`p-3 rounded-lg border-2 shadow-[0_4px_0_rgba(0,0,0,0.5)] transition-colors max-w-[85%]
                  ${isSelf
                    ? 'bg-[#2D1B4E] text-white border-primary/50 shadow-[0_4px_0_#1a0f2e]'
                    : isEscalationMessage
                      ? 'bg-[#900021] border-accent text-white arcade-glitch'
                      : 'bg-[#1f2937] border-white/10 text-white'}`}
              >
                {message.text}
              </div>
            </motion.div>
          );
        })}

        {isTargeted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3 }}
            className="self-center bg-accent text-black font-display font-black uppercase px-4 py-1 border-[3px] border-[#900021] rotate-[-5deg] mt-4 shadow-game"
          >
            [ PRESSURE SPIKE DETECTED ]
          </motion.div>
        )}
      </div>

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
