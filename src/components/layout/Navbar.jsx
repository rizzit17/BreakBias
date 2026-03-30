import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AvatarMorph from '../effects/AvatarMorph';
import { Home, ArrowLeft } from 'lucide-react';

export default function Navbar() {
  const { state } = useApp();
  const { selectedRole, emotionalScore, totalBiasEvents } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return null;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40"
    >
      <div className="glass-dark border-b border-white/5 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Back */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={16} className="text-white/60" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group"
            >
              <span className="text-xs font-display font-semibold text-primary/70 group-hover:text-primary transition-colors">
                WORKDAY REPLAY
              </span>
            </button>
          </div>

          {/* Center — identity indicator */}
          {selectedRole && (
            <div className="flex items-center gap-3">
              <AvatarMorph roleId={selectedRole.id} size={32} showRing={false} />
              <div>
                <div className="text-xs font-display font-semibold text-white">{selectedRole.name}</div>
                <div className="text-[10px] text-white/40">{selectedRole.title}</div>
              </div>
              {/* Identity color bar */}
              <div className="w-16 h-0.5 rounded-full" style={{ background: selectedRole.color, boxShadow: `0 0 6px ${selectedRole.color}88` }} />
            </div>
          )}

          {/* Right — live metrics */}
          {selectedRole && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/40 font-display">CONFIDENCE</span>
                <div className="w-20 h-1 rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #00D4FF, #C5A3FF)' }}
                    animate={{ width: `${emotionalScore}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              {totalBiasEvents > 0 && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                  style={{ background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] text-accent font-display font-semibold">
                    {totalBiasEvents} BIAS {totalBiasEvents === 1 ? 'EVENT' : 'EVENTS'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
