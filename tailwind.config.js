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
        darkCard: '#111827',
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
        navy: {
          900: '#0B0F1A',
          800: '#0D1124',
          700: '#111827',
          600: '#1a2035',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197, 163, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(197, 163, 255, 0.8)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(3px, -3px)' },
          '60%': { transform: 'translate(-3px, -3px)' },
          '80%': { transform: 'translate(3px, 3px)' },
          '100%': { transform: 'translate(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'identity-blue': 'linear-gradient(135deg, #0B0F1A 0%, #0d1f3c 50%, #091428 100%)',
        'identity-pink': 'linear-gradient(135deg, #1a0a14 0%, #2d0d1f 50%, #1a0a14 100%)',
        'identity-violet': 'linear-gradient(135deg, #110a1f 0%, #1f0a35 50%, #110a1f 100%)',
      },
    },
  },
  plugins: [],
}
