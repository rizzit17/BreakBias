import { motion } from 'framer-motion';
import { Mail, Archive, Star, Trash2, Reply } from 'lucide-react';
import GlitchEffect from '../../components/effects/GlitchEffect';
import Badge from '../../components/ui/Badge';

const TONE_COLORS = {
  positive: { color: '#00D4FF', label: 'Positive Tone', variant: 'cyan' },
  mixed: { color: '#FF6B9D', label: 'Problematic Language', variant: 'accent' },
  dismissive: { color: '#9B59B6', label: 'Dismissive Tone', variant: 'primary' },
};

export default function EmailUI({ outcome, roleId, biasActive = false }) {
  if (!outcome) return null;

  const toneConfig = TONE_COLORS[outcome.tone] || TONE_COLORS.positive;
  const biasLevel = outcome.biasLevel || 0;

  function highlightKeywords(text, keywords = [], color = '#FF6B9D') {
    if (!keywords.length) return text;
    return text.split('\n').map((line, li) => (
      <span key={li}>
        {line.split(' ').map((word, wi) => {
          const clean = word.toLowerCase().replace(/[.,!?]/g, '');
          const isKeyword = keywords.some(k => k.toLowerCase() === clean);
          return (
            <span key={wi}>
              {isKeyword ? (
                <motion.mark
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + wi * 0.05 }}
                  style={{
                    background: `${color}22`,
                    color,
                    padding: '0 2px',
                    borderRadius: 3,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {word}
                </motion.mark>
              ) : word}
              {' '}
            </span>
          );
        })}
        {li < text.split('\n').length - 1 && <br />}
      </span>
    ));
  }

  return (
    <GlitchEffect active={biasActive && biasLevel > 60} intensity="low">
      <div className="rounded-2xl overflow-hidden glass" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Email client header */}
        <div className="bg-black/40 px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
          <Mail size={14} className="text-primary/60" />
          <span className="text-xs font-display font-semibold text-white/50">Inbox</span>
          <span className="text-xs text-white/20">/ Performance Review</span>
        </div>

        {/* Email header */}
        <div className="px-5 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display font-semibold text-white text-sm mb-1">{outcome.subject}</h3>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: toneConfig.color + '22', color: toneConfig.color }}>
                  {outcome.fromName?.[0] || 'M'}
                </div>
                <span className="text-xs text-white/40 font-display">{outcome.fromName}</span>
                <span className="text-xs text-white/20">&lt;{outcome.from}&gt;</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={toneConfig.variant} dot>{toneConfig.label}</Badge>
            </div>
          </div>
        </div>

        {/* Email body */}
        <div className="px-5 py-4">
          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line font-light">
            {biasActive && outcome.keywords?.length
              ? highlightKeywords(outcome.body, outcome.keywords, '#FF6B9D')
              : outcome.body
            }
          </p>

          {biasActive && outcome.keywords?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 rounded-xl p-3"
              style={{ background: 'rgba(255,77,109,0.06)', border: '1px solid rgba(255,77,109,0.15)' }}
            >
              <div className="text-[10px] font-display font-semibold text-accent uppercase tracking-widest mb-2">
                ⚠ Biased Language Detected
              </div>
              <div className="flex flex-wrap gap-1.5">
                {outcome.keywords.map(k => (
                  <span key={k} className="px-2 py-0.5 rounded-full text-[10px] font-display"
                    style={{ background: 'rgba(255,77,109,0.12)', color: '#FF6B9D', border: '1px solid rgba(255,77,109,0.2)' }}>
                    "{k}"
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-white/30 mt-2">
                These terms are statistically used more often in reviews of women vs. men in the same role.
              </p>
            </motion.div>
          )}
        </div>

        {/* Action bar */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display glass hover:bg-white/10 transition-colors text-white/50">
            <Reply size={12} /> Reply
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center glass hover:bg-white/10 transition-colors text-white/30">
            <Star size={12} />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center glass hover:bg-white/10 transition-colors text-white/30">
            <Archive size={12} />
          </button>
        </div>
      </div>
    </GlitchEffect>
  );
}
