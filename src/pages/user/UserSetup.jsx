import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import GameCard from '../../components/ui/GameCard';
import GameButton from '../../components/ui/GameButton';
import { useMode } from '../../context/ModeContext';
import { useAuth } from '../../features/user/useAuth';
import { useApp } from '../../context/AppContext';
import StatBadge from '../../components/ui/StatBadge';
import { Settings } from 'lucide-react';

export default function UserSetup() {
  const navigate = useNavigate();
  const { setMode, setUserContext } = useMode();
  const { user } = useAuth();
  const { dispatch } = useApp();

  const [form, setForm] = useState({
    name: user?.displayName || '',
    role: 'Designer',
    industry: 'Tech',
    experience: 'Junior'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMode('personal');
    setUserContext(form);

    dispatch({
      type: 'SELECT_ROLE',
      payload: {
        id: 'personal-user',
        name: form.name,
        title: `${form.role} - ${form.industry}`,
        pronoun: 'You',
        color: '#00D4FF',
        gradient: 'linear-gradient(135deg, #00D4FF 0%, #0066CC 100%)',
        bgClass: 'bg-identity-male',
        description: `A ${form.experience} ${form.role} navigating real-world bias in ${form.industry}.`,
        locked: false
      }
    });

    navigate('/dashboard');
  };

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen pt-24 pb-16 px-6 bg-game-grid text-white flex justify-center">
        
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-xl">
          
          <div className="text-center mb-10">
            <StatBadge value="INIT" color="#C5A3FF" icon={<Settings size={14} />} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-display font-black uppercase text-game-shadow">
               PROFILE <span className="text-primary">SETUP</span>
            </h1>
            <p className="mt-4 text-white/50 font-display font-bold uppercase tracking-widest text-xs">
              System needs demographic parameters to generate reality
            </p>
          </div>

          <GameCard hover={false} className="p-8 border-4 border-gray-800 bg-[#0B0F1A]">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-xs font-display font-black uppercase tracking-widest text-[#00D4FF] mb-2">
                  Player Name
                </label>
                <input 
                  type="text" 
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-[#151928] border-4 border-[#1f2937] p-4 text-white font-display font-bold rounded-xl focus:outline-none focus:border-[#C5A3FF] transition-colors shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-display font-black uppercase tracking-widest text-[#00D4FF] mb-2">
                  Career Role
                </label>
                <select 
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  className="w-full bg-[#151928] border-4 border-[#1f2937] p-4 text-white font-display font-bold rounded-xl focus:outline-none focus:border-[#C5A3FF] transition-colors appearance-none shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"
                >
                  <option>Software Engineer</option>
                  <option>Designer</option>
                  <option>Product Manager</option>
                  <option>Operations Specialist</option>
                  <option>Sales Representative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-display font-black uppercase tracking-widest text-[#00D4FF] mb-2">
                  Industry / Field
                </label>
                <select 
                  value={form.industry}
                  onChange={e => setForm({...form, industry: e.target.value})}
                  className="w-full bg-[#151928] border-4 border-[#1f2937] p-4 text-white font-display font-bold rounded-xl focus:outline-none focus:border-[#C5A3FF] transition-colors appearance-none shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"
                >
                  <option>Tech</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Creative/Agency</option>
                  <option>Education</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-display font-black uppercase tracking-widest text-[#00D4FF] mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Junior', 'Mid-Level', 'Senior'].map(lvl => (
                    <div 
                      key={lvl}
                      onClick={() => setForm({...form, experience: lvl})}
                      className={`cursor-pointer p-4 text-center rounded-xl border-4 font-display font-black uppercase transition-all
                        ${form.experience === lvl ? 'bg-cyan/20 border-cyan text-cyan scale-105 shadow-game' : 'bg-[#151928] border-gray-800 text-white/40'}`}
                    >
                      {lvl}
                    </div>
                  ))}
                </div>
              </div>

              <GameButton variant="primary" size="xl" type="submit" className="w-full mt-8">
                GENERATE WORLD
              </GameButton>
            </form>
          </GameCard>
          
        </motion.div>
      </div>
    </PageWrapper>
  );
}
