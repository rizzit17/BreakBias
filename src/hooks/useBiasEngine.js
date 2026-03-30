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
    interruptionCount,
    activeInterventions
  } = state;

  const scenarios = getScenarios();
  const roleId = selectedRole?.id;

  function applyInterventionsToOutcome(scenario, outcome) {
    if (!scenario || !outcome) return outcome;

    const targetKeys = [
      outcome.biasType,
      scenario.biasMechanism,
      ...(scenario.corporatePressure || [])
    ]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    const matchedInterventions = scenariosData.interventions.filter((intervention) =>
      activeInterventions.includes(intervention.id) &&
      intervention.targets?.some((target) => targetKeys.includes(String(target).toLowerCase()))
    );

    const totalReduction = matchedInterventions.reduce((sum, intervention) => sum + (intervention.reduction || 0), 0);
    const reducedBiasLevel = Math.max(0, (outcome.biasLevel || 0) - totalReduction);

    return {
      ...outcome,
      originalBiasLevel: outcome.biasLevel || 0,
      biasLevel: reducedBiasLevel,
      interventionLift: totalReduction,
      interventionSummary: matchedInterventions.map((intervention) => intervention.title)
    };
  }

  function getOutcome(scenario) {
    if (!roleId || !scenario) return null;
    const outcomes = scenario.outcomes || scenario.identityOutcomes;
    if (!outcomes) return null;
    return applyInterventionsToOutcome(scenario, outcomes[roleId]);
  }

  function getBiasSeverity() {
    if (biasHistory.length === 0) return 0;
    const total = biasHistory.reduce((sum, event) => sum + event.biasLevel, 0);
    return Math.round(total / biasHistory.length);
  }

  function getBiasNarrative() {
    const severity = getBiasSeverity();
    if (severity === 0) return { label: 'Equitable', color: '#00D4FF' };
    if (severity < 30) return { label: 'Mild Bias', color: '#C5A3FF' };
    if (severity < 60) return { label: 'Moderate Bias', color: '#FF6B9D' };
    if (severity < 85) return { label: 'Severe Bias', color: '#FF4D6D' };
    return { label: 'Systemic Bias', color: '#FF1744' };
  }

  function getAccumulationIndex() {
    if (biasHistory.length === 0) return 0;
    return biasHistory.reduce((sum, event, index) => sum + (event.biasLevel * (index + 1)), 0);
  }

  function getCompoundDisadvantageLabel() {
    const accumulation = getAccumulationIndex();
    if (accumulation < 80) return { label: 'Low Carryover', color: '#00D4FF' };
    if (accumulation < 180) return { label: 'Compounding Friction', color: '#C5A3FF' };
    if (accumulation < 320) return { label: 'Career Drag', color: '#FF6B9D' };
    return { label: 'Systemic Compounding', color: '#FF1744' };
  }

  function getInvisibleLaborLoad() {
    return biasHistory.filter((event) => event.biasType === 'invisible-labor' || event.biasType === 'workload-imbalance').length;
  }

  function getInterventionImpactPreview() {
    return scenarios.reduce((sum, scenario) => {
      const outcome = getOutcome(scenario);
      if (!outcome) return sum;
      return sum + ((outcome.originalBiasLevel || outcome.biasLevel || 0) - (outcome.biasLevel || 0));
    }, 0);
  }

  function completeScenario(scenarioId, outcomeOverride = null) {
    const scenario = scenarios.find((item) => item.id === scenarioId);
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

  function getComparison(scenarioId, roleIdA, roleIdB) {
    const scenario = scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return null;
    const outcomes = scenario.outcomes || scenario.identityOutcomes;
    return {
      scenario,
      outcomeA: applyInterventionsToOutcome(scenario, outcomes?.[roleIdA]),
      outcomeB: applyInterventionsToOutcome(scenario, outcomes?.[roleIdB]),
      roleA: scenariosData.roles.find((role) => role.id === roleIdA),
      roleB: scenariosData.roles.find((role) => role.id === roleIdB),
    };
  }

  function getEmotionalState() {
    if (emotionalScore > 80) return { label: 'Confident', icon: '++', color: '#00D4FF' };
    if (emotionalScore > 60) return { label: 'Uncertain', icon: '<>', color: '#C5A3FF' };
    if (emotionalScore > 40) return { label: 'Frustrated', icon: '!!', color: '#FF6B9D' };
    if (emotionalScore > 20) return { label: 'Defeated', icon: '--', color: '#FF4D6D' };
    return { label: 'Exhausted', icon: 'xx', color: '#FF1744' };
  }

  return {
    roleId,
    biasHistory,
    emotionalScore,
    visibilityScore,
    confidenceScore,
    totalBiasEvents,
    interruptionCount,
    activeInterventions,
    getOutcome,
    getBiasSeverity,
    getBiasNarrative,
    getAccumulationIndex,
    getCompoundDisadvantageLabel,
    getInvisibleLaborLoad,
    getInterventionImpactPreview,
    completeScenario,
    getComparison,
    getEmotionalState,
    scenarios,
    allRoles: scenariosData.roles,
    biasTypes: scenariosData.biasTypes,
    interventions: scenariosData.interventions,
  };
}
