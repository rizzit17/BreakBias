/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C5A3FF',
        accent: '#FF4D6D',
        cyan: '#00D4FF',
        dark: '#0B0F1A',
        darkCard: '#151928',
        white: '#ffffff',
        gray: {
          800: '#1F2937',
          900: '#111827',
        },
        violet: {
          soft: '#C5A3FF',
          mid: '#9B59B6',
          deep: '#6C3483',
        },
        pink: {
          soft: '#FF6B9D',
          mid: '#FF4D6D',
          glow: '#FF1744',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Outfit', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'game': '0 6px 0 rgba(0, 0, 0, 0.4)',
        'game-hover': '0 8px 0 rgba(0, 0, 0, 0.4)',
        'game-active': '0 2px 0 rgba(0, 0, 0, 0.4)',
        'card': '0 12px 0 rgba(0, 0, 0, 0.25)',
        'neon-primary': '0 0 15px rgba(197, 163, 255, 0.4)',
        'neon-accent': '0 0 15px rgba(255, 77, 109, 0.4)',
        'neon-cyan': '0 0 15px rgba(0, 212, 255, 0.4)',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float-hud': 'floatHud 4s ease-in-out infinite',
        'xp-fill': 'xpFill 1s ease-out forwards',
        'pop-in': 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'float-up': 'floatUp 1.5s ease-out forwards',
        'glitch-arcade': 'glitchArcade 0.15s ease-in-out',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        floatHud: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        xpFill: {
          '0%': { width: '0%' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.8)' },
          '20%': { opacity: '1', transform: 'translateY(0) scale(1.1)' },
          '80%': { opacity: '1', transform: 'translateY(-30px) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-50px) scale(0.9)' },
        },
        glitchArcade: {
          '0%': { transform: 'translate(0) skew(0deg)' },
          '20%': { transform: 'translate(-5px, 5px) skew(-5deg)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(5px, -5px) skew(5deg)' },
          '60%': { transform: 'translate(-5px, -5px) skew(2deg)', filter: 'hue-rotate(-90deg)' },
          '80%': { transform: 'translate(5px, 5px) skew(-2deg)' },
          '100%': { transform: 'translate(0) skew(0deg)' },
        },
      },
      backgroundImage: {
        'game-grid': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        'identity-male': 'linear-gradient(135deg, #00D4FF 0%, #0066CC 100%)',
        'identity-female': 'linear-gradient(135deg, #FF6B9D 0%, #FF4D6D 100%)',
        'identity-intern': 'linear-gradient(135deg, #C5A3FF 0%, #9B59B6 100%)',
      },
    },
  },
  plugins: [],
}
