import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import GameCard from '../components/ui/GameCard';
import GameButton from '../components/ui/GameButton';
import AvatarMorph from '../components/effects/AvatarMorph';
import StatBadge from '../components/ui/StatBadge';
import { useApp } from '../context/AppContext';
import { useScenarioEngine } from '../hooks/useScenarioEngine';
import { useMode } from '../context/ModeContext';
import { generatePersonalScenario } from '../services/personalModeAI';
import { generateUserScenario } from '../data/userScenarios';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const EMAIL_PREVIEWS = {
  'male-manager': [{ from: 'Mark D.', text: 'Q3 Review — Exceptional Performance', unread: true, color: '#00D4FF' }],
  'female-employee': [{ from: 'Mark D.', text: 'Q3 Review — Performance Notes', unread: true, color: '#FF4D6D' }],
  'intern': [{ from: 'HR Team', text: 'Internship Check-In', unread: true, color: '#9B59B6' }],
};

const CHAT_MSGS = {
  'male-manager': [{ sender: 'Mark', text: 'Alex, great job on the presentation!' }],
  'female-employee': [{ sender: 'David', text: 'What Sarah is trying to say is...' }],
  'intern': [{ sender: 'Mark', text: 'Let\'s table that for the senior team.' }],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useApp();
  const { mode, userContext, personalSession, setPersonalSession } = useMode();
  const getScenarios = useScenarioEngine();
  const { selectedRole, completedScenarios } = state;
  const isPersonalMode = mode === 'personal';
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);
  const [aiError, setAiError] = useState('');

  if (!selectedRole) {
    navigate(isPersonalMode ? '/setup' : '/role-select');
    return null;
  }

  const emails = isPersonalMode
    ? [{ from: `${userContext?.industry || 'Work'} Ops`, text: `Action Required: ${userContext?.role || 'Contributor'} Ownership Notes`, unread: true, color: '#00D4FF' }]
    : (EMAIL_PREVIEWS[selectedRole.id] || []);
  const chats = isPersonalMode
    ? [{ sender: 'Team Lead', text: `@${userContext?.name || 'You'} please share your approach for this scenario.` }]
    : (CHAT_MSGS[selectedRole.id] || []);
  const scenarios = getScenarios();
  const currentScenarioIndex = completedScenarios.length;

  useEffect(() => {
    if (!isPersonalMode || isGeneratingScenario) return;
    if (currentScenarioIndex < scenarios.length) return;

    let cancelled = false;
    async function hydrateNextScenario() {
      try {
        setIsGeneratingScenario(true);
        setAiError('');
        const response = await generatePersonalScenario({
          userContext,
          history: personalSession?.evaluations || [],
          stageIndex: currentScenarioIndex
        });
        if (cancelled) return;
        const scenario = response?.scenario;
        if (!scenario) throw new Error('No scenario returned');

        setPersonalSession(prev => ({
          ...prev,
          scenarios: [...(prev?.scenarios || []), scenario]
        }));
      } catch (error) {
        if (!cancelled) {
          setAiError(error?.message || 'Unable to generate your personalized scenario right now.');
        }
      } finally {
        // Always release loading flag.
        // In React StrictMode, cleanup can run before async completion; gating this on
        // `cancelled` can leave the UI permanently stuck in "Generating scenario...".
        setIsGeneratingScenario(false);
      }
    }

    hydrateNextScenario();
    return () => {
      cancelled = true;
    };
  }, [
    isPersonalMode,
    currentScenarioIndex,
    scenarios.length,
    userContext,
    personalSession?.evaluations,
    setPersonalSession
  ]);

  const noScenarioReady = isPersonalMode && currentScenarioIndex >= scenarios.length;
  const showFallbackAction = isPersonalMode && noScenarioReady && !isGeneratingScenario;

  return (
    <PageWrapper ambientOrbs={false}>
      <div className="min-h-screen pt-24 pb-16 px-6 bg-game-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

          {/* Main Stage Panel */}
          <div className="col-span-12 md:col-span-8 space-y-8">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <GameCard className="p-8 border-4 !border-primary/50 relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

                <div className="relative z-10">
                  <StatBadge value="Main Quest" label="Active" color="#C5A3FF" pulse className="mb-6" />
                  <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase text-game-shadow mb-4">
                    Stage {currentScenarioIndex + 1}: The {scenarios[currentScenarioIndex]?.type || 'Day'}
                  </h1>
                  <p className="text-white/60 font-display text-lg mb-8 max-w-xl">
                    {noScenarioReady
                      ? 'Generating your next personalized scenario based on your role, company context, and prior decisions.'
                      : `${scenarios[currentScenarioIndex]?.title || 'Prepare for your next encounter.'}. Equip your stats and enter the boardroom.`}
                  </p>

                  {aiError && (
                    <p className="text-accent font-display font-bold text-sm mb-4">{aiError}</p>
                  )}

                  <GameButton
                    variant="primary"
                    size="xl"
                    onClick={() => navigate(`/scenario/${currentScenarioIndex}`)}
                    className="w-full sm:w-auto"
                    disabled={noScenarioReady}
                  >
                    {noScenarioReady ? (isGeneratingScenario ? 'GENERATING SCENARIO...' : 'PREPARING NEXT STAGE') : 'ENTER STAGE'}
                  </GameButton>

                  {showFallbackAction && (
                    <button
                      type="button"
                      onClick={() => {
                        const fallbackPool = generateUserScenario(userContext);
                        const localScenario = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
                        setPersonalSession(prev => ({
                          ...prev,
                          scenarios: [...(prev?.scenarios || []), localScenario]
                        }));
                        setAiError('');
                      }}
                      className="block mt-4 text-xs font-display font-bold text-cyan underline underline-offset-4"
                    >
                      USE OFFLINE FALLBACK SCENARIO
                    </button>
                  )}
                </div>

                <div className="absolute right-0 bottom-0 opacity-30 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                  <MapPin size={200} color="#C5A3FF" />
                </div>
              </GameCard>
            </motion.div>

            {/* Stage Map / Levels */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-display font-black text-white uppercase mb-4 pl-2 drop-shadow-md">
                Quest Map
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {scenarios.map((s, i) => {
                  const isCompleted = completedScenarios.includes(s.id);
                  const isCurrent = currentScenarioIndex === i;
                  const isLocked = !isCompleted && !isCurrent;

                  return (
                    <GameCard
                      key={s.id}
                      hover={isCurrent}
                      className={`p-5 flex items-center gap-4 border-2 ${isLocked ? 'grayscale opacity-50 bg-black/50 border-white/5' : isCurrent ? 'border-primary' : 'border-cyan/50'}`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-display font-black text-xl border-2
                          ${isCompleted ? 'bg-cyan/20 border-cyan text-cyan' : isCurrent ? 'bg-primary/20 border-primary text-primary shadow-neon-primary' : 'bg-white/5 border-white/10 text-white/30'}
                        `}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-display font-bold text-white uppercase">{s.title}</h3>
                        <span className="text-xs font-display text-white/50 uppercase font-bold tracking-widest">{isCompleted ? 'CLEAR' : isLocked ? 'LOCKED' : 'READY'}</span>
                      </div>
                    </GameCard>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Modules */}
          <div className="col-span-12 md:col-span-4 space-y-6">

            {/* Player Stats */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <GameCard className="p-6 bg-card-dark border-2 border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <AvatarMorph roleId={selectedRole.id} size={64} />
                  <div>
                    <h3 className="text-xl font-display font-black text-white uppercase">{selectedRole.name}</h3>
                    <StatBadge value={selectedRole.title} color={selectedRole.color} />
                  </div>
                </div>
              </GameCard>
            </motion.div>

            {/* Comms (Email / Chat) */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <GameCard className="p-0 overflow-hidden bg-card-dark border-2 border-white/10">
                <div className="bg-[#0B0F1A] px-4 py-3 border-b-2 border-white/10 flex items-center gap-2">
                  <Mail size={16} className="text-cyan" />
                  <span className="text-xs font-display font-black text-cyan uppercase tracking-widest">Inbox</span>
                </div>
                {emails.map((email, i) => (
                  <div key={i} className="px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan"></div>
                    <div className="text-sm font-display font-bold text-white/90 truncate pl-2">{email.text}</div>
                    <div className="text-xs font-display text-white/40 uppercase font-bold mt-1 pl-2">From: {email.from}</div>
                  </div>
                ))}
              </GameCard>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <GameCard className="p-0 overflow-hidden bg-card-dark border-2 border-white/10">
                <div className="bg-[#0B0F1A] px-4 py-3 border-b-2 border-white/10 flex items-center gap-2">
                  <MessageSquare size={16} className="text-pink-400" />
                  <span className="text-xs font-display font-black text-pink-400 uppercase tracking-widest">Team Chat</span>
                </div>
                {chats.map((msg, i) => (
                  <div key={i} className="p-4 hover:bg-white/5 transition-colors cursor-pointer relative">
                    <div className="text-xs font-display text-white/40 uppercase font-bold mb-1">{msg.sender}</div>
                    <div className="text-sm font-display font-bold text-white/90 bg-black/50 p-3 rounded-lg border border-white/10 inline-block">{msg.text}</div>
                  </div>
                ))}
              </GameCard>
            </motion.div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
