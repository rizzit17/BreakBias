import { motion } from 'framer-motion';
import { Mail, Reply, Star, Trash } from 'lucide-react';

export default function EmailUI({ outcome, biasActive }) {
  const isTargeted = biasActive && (outcome?.biasLevel || 0) > 20;
  const biasLevel = outcome?.biasLevel || 0;
  const subject = outcome?.subject || 'Performance Notes';
  const fromName = outcome?.fromName || 'Director';
  const fromAddress = outcome?.from || 'leadership@company.com';
  const body = outcome?.body || 'Thanks for the work here. We will follow up with next steps soon.';

  return (
    <div className="flex flex-col h-full bg-[#151928] border-2 border-white/5 font-mono text-sm">
      <div className="bg-[#0B0F1A] border-b-4 border-white/5 px-4 py-3 flex gap-2 overflow-hidden items-center">
        <Mail size={18} className="text-white/40" />
        <span className="font-display font-black tracking-widest text-white/50 text-xs uppercase">
          Review Inbox
        </span>
      </div>

      <div className="p-4 sm:p-6 bg-[#0B0F1A]/80 flex-1 relative overflow-y-auto">
        <div className="max-w-xl mx-auto space-y-4">
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-between items-start mb-6 pb-4 border-b-2 border-white/10">
            <div>
              <div className="text-xl font-display font-bold text-white mb-1 shadow-game inline-block">{subject}</div>
              <div className="text-white/40 text-xs uppercase font-bold tracking-widest">From: {fromName} [{fromAddress}]</div>
            </div>
            <div className="flex gap-2 text-white/30">
              <button className="p-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:text-white"><Reply size={16} /></button>
              <button className="p-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:text-white"><Star size={16} /></button>
              <button className="p-2 bg-white/5 border border-white/10 rounded hover:bg-[#900021] hover:text-accent"><Trash size={16} /></button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-4 text-white/70 leading-loose">
            <p>Hey team,</p>
            <p>{body}</p>

            {!!outcome?.keywords?.length && (
              <div className="relative">
                <span className={`transition-all duration-300 ${isTargeted ? 'bg-[#900021]/80 text-white p-1 rounded font-bold arcade-glitch inline-block border border-accent shadow-game' : ''}`}>
                  Keywords flagged: {outcome.keywords.join(', ')}
                </span>

                {isTargeted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -right-10 -bottom-8 bg-accent text-black uppercase font-display font-black px-3 py-1 border-[3px] border-[#900021] rotate-12 shadow-game pointer-events-none"
                  >
                    [ REVIEW BIAS ]
                  </motion.div>
                )}
              </div>
            )}

            <p>Let&apos;s regroup Monday.</p>
            <p className="opacity-50 mt-8">- {fromName}</p>
            {biasLevel > 0 && (
              <p className="text-xs uppercase tracking-widest text-white/40 font-bold">
                Bias load: {biasLevel}%
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
