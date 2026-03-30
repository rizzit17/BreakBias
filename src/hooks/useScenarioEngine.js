import { useMode } from '../context/ModeContext';
import staticData from '../data/scenarios.json';
import { generateUserScenario } from '../data/userScenarios';

export function useScenarioEngine() {
  const { mode, userContext } = useMode();

  return function getScenarios() {
    if (mode === 'simulation') {
      return staticData.scenarios;
    } else {
      return generateUserScenario(userContext);
    }
  };
}
