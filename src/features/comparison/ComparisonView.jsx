import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import OutcomeCard from './OutcomeCard';
import SplitScreen from '../../components/effects/SplitScreen';
import { useApp } from '../../context/AppContext';
import { useScenarioEngine } from '../../hooks/useScenarioEngine';
import { useBiasEngine } from '../../hooks/useBiasEngine';
import scenariosData from '../../data/scenarios.json';
import Badge from '../../components/ui/Badge';
import { ArrowRight } from 'lucide-react';

export default function ComparisonView({ roleIdA = 'male-manager', roleIdB = 'female-employee' }) {
  const { state } = useApp();
  const getScenarios = useScenarioEngine();
  const { getComparison } = useBiasEngine();
  const scenarios = getScenarios();
  const { completedScenarios } = state;

  const playedScenarios = scenarios.filter((scenario) => completedScenarios.includes(scenario.id));
  const displayScenarios = playedScenarios.length > 0 ? playedScenarios : scenarios;

  const [activeScenarioId, setActiveScenarioId] = useState(displayScenarios[0]?.id);
  const [compareRoleA, setCompareRoleA] = useState(roleIdA);
  const [compareRoleB, setCompareRoleB] = useState(roleIdB);

  useEffect(() => setCompareRoleA(roleIdA), [roleIdA]);
  useEffect(() => setCompareRoleB(roleIdB), [roleIdB]);
  useEffect(() => {
    if (!displayScenarios.find((scenario) => scenario.id === activeScenarioId)) {
      setActiveScenarioId(displayScenarios[0]?.id);
    }
  }, [displayScenarios, activeScenarioId]);

  const activeScenario = displayScenarios.find((scenario) => scenario.id === activeScenarioId);
  const comparison = activeScenario ? getComparison(activeScenario.id, compareRoleA, compareRoleB) : null;
  const roleA = comparison?.roleA || scenariosData.roles.find((role) => role.id === compareRoleA);
  const roleB = comparison?.roleB || scenariosData.roles.find((role) => role.id === compareRoleB);
  const outcomeA = comparison?.outcomeA;
  const outcomeB = comparison?.outcomeB;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 flex-wrap">
        {displayScenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenarioId(scenario.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-display transition-all duration-200"
            style={{
              background: activeScenarioId === scenario.id ? 'rgba(197,163,255,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeScenarioId === scenario.id ? '#C5A3FF' : 'rgba(255,255,255,0.4)',
              border: `1px solid ${activeScenarioId === scenario.id ? 'rgba(197,163,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="px-4 py-3 border-b border-white/5 flex flex-wrap items-center gap-3">
        <div>
          <div className="text-xs font-display font-semibold text-white">{activeScenario?.title}</div>
          <div className="text-[10px] text-white/40">{activeScenario?.time} - {activeScenario?.description}</div>
        </div>
        <Badge variant="ghost" className="ml-auto">{activeScenario?.type}</Badge>
      </div>

      <div className="px-4 py-3 border-b border-white/5 grid sm:grid-cols-2 gap-3">
        <select
          value={compareRoleA}
          onChange={(event) => setCompareRoleA(event.target.value)}
          className="bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-xs font-display font-bold text-white"
        >
          {scenariosData.roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name} - {role.title}</option>
          ))}
        </select>
        <select
          value={compareRoleB}
          onChange={(event) => setCompareRoleB(event.target.value)}
          className="bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-xs font-display font-bold text-white"
        >
          {scenariosData.roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name} - {role.title}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-hidden">
        <SplitScreen
          leftColor={roleA?.color}
          rightColor={roleB?.color}
          leftLabel={`${roleA?.name}'s Reality`}
          rightLabel={`${roleB?.name}'s Reality`}
          leftContent={
            <div className="p-4">
              {outcomeA && <OutcomeCard outcome={outcomeA} role={roleA} isReference />}
            </div>
          }
          rightContent={
            <div className="p-4">
              {outcomeB && <OutcomeCard outcome={outcomeB} role={roleB} />}
            </div>
          }
        />
      </div>

      {outcomeA && outcomeB && outcomeA.biasLevel !== outcomeB.biasLevel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 border-t border-white/5 flex items-center justify-between flex-wrap gap-2"
          style={{ background: 'rgba(255,77,109,0.03)' }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-xs font-display text-white/40">Same workday pressure:</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-display font-semibold" style={{ color: roleA?.color }}>
                {outcomeA.biasLevel}% bias
              </span>
              <ArrowRight size={12} className="text-white/20" />
              <span className="text-xs font-display font-semibold" style={{ color: roleB?.color }}>
                {outcomeB.biasLevel}% bias
              </span>
            </div>
          </div>
          <div
            className="text-xs font-display px-2 py-1 rounded-lg"
            style={{ background: 'rgba(255,77,109,0.1)', color: '#FF4D6D' }}
          >
            +{Math.abs(outcomeB.biasLevel - outcomeA.biasLevel)}% disparity
          </div>
        </motion.div>
      )}
    </div>
  );
}
