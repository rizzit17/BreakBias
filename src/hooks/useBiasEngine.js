import { useApp } from '../context/AppContext';
import { useScenarioEngine } from './useScenarioEngine';
import scenariosData from '../data/scenarios.json';

export function useBiasEngine() {
  const { state, dispatch } = useApp();
  const getScenarios = useScenarioEngine();
  
  const { 
    selectedRole,
    biasHistory, 
    emotionalScore, 
    visibilityScore, 
    confidenceScore, 
    totalBiasEvents, 
    interruptionCount 
  } = state;

  const scenarios = getScenarios();
  const roleId = selectedRole?.id;

  // Get outcome for current role on a scenario
  function getOutcome(scenario) {
    if (!roleId || !scenario) return null;
    const outcomes = scenario.outcomes || scenario.identityOutcomes;
    if (!outcomes) return null;
    return outcomes[roleId] || null;
  }

  // Calculate overall bias severity (0-100)
  function getBiasSeverity() {
    if (biasHistory.length === 0) return 0;
    const total = biasHistory.reduce((sum, e) => sum + e.biasLevel, 0);
    return Math.round(total / biasHistory.length);
  }

  // Get bias narrative label
  function getBiasNarrative() {
    const severity = getBiasSeverity();
    if (severity === 0) return { label: 'Equitable', color: '#00D4FF' };
    if (severity < 30) return { label: 'Mild Bias', color: '#C5A3FF' };
    if (severity < 60) return { label: 'Moderate Bias', color: '#FF6B9D' };
    if (severity < 85) return { label: 'Severe Bias', color: '#FF4D6D' };
    return { label: 'Systemic Bias', color: '#FF1744' };
  }

  // Complete a scenario and record bias
  function completeScenario(scenarioId, outcomeOverride = null) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    const outcome = outcomeOverride || getOutcome(scenario);
    if (!outcome) return;

    dispatch({
      type: 'COMPLETE_SCENARIO',
      payload: {
        scenarioId,
        biasLevel: outcome.biasLevel || 0,
        biasType: outcome.biasType || scenario.biasMechanism || null,
        biasLabel: outcome.biasLabel || null,
      }
    });

    if (outcome.biasLevel > 40) {
      dispatch({
        type: 'TRIGGER_BIAS_FLASH',
        payload: {
          biasType: outcome.biasType || scenario.biasMechanism,
          biasLabel: outcome.biasLabel,
          biasLevel: outcome.biasLevel,
        }
      });
      setTimeout(() => dispatch({ type: 'CLEAR_BIAS_FLASH' }), 3000);
    }
  }

  // Get comparative data between two roles for same scenario
  function getComparison(scenarioId, roleIdA, roleIdB) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return null;
    const outcomes = scenario.outcomes || scenario.identityOutcomes;
    return {
      scenario,
      outcomeA: outcomes?.[roleIdA],
      outcomeB: outcomes?.[roleIdB],
      roleA: scenariosData.roles.find(r => r.id === roleIdA),
      roleB: scenariosData.roles.find(r => r.id === roleIdB),
    };
  }

  // Emotional state label
  function getEmotionalState() {
    if (emotionalScore > 80) return { label: 'Confident', icon: '✦', color: '#00D4FF' };
    if (emotionalScore > 60) return { label: 'Uncertain', icon: '◈', color: '#C5A3FF' };
    if (emotionalScore > 40) return { label: 'Frustrated', icon: '⊘', color: '#FF6B9D' };
    if (emotionalScore > 20) return { label: 'Defeated', icon: '◌', color: '#FF4D6D' };
    return { label: 'Exhausted', icon: '✕', color: '#FF1744' };
  }

  return {
    roleId,
    biasHistory,
    emotionalScore,
    visibilityScore,
    confidenceScore,
    totalBiasEvents,
    interruptionCount,
    getOutcome,
    getBiasSeverity,
    getBiasNarrative,
    completeScenario,
    getComparison,
    getEmotionalState,
    scenarios: scenarios,
    allRoles: scenariosData.roles,
    biasTypes: scenariosData.biasTypes,
    interventions: scenariosData.interventions,
  };
}
