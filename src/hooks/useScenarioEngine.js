import { useMode } from '../context/ModeContext';
import staticData from '../data/scenarios.json';

export function useScenarioEngine() {
  const { mode, personalSession } = useMode();

  return function getScenarios() {
    if (mode === 'simulation') {
      return staticData.scenarios;
    }
    return Array.isArray(personalSession?.scenarios) ? personalSession.scenarios : [];
  };
}
