import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

const initialState = {
  selectedRole: null,
  currentScenarioIndex: 0,
  completedScenarios: [],
  biasHistory: [],
  interventionMode: false,
  activeInterventions: [],
  emotionalScore: 100,
  totalBiasEvents: 0,
  interruptionCount: 0,
  visibilityScore: 100,
  confidenceScore: 100,
  phase: 'morning', // morning | midday | afternoon | end
  showBiasFlash: false,
  currentBiasEvent: null,
  comparisonUnlocked: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ROLE':
      return {
        ...state,
        selectedRole: action.payload,
        emotionalScore: 100,
        biasHistory: [],
        completedScenarios: [],
        currentScenarioIndex: 0,
        totalBiasEvents: 0,
        interruptionCount: 0,
        visibilityScore: 100,
        confidenceScore: 100,
        phase: 'morning',
      };

    case 'COMPLETE_SCENARIO': {
      const { scenarioId, biasLevel, biasType, biasLabel } = action.payload;
      const newBiasEvent = biasLevel > 0 ? {
        scenarioId,
        biasLevel,
        biasType,
        biasLabel,
        timestamp: Date.now(),
      } : null;

      const biasHistory = newBiasEvent
        ? [...state.biasHistory, newBiasEvent]
        : state.biasHistory;

      const emotionalDrop = biasLevel > 0 ? Math.floor(biasLevel / 4) : 0;
      const newEmotionalScore = Math.max(0, state.emotionalScore - emotionalDrop);
      const newVisibility = biasType === 'invisibility'
        ? Math.max(0, state.visibilityScore - 20)
        : state.visibilityScore;
      const newConfidence = biasLevel > 50
        ? Math.max(0, state.confidenceScore - Math.floor(biasLevel / 5))
        : state.confidenceScore;

      return {
        ...state,
        completedScenarios: [...state.completedScenarios, scenarioId],
        currentScenarioIndex: state.currentScenarioIndex + 1,
        biasHistory,
        emotionalScore: newEmotionalScore,
        visibilityScore: newVisibility,
        confidenceScore: newConfidence,
        totalBiasEvents: biasLevel > 0 ? state.totalBiasEvents + 1 : state.totalBiasEvents,
        interruptionCount: biasType === 'interruption' || biasType === 'mansplaining'
          ? state.interruptionCount + 1
          : state.interruptionCount,
        comparisonUnlocked: state.completedScenarios.length >= 1,
      };
    }

    case 'TRIGGER_BIAS_FLASH':
      return {
        ...state,
        showBiasFlash: true,
        currentBiasEvent: action.payload,
      };

    case 'CLEAR_BIAS_FLASH':
      return {
        ...state,
        showBiasFlash: false,
        currentBiasEvent: null,
      };

    case 'TOGGLE_INTERVENTION': {
      const interventionId = action.payload;
      const isActive = state.activeInterventions.includes(interventionId);
      return {
        ...state,
        activeInterventions: isActive
          ? state.activeInterventions.filter(id => id !== interventionId)
          : [...state.activeInterventions, interventionId],
        interventionMode: !isActive || state.activeInterventions.length > 1,
      };
    }

    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dualIdentityState', JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export default AppContext;
