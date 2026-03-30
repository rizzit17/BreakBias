import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Hash, Send, Smile } from 'lucide-react';
import GlitchEffect from '../../components/effects/GlitchEffect';
import Badge from '../../components/ui/Badge';

function ChatMessage({ msg, index, biasActive, isSelf }) {
  const isStolen = biasActive && !isSelf && index > 1 && msg.sender === 'David';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`flex items-start gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
        style={{
          background: isSelf ? 'rgba(197,163,255,0.2)' : 'rgba(255,255,255,0.06)',
          color: isSelf ? '#C5A3FF' : 'rgba(255,255,255,0.5)',
        }}>
        {msg.sender[0]}
      </div>
      <div className={`max-w-[75%] ${isSelf ? 'items-end' : 'items-start'} flex flex-col`}>
        <span className={`text-[10px] font-display mb-1 ${isSelf ? 'text-right' : ''}`}
          style={{ color: isSelf ? '#C5A3FF' : 'rgba(255,255,255,0.35)' }}>
          {isSelf ? 'You' : msg.sender}
        </span>
        <div className={`relative rounded-2xl px-3 py-2 text-xs leading-relaxed ${isSelf ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
          style={{
            background: isSelf
              ? 'rgba(197,163,255,0.12)'
              : isStolen
              ? 'rgba(0,212,255,0.08)'
              : 'rgba(255,255,255,0.04)',
            border: isSelf
              ? '1px solid rgba(197,163,255,0.2)'
              : isStolen
              ? '1px solid rgba(0,212,255,0.2)'
              : '1px solid rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.75)',
          }}>
          {msg.text}
          {isStolen && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3 }}
              className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(0,212,255,0.15)', color: '#00D4FF' }}>
              ← your idea
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatUI({ outcome, roleId, biasActive = false }) {
  const messages = outcome?.messages || [];
  const biasLevel = outcome?.biasLevel || 0;
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <GlitchEffect active={biasActive && biasLevel > 60} intensity="low">
      <div className="rounded-2xl overflow-hidden glass" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Slack-style header */}
        <div className="bg-black/40 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
          <Hash size={14} className="text-primary/60" />
          <span className="text-xs font-display font-semibold text-white/60">product-strategy</span>
          {biasActive && biasLevel > 60 && (
            <Badge variant="danger" dot className="ml-auto">Bias Active</Badge>
          )}
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              msg={msg}
              index={i}
              biasActive={biasActive}
              isSelf={msg.isSelf}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Outcome tag */}
        {biasActive && outcome?.outcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: messages.length * 0.2 + 0.3 }}
            className="mx-4 mb-3 rounded-xl px-3 py-2"
            style={{ background: biasLevel > 60 ? 'rgba(255,77,109,0.06)' : 'rgba(0,212,255,0.06)', border: `1px solid ${biasLevel > 60 ? 'rgba(255,77,109,0.15)' : 'rgba(0,212,255,0.15)'}` }}
          >
            <div className="text-[10px] text-white/40 font-display">Outcome: <span style={{ color: biasLevel > 60 ? '#FF4D6D' : '#00D4FF' }}>{outcome.outcome}</span></div>
          </motion.div>
        )}

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
          <div className="flex-1 rounded-xl px-3 py-2 text-xs text-white/20 font-display"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            Message #product-strategy
          </div>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center glass hover:bg-white/10 transition-colors text-white/30">
            <Smile size={12} />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-dark"
            style={{ background: 'linear-gradient(135deg, #C5A3FF, #9B59B6)' }}>
            <Send size={12} />
          </button>
        </div>
      </div>
    </GlitchEffect>
  );
}
