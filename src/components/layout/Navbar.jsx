import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Hexagon, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../ui/ProgressBar';
import roleplaydLogo from '../../assets/roleplayd.png';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  
  if (pathname === '/') return null;

  const { selectedRole, emotionalScore, activeInterventions } = state;
  const isIntervention = pathname === '/intervention';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-dark/95 border-b-[3px] border-white/10"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Player ID */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <img
            src={roleplaydLogo}
            alt="RolePlayd logo"
            className="w-10 h-10 rounded-lg object-cover border-[2px]"
            style={{
              borderColor: '#C5A3FF',
              boxShadow: '0 2px 0 #9B59B6, inset 0 2px 0 rgba(255,255,255,0.2)',
            }}
          />
          
          {selectedRole ? (
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-lg leading-none">{selectedRole.title}</div>
              <div className="text-primary text-xs font-display flex items-center gap-1 mt-0.5">
                <Hexagon size={10} className="fill-current" /> Level {pathname.includes('scenario') ? 'In Progress' : 'Hub'}
              </div>
            </div>
          ) : (
            <div className="text-white font-display font-bold text-lg">Select Character</div>
          )}
        </div>

        {/* Center: HUD XP Bar */}
        {selectedRole && !isIntervention && (
          <div className="hidden md:flex flex-1 max-w-sm px-8">
            <ProgressBar 
              value={emotionalScore} 
              max={100} 
              label="Confidence XP" 
              color={emotionalScore > 60 ? '#00D4FF' : (emotionalScore > 30 ? '#C5A3FF' : '#FF4D6D')} 
            />
          </div>
        )}

        {/* Right: Game System Toggles / Settings */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-card-dark border-[2px] border-white/5 flex items-center gap-2">
            <ShieldCheck size={16} className={activeInterventions.length > 0 ? "text-cyan drop-shadow-[0_0_5px_#00D4FF]" : "text-white/20"} />
            <span className="text-xs font-display font-bold text-white/50">{activeInterventions.length}/4 Mods</span>
          </div>
          <button className="w-8 h-8 rounded-lg bg-card-dark border-[2px] border-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors">
            <Maximize2 size={14} />
          </button>
        </div>

      </div>
    </motion.nav>
  );
}
