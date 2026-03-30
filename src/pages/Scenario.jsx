import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MeetingUI from '../features/scenario/MeetingUI';
import EmailUI from '../features/scenario/EmailUI';
import ChatUI from '../features/scenario/ChatUI';
import BiasReveal from '../features/bias/BiasReveal';
import GlitchEffect from '../components/effects/GlitchEffect';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { useBiasEngine } from '../hooks/useBiasEngine';
import { Clock, ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import scenariosData from '../data/scenarios.json';

export default function Scenario() {
  const { index } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const { selectedRole } = state;
  const { getOutcome, completeScenario } = useBiasEngine();

  const scenarioIndex = parseInt(index || '0', 10);
  const scenario = scenariosData.scenarios[scenarioIndex];
  const totalScenarios = scenariosData.scenarios.length;

  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [biasActive, setBiasActive] = useState(false);

  if (!selectedRole || !scenario) {
    navigate(selectedRole ? '/dashboard' : '/role-select');
    return null;
  }

  const outcome = getOutcome(scenario);
  const biasLevel = outcome?.biasLevel || 0;
  const hasBias = biasLevel > 20;

  function handleReveal() {
    setRevealed(true);
    if (hasBias) setBiasActive(true);
  }

  function handleComplete() {
    completeScenario(scenario.id);
    setCompleted(true);
    const isLast = scenarioIndex >= totalScenarios - 1;
    setTimeout(() => {
      if (isLast) navigate('/summary');
      else navigate(`/scenario/${scenarioIndex + 1}`);
    }, 600);
  }

  const typeLabels = { meeting: 'Meeting', email: 'Email', chat: 'Team Chat' };
  const TypeUI = { meeting: MeetingUI, email: EmailUI, chat: ChatUI }[scenario.type];

  return (
    <PageWrapper>
      {/* Bias UI distortion overlay */}
      <AnimatePresence>
        {biasActive && hasBias && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-30"
            style={{
              background: biasLevel > 80
                ? 'radial-gradient(ellipse at center, rgba(255,77,109,0.04) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at center, rgba(197,163,255,0.03) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Scenario header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')}
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft size={16} className="text-white/50" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge variant="ghost">{typeLabels[scenario.type]}</Badge>
                  <Badge variant="ghost">{scenarioIndex + 1} of {totalScenarios}</Badge>
                  <span className="text-xs text-white/30 font-display flex items-center gap-1">
                    <Clock size={10} />{scenario.time}
                  </span>
                </div>
                <h1 className="text-xl font-display font-bold text-white">{scenario.title}</h1>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-32 h-1 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full" style={{
                width: `${((scenarioIndex + 1) / totalScenarios) * 100}%`,
                background: `linear-gradient(90deg, ${selectedRole.color}, #C5A3FF)`,
              }} />
            </div>
          </motion.div>

          {/* Scenario context */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 rounded-2xl px-5 py-4 glass"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p className="text-sm text-white/50">{scenario.description}</p>
          </motion.div>

          {/* UI Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <GlitchEffect active={biasActive && biasLevel > 70} intensity="medium">
              {TypeUI && (
                <TypeUI
                  outcome={outcome}
                  roleId={selectedRole.id}
                  biasActive={biasActive}
                />
              )}
            </GlitchEffect>
          </motion.div>

          {/* Bias split effect overlay when bias is very high */}
          <AnimatePresence>
            {biasActive && biasLevel > 85 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 rounded-2xl px-5 py-4 overflow-hidden"
                style={{ background: 'rgba(255,77,109,0.06)', border: '1px solid rgba(255,77,109,0.2)' }}
              >
                <div className="flex items-center gap-2 text-accent mb-2">
                  <AlertTriangle size={14} />
                  <span className="text-xs font-display font-semibold uppercase tracking-widest">Systemic Bias Detected</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  This moment reflects a pattern documented across thousands of real workplaces.
                  The gap in treatment isn't accidental — it's structural.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reveal / Bias detail */}
          <AnimatePresence>
            {revealed && hasBias && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                <BiasReveal scenario={scenario} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Outcome text */}
          <AnimatePresence>
            {revealed && outcome?.content && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-2xl px-5 py-4 glass"
                style={{ border: `1px solid ${selectedRole.color}22` }}
              >
                <div className="text-[10px] font-display font-semibold uppercase tracking-widest mb-2" style={{ color: selectedRole.color }}>
                  What happened to {selectedRole.name}
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{outcome.content}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div>
              {!revealed && (
                <Button variant="ghost" size="md" onClick={handleReveal}>
                  Reveal what happened
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {revealed && !completed && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleComplete}
                  icon={<ChevronRight size={16} />}
                  iconPosition="right"
                >
                  {scenarioIndex >= totalScenarios - 1 ? 'View Summary' : 'Next Scenario'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
