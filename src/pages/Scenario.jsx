import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MeetingUI from '../features/scenario/MeetingUI';
import EmailUI from '../features/scenario/EmailUI';
import ChatUI from '../features/scenario/ChatUI';
import BiasReveal from '../features/bias/BiasReveal';
import GameCard from '../components/ui/GameCard';
import GameButton from '../components/ui/GameButton';
import FloatingFeedback from '../components/effects/FloatingFeedback';
import { useApp } from '../context/AppContext';
import { useScenarioEngine } from '../hooks/useScenarioEngine';
import { useBiasEngine } from '../hooks/useBiasEngine';
import { useMode } from '../context/ModeContext';
import { evaluatePersonalResponse } from '../services/personalModeAI';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function Scenario() {
  const { index } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const { mode, userContext, personalSession, setPersonalSession } = useMode();
  const getScenarios = useScenarioEngine();
  const { selectedRole } = state;
  const { getOutcome, completeScenario } = useBiasEngine();
  const isPersonalMode = mode === 'personal';

  const scenariosList = getScenarios();
  const scenarioIndex = parseInt(index || '0', 10);
  const scenario = scenariosList[scenarioIndex];
  const totalScenarios = scenariosList.length;

  const [revealed, setRevealed] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [personalAction, setPersonalAction] = useState('');
  const [personalOutcome, setPersonalOutcome] = useState(null);
  const [personalJudgement, setPersonalJudgement] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiError, setAiError] = useState('');

  if (!selectedRole || !scenario) {
    navigate(selectedRole ? '/dashboard' : (isPersonalMode ? '/setup' : '/role-select'));
    return null;
  }

  const baseOutcome = getOutcome(scenario);
  const outcome = isPersonalMode ? (personalOutcome || baseOutcome) : baseOutcome;
  const biasLevel = outcome?.biasLevel || 0;
  const hasBias = biasLevel > 20;

  useEffect(() => {
    setRevealed(false);
    setPersonalAction('');
    setPersonalOutcome(null);
    setPersonalJudgement(null);
    setAiError('');
  }, [scenario?.id]);

  function spawnFeedback(text, type, delay = 0) {
    setTimeout(() => {
      setFeedbacks(prev => [
        ...prev, 
        { id: Math.random(), text, type, x: `${40 + Math.random() * 20}%`, y: `${30 + Math.random() * 20}%` }
      ]);
    }, delay);
  }

  async function handleReveal() {
    if (isPersonalMode && personalAction.trim().length < 12) return;
    let resolvedOutcome = isPersonalMode ? (personalOutcome || baseOutcome) : outcome;
    if (isPersonalMode) {
      try {
        setIsEvaluating(true);
        setAiError('');
        const result = await evaluatePersonalResponse({
          userContext,
          scenario,
          responseText: personalAction,
          history: personalSession?.evaluations || []
        });

        const evaluation = result?.evaluation;
        if (!evaluation) throw new Error('No evaluation returned');

        const nextOutcome = {
          content: `You responded: "${personalAction}"\n\n${evaluation.outcomeText}`,
          biasLevel: evaluation.biasLevel,
          biasType: evaluation.biasType || scenario.biasMechanism || null,
          biasLabel: evaluation.biasLabel || 'Scenario Outcome'
        };

        resolvedOutcome = nextOutcome;
        setPersonalOutcome(nextOutcome);
        setPersonalJudgement(evaluation);
      } catch (error) {
        setAiError(error?.message || 'AI judgement failed. Please retry.');
      } finally {
        setIsEvaluating(false);
      }
    }

    const resolvedBiasLevel = resolvedOutcome?.biasLevel ?? (isPersonalMode ? 40 : biasLevel);
    setRevealed(true);

    if (resolvedBiasLevel > 20) {
      spawnFeedback(`${resolvedBiasLevel} BIAS DMG`, 'negative');
      spawnFeedback('CONF XP LOST', 'negative', 400);
    } else {
      spawnFeedback('XP GAINED', 'positive');
    }
  }

  function handleComplete() {
    if (isPersonalMode) {
      setPersonalSession(prev => ({
        ...prev,
        evaluations: [
          ...(prev?.evaluations || []),
          {
            scenarioId: scenario.id,
            responseText: personalAction,
            judgement: personalJudgement,
            outcome: personalOutcome,
            createdAt: Date.now()
          }
        ]
      }));
    }

    completeScenario(scenario.id, isPersonalMode ? (personalOutcome || baseOutcome) : null);
    const isLast = scenarioIndex >= totalScenarios - 1;
    setTimeout(() => {
      if (isLast) navigate('/summary');
      else navigate(`/scenario/${scenarioIndex + 1}`);
    }, 600);
  }

  const TypeUI = { meeting: MeetingUI, email: EmailUI, chat: ChatUI }[scenario.type];

  return (
    <PageWrapper ambientOrbs={false}>
      <FloatingFeedback messages={feedbacks} />

      <div className="min-h-screen pt-24 pb-16 px-6 bg-[#070A13]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Level Header */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full flex justify-between items-end mb-8 border-b-4 border-white/5 pb-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="w-12 h-12 bg-card-dark border-2 border-white/10 hover:border-white/30 rounded-xl flex items-center justify-center transition-colors shadow-game">
                 <ArrowLeft size={20} className="text-white/50" />
              </button>
              <div>
                <div className="text-xs font-display font-black text-cyan uppercase tracking-widest bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20 inline-block mb-1">
                  STAGE {scenarioIndex + 1}/{totalScenarios}
                </div>
                <h1 className="text-3xl font-display font-black text-white uppercase text-game-shadow">{scenario.title}</h1>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-display font-bold text-white/30 uppercase tracking-widest mb-1">Objective</div>
              <div className="text-sm font-display font-bold text-primary">{scenario.description}</div>
            </div>
          </motion.div>

          {/* Playable UI Area */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full mb-8 relative">
            <GameCard className="p-0 overflow-hidden border-4 border-gray-800 bg-[#0B0F1A]">
              {/* Fake Window Header */}
              <div className="h-8 bg-gray-900 border-b-2 border-gray-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-accent border-[1px] border-[#900021]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border-[1px] border-yellow-700"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border-[1px] border-green-700"></div>
                <div className="ml-4 text-[10px] font-display font-bold text-white/30 uppercase tracking-widest">
                  Terminal // {scenario.type}
                </div>
              </div>

              {/* Injected Minigame UI */}
              <div className="p-6 h-[400px] overflow-y-auto">
                {TypeUI && <TypeUI outcome={outcome} roleId={selectedRole.id} biasActive={revealed && hasBias} />}
              </div>
            </GameCard>
          </motion.div>

          {isPersonalMode && !revealed && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full mb-6">
              <GameCard className="p-5 border-2 border-cyan/30 bg-[#0F1628]">
                <div className="text-xs font-display font-black tracking-widest uppercase text-cyan mb-2">
                  Your Move
                </div>
                <div className="text-sm font-display font-bold text-white/80 mb-3">
                  {scenario.personalPrompt || 'Describe how you would respond in this scenario.'}
                </div>
                <textarea
                  value={personalAction}
                  onChange={(e) => setPersonalAction(e.target.value)}
                  placeholder="Type your real response here..."
                  className="w-full min-h-[96px] bg-[#0B0F1A] border-2 border-white/10 rounded-lg p-3 text-sm text-white/90 font-display focus:outline-none focus:border-cyan/50"
                />
                <div className="mt-3">
                  <div className="text-[11px] font-display font-black uppercase tracking-widest text-white/50">
                    AI will evaluate your response for clarity, assertiveness, boundary-setting, and bias exposure risk.
                  </div>
                  {aiError && <div className="text-xs text-accent font-display font-bold mt-2">{aiError}</div>}
                </div>
              </GameCard>
            </motion.div>
          )}

          {/* Reveal & Progression */}
          <div className="w-full flex flex-col items-center">
            
            <AnimatePresence>
              {revealed && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full mb-8">
                  <BiasReveal scenario={scenario} />
                  
                  {outcome?.content && (
                    <div className="mt-4 p-6 bg-[#151928] border-l-4 border-primary shadow-game text-white/80 font-medium font-display leading-relaxed">
                      {outcome.content}
                    </div>
                  )}

                  {isPersonalMode && personalJudgement?.judgement && (
                    <div className="mt-4 p-5 bg-[#0B0F1A] border-2 border-cyan/20 rounded-xl">
                      <div className="text-xs font-display font-black uppercase tracking-widest text-cyan mb-3">
                        AI Judgement
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm font-display font-bold text-white/80">
                        <div>Communication: {personalJudgement.judgement.communication}/100</div>
                        <div>Assertiveness: {personalJudgement.judgement.assertiveness}/100</div>
                        <div>Boundary Setting: {personalJudgement.judgement.boundarySetting}/100</div>
                        <div>Clarity: {personalJudgement.judgement.clarity}/100</div>
                        <div>Bias Exposure Risk: {personalJudgement.judgement.biasExposureRisk}/100</div>
                      </div>
                      {Array.isArray(personalJudgement?.suggestions) && personalJudgement.suggestions.length > 0 && (
                        <div className="mt-3 text-xs font-display text-white/70">
                          {personalJudgement.suggestions.map((item, idx) => (
                            <div key={idx}>- {item}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full h-[60px] flex justify-center items-center">
              <AnimatePresence mode="wait">
                {!revealed ? (
                  <motion.div key="action" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0, opacity: 0 }}>
                    <GameButton
                      variant="primary"
                      size="xl"
                      onClick={handleReveal}
                      className="px-16 animate-pulse"
                      disabled={isEvaluating || (isPersonalMode && personalAction.trim().length < 12)}
                    >
                      {isEvaluating ? 'EVALUATING WITH AI...' : 'EXECUTE ACTION'}
                    </GameButton>
                  </motion.div>
                ) : (
                  <motion.div key="next" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <GameButton variant="cyan" size="lg" onClick={handleComplete} icon={<ChevronRight />} iconPosition="right">
                      {scenarioIndex >= totalScenarios - 1 ? 'COMPLETE MISSION' : 'NEXT STAGE'}
                    </GameButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
