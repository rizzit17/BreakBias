import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';
import { useMode } from '../../context/ModeContext';

export default function AudioDirector() {
  const location = useLocation();
  const { playSound, speak } = useAudio();
  const { state } = useApp();
  const { mode, userContext } = useMode();
  const lastPathRef = useRef('');
  const greetedRef = useRef('');
  const biasStampRef = useRef(0);

  useEffect(() => {
    if (lastPathRef.current && lastPathRef.current !== location.pathname) {
      playSound('route');
    }
    lastPathRef.current = location.pathname;
  }, [location.pathname, playSound]);

  useEffect(() => {
    const biasEvent = state.currentBiasEvent;
    if (!state.showBiasFlash || !biasEvent?.timestamp) return;
    if (biasStampRef.current === biasEvent.timestamp) return;
    biasStampRef.current = biasEvent.timestamp;
    playSound('warning');
  }, [playSound, state.currentBiasEvent, state.showBiasFlash]);

  useEffect(() => {
    const name = userContext?.name?.trim();
    if (mode !== 'personal' || location.pathname !== '/dashboard' || !name) return;

    const greetingKey = `${name.toLowerCase()}-${location.pathname}`;
    if (greetedRef.current === greetingKey) return;
    greetedRef.current = greetingKey;

    playSound('success');
    const firstName = name.split(/\s+/)[0];
    const timer = window.setTimeout(() => {
      speak(`Hi ${firstName}`);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [location.pathname, mode, playSound, speak, userContext?.name]);

  return null;
}
