import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ModeContext = createContext();
const MODE_STORAGE_KEY = 'workdayReplay.modeContext';
const defaultUserContext = {
  name: '',
  role: '',
  industry: '',
  experience: ''
};

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('simulation');
  const [userContext, setUserContext] = useState(defaultUserContext);

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
    } catch {
      // Ignore corrupted persisted data.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(MODE_STORAGE_KEY, JSON.stringify({ mode, userContext }));
    } catch {
      // Ignore persistence errors.
    }
  }, [mode, userContext]);

  const value = useMemo(() => ({ mode, setMode, userContext, setUserContext }), [mode, userContext]);

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
