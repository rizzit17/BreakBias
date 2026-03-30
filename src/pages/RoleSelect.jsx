import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GameCard from '../components/ui/GameCard';
import GameButton from '../components/ui/GameButton';
import AvatarMorph from '../components/effects/AvatarMorph';
import StatBadge from '../components/ui/StatBadge';
import { useRoleState } from '../hooks/useRoleState';
import { useMode } from '../context/ModeContext';
import { Shield, Swords, Star } from 'lucide-react';

export default function RoleSelect() {
  const navigate = useNavigate();
  const { mode, userContext } = useMode();
  const { allRoles, selectRole } = useRoleState();
  const [localSelected, setLocalSelected] = useState(null);

  if (mode === 'personal') {
    navigate(userContext?.name ? '/dashboard' : '/setup');
    return null;
  }

  function handleSelect(roleId) {
    const role = allRoles.find(r => r.id === roleId);
    if (!role || role.locked) return;
    setLocalSelected(roleId);
  }

  function handleConfirm() {
    if (!localSelected) return;
    selectRole(localSelected);
    navigate('/dashboard');
  }

  const selectedData = allRoles.find(r => r.id === localSelected);

  // RPG Stat Multipliers mapping
  const roleStats = {
    'intern': { str: 'Low', def: 'Low', luk: 'Med' },
    'female-employee': { str: 'Med', def: 'Low', luk: 'Low' },
    'male-manager': { str: 'High', def: 'High', luk: 'Max' },
    'executive': { str: 'High', def: 'Med', luk: 'Low' },
    'hr-partner': { str: 'Med', def: 'Med', luk: 'Low' },
    'support-staff': { str: 'Med', def: 'High', luk: 'Low' }
  };

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen pt-24 pb-16 px-6 bg-game-grid">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
            <StatBadge value={`${allRoles.length}`} label="Players" color="#00D4FF" className="mb-4" />
            <h1 className="text-5xl font-display font-black text-white uppercase text-game-shadow">
              SELECT YOUR <span className="text-primary">FIGHTER</span>
            </h1>
            <p className="mt-4 text-white/50 font-bold uppercase tracking-widest text-sm">
              Same Level. Different Difficulty Multiplier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 w-full mb-12">
            {allRoles.map((role) => {
              const isSel = localSelected === role.id;
              const stats = roleStats[role.id];

              return (
                <GameCard
                  key={role.id}
                  hover={!role.locked}
                  hoverGlowColor={role.color === '#00D4FF' ? 'cyan' : (role.color === '#C5A3FF' ? 'primary' : 'accent')}
                  onClick={() => handleSelect(role.id)}
                  className={`relative flex flex-col items-center p-8 transition-all duration-300 border-4 
                    ${role.locked ? 'opacity-40 grayscale pointer-events-none' : ''} 
                    ${isSel ? `border-[${role.color}] bg-[${role.color}]/10 scale-105` : 'border-white/10'}`
                  }
                  style={isSel ? { borderColor: role.color, backgroundColor: `${role.color}15` } : {}}
                >
                  {isSel && (
                    <div className="absolute top-4 right-4 animate-bounce">
                      <Star fill={role.color} color={role.color} size={24} />
                    </div>
                  )}

                  <AvatarMorph roleId={role.id} size={100} isAnimating={isSel} />
                  
                  <h2 className="mt-6 text-2xl font-display font-black text-white uppercase" style={{ color: role.color }}>
                    {role.name}
                  </h2>
                  <div className="text-xs font-display text-white/50 uppercase font-bold tracking-widest px-3 py-1 bg-black/40 rounded-full mt-2 border-2 border-white/5">
                    {role.locked ? 'LOCKED [Requires Pass]' : role.title}
                  </div>

                  {!role.locked && (
                    <div className="w-full mt-6 space-y-2 bg-black/30 p-3 rounded-xl border-2 border-white/5">
                      <div className="flex justify-between items-center text-xs font-display font-bold">
                        <span className="text-white/40 flex items-center gap-1"><Swords size={12}/> ATK</span>
                        <span className={stats.str === 'High' ? 'text-cyan' : 'text-primary'}>{stats.str}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-display font-bold">
                        <span className="text-white/40 flex items-center gap-1"><Shield size={12}/> DEF</span>
                        <span className={stats.def === 'High' ? 'text-cyan' : 'text-accent'}>{stats.def}</span>
                      </div>
                    </div>
                  )}

                </GameCard>
              );
            })}
          </div>

          <AnimatePresence>
            {localSelected && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-10"
              >
                <GameButton
                  variant="primary"
                  size="xl"
                  onClick={handleConfirm}
                  style={{ background: selectedData?.color, borderColor: '#fff' }}
                  className="px-16"
                >
                  SPAWN AS {selectedData?.name}
                </GameButton>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </PageWrapper>
  );
}
