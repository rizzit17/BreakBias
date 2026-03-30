import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ModeContext = createContext();
const MODE_STORAGE_KEY = 'workdayReplay.modeContext';
const defaultUserContext = {
  name: '',
  gender: '',
  role: '',
  industry: '',
  company: '',
  experience: ''
};
const defaultPersonalSession = {
  scenarios: [],
  evaluations: []
};

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('simulation');
  const [userContext, setUserContext] = useState(defaultUserContext);
  const [personalSession, setPersonalSession] = useState(defaultPersonalSession);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MODE_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.mode === 'simulation' || parsed?.mode === 'personal') {
        setMode(parsed.mode);
      }
      if (parsed?.userContext && typeof parsed.userContext === 'object') {
        setUserContext({ ...defaultUserContext, ...parsed.userContext });
      }
      if (parsed?.personalSession && typeof parsed.personalSession === 'object') {
        setPersonalSession({
          ...defaultPersonalSession,
          ...parsed.personalSession,
          scenarios: Array.isArray(parsed.personalSession.scenarios) ? parsed.personalSession.scenarios : [],
          evaluations: Array.isArray(parsed.personalSession.evaluations) ? parsed.personalSession.evaluations : []
        });
      }
    } catch {
      // Ignore corrupted persisted data.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        MODE_STORAGE_KEY,
        JSON.stringify({ mode, userContext, personalSession })
      );
    } catch {
      // Ignore persistence errors.
    }
  }, [mode, userContext, personalSession]);

  function resetPersonalSession() {
    setPersonalSession(defaultPersonalSession);
  }

  const value = useMemo(
    () => ({
      mode,
      setMode,
      userContext,
      setUserContext,
      personalSession,
      setPersonalSession,
      resetPersonalSession
    }),
    [mode, userContext, personalSession]
  );

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
