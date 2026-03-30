import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const AudioContextState = createContext(null);
const AUDIO_STORAGE_KEY = 'workdayReplay.audioMuted';

function clampVolume(value) {
  return Math.max(0, Math.min(1, value));
}

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const masterGainRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    try {
      setMuted(localStorage.getItem(AUDIO_STORAGE_KEY) === 'true');
    } catch {
      setMuted(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(AUDIO_STORAGE_KEY, String(muted));
    } catch {
      // Ignore persistence errors.
    }
  }, [muted]);

  const ensureAudio = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    const BrowserAudioContext = window.AudioContext || window.webkitAudioContext;
    if (!BrowserAudioContext) return null;

    if (!audioRef.current) {
      const ctx = new BrowserAudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.value = muted ? 0 : 0.18;
      masterGain.connect(ctx.destination);
      audioRef.current = ctx;
      masterGainRef.current = masterGain;
    }

    if (audioRef.current.state === 'suspended') {
      try {
        await audioRef.current.resume();
      } catch {
        return null;
      }
    }

    return audioRef.current;
  }, [muted]);

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = muted ? 0 : 0.18;
    }
  }, [muted]);

  const playTone = useCallback(async ({
    frequency = 440,
    type = 'sine',
    duration = 0.08,
    volume = 0.35,
    delay = 0,
    rampTo,
    q = 5,
    bandpass = false
  }) => {
    const ctx = await ensureAudio();
    if (!ctx || muted || !masterGainRef.current) return;

    const startAt = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = bandpass ? ctx.createBiquadFilter() : null;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    if (rampTo) {
      oscillator.frequency.exponentialRampToValueAtTime(rampTo, startAt + duration);
    }

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(clampVolume(volume), startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    if (filter) {
      filter.type = 'bandpass';
      filter.frequency.value = frequency;
      filter.Q.value = q;
      oscillator.connect(filter);
      filter.connect(gain);
    } else {
      oscillator.connect(gain);
    }

    gain.connect(masterGainRef.current);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
  }, [ensureAudio, muted]);

  const playNoise = useCallback(async ({ duration = 0.12, volume = 0.15, delay = 0 }) => {
    const ctx = await ensureAudio();
    if (!ctx || muted || !masterGainRef.current) return;

    const sampleRate = ctx.sampleRate;
    const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < channelData.length; i += 1) {
      channelData[i] = (Math.random() * 2 - 1) * (1 - i / channelData.length);
    }

    const startAt = ctx.currentTime + delay;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    source.buffer = buffer;
    filter.type = 'highpass';
    filter.frequency.value = 1200;
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(clampVolume(volume), startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);
    source.start(startAt);
  }, [ensureAudio, muted]);

  const playSound = useCallback(async (name) => {
    if (muted) return;

    switch (name) {
      case 'click':
        await playTone({ frequency: 540, type: 'square', duration: 0.04, volume: 0.18 });
        await playTone({ frequency: 760, type: 'triangle', duration: 0.05, volume: 0.1, delay: 0.02 });
        break;
      case 'hover':
        await playTone({ frequency: 660, type: 'sine', duration: 0.03, volume: 0.08 });
        break;
      case 'route':
        await playTone({ frequency: 320, type: 'triangle', duration: 0.05, volume: 0.08 });
        await playTone({ frequency: 480, type: 'triangle', duration: 0.06, volume: 0.07, delay: 0.035 });
        break;
      case 'warning':
        await playTone({ frequency: 420, rampTo: 180, type: 'sawtooth', duration: 0.22, volume: 0.16, bandpass: true });
        await playNoise({ duration: 0.08, volume: 0.06, delay: 0.02 });
        break;
      case 'success':
        await playTone({ frequency: 440, rampTo: 660, type: 'triangle', duration: 0.12, volume: 0.14 });
        await playTone({ frequency: 660, rampTo: 920, type: 'triangle', duration: 0.14, volume: 0.11, delay: 0.05 });
        break;
      case 'complete':
        await playTone({ frequency: 392, rampTo: 587, type: 'triangle', duration: 0.15, volume: 0.14 });
        await playTone({ frequency: 587, rampTo: 880, type: 'triangle', duration: 0.2, volume: 0.12, delay: 0.08 });
        break;
      case 'toggle-on':
        await playTone({ frequency: 460, rampTo: 720, type: 'square', duration: 0.09, volume: 0.13 });
        break;
      case 'toggle-off':
        await playTone({ frequency: 520, rampTo: 280, type: 'square', duration: 0.09, volume: 0.11 });
        break;
      case 'ai':
        await playTone({ frequency: 300, type: 'sine', duration: 0.05, volume: 0.08 });
        await playTone({ frequency: 520, type: 'sine', duration: 0.05, volume: 0.08, delay: 0.05 });
        await playTone({ frequency: 740, type: 'sine', duration: 0.05, volume: 0.08, delay: 0.1 });
        break;
      default:
        break;
    }
  }, [muted, playNoise, playTone]);

  const speak = useCallback((text) => {
    if (typeof window === 'undefined' || muted || !('speechSynthesis' in window) || !text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1.03;
    utterance.volume = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [muted]);

  const value = useMemo(() => ({
    muted,
    setMuted,
    toggleMuted: () => setMuted((current) => !current),
    primeAudio: ensureAudio,
    playSound,
    speak
  }), [ensureAudio, muted, playSound, speak]);

  return (
    <AudioContextState.Provider value={value}>
      {children}
    </AudioContextState.Provider>
  );
}

export function useAudio() {
  const value = useContext(AudioContextState);
  if (!value) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return value;
}
