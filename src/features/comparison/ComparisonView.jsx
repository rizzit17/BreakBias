import { motion } from 'framer-motion';
import { useState } from 'react';
import OutcomeCard from './OutcomeCard';
import SplitScreen from '../../components/effects/SplitScreen';
import scenariosData from '../../data/scenarios.json';
import Badge from '../../components/ui/Badge';
import { ArrowRight } from 'lucide-react';

export default function ComparisonView({ roleIdA = 'male-manager', roleIdB = 'female-employee' }) {
  const [activeScenarioId, setActiveScenarioId] = useState(scenariosData.scenarios[0].id);
  const activeScenario = scenariosData.scenarios.find(s => s.id === activeScenarioId);
  const roleA = scenariosData.roles.find(r => r.id === roleIdA);
  const roleB = scenariosData.roles.find(r => r.id === roleIdB);
  const outcomeA = activeScenario?.identityOutcomes?.[roleIdA];
  const outcomeB = activeScenario?.identityOutcomes?.[roleIdB];

  return (
    <div className="h-full flex flex-col">
      {/* Scenario tabs */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 flex-wrap">
        {scenariosData.scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScenarioId(s.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-display transition-all duration-200"
            style={{
              background: activeScenarioId === s.id ? 'rgba(197,163,255,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeScenarioId === s.id ? '#C5A3FF' : 'rgba(255,255,255,0.4)',
              border: `1px solid ${activeScenarioId === s.id ? 'rgba(197,163,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Scenario context */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <div>
          <div className="text-xs font-display font-semibold text-white">{activeScenario?.title}</div>
          <div className="text-[10px] text-white/40">{activeScenario?.time} · {activeScenario?.description}</div>
        </div>
        <Badge variant="ghost" className="ml-auto">{activeScenario?.type}</Badge>
      </div>

      {/* Split comparison */}
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

      {/* Delta summary */}
      {outcomeA && outcomeB && (outcomeA.biasLevel !== outcomeB.biasLevel) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 border-t border-white/5 flex items-center justify-between"
          style={{ background: 'rgba(255,77,109,0.03)' }}
        >
          <div className="flex items-center gap-3">
            <div className="text-xs font-display text-white/40">Same action →</div>
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
          <div className="text-xs font-display px-2 py-1 rounded-lg"
            style={{ background: 'rgba(255,77,109,0.1)', color: '#FF4D6D' }}>
            +{Math.abs(outcomeB.biasLevel - outcomeA.biasLevel)}% disparity
          </div>
        </motion.div>
      )}
    </div>
  );
}
