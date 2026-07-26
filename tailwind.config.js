import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#00E5FF',
          glow: '#00E5FF',
        },
        violet: {
          DEFAULT: '#6C63FF',
          glow: '#6C63FF',
        },
        ink: {
          900: '#0A0E17',
          800: '#0F172A',
          700: '#151A28',
          600: '#1C2333',
          500: '#252D42',
        },
        bg: {
          DEFAULT: '#0A0E17',
          deep: '#060911',
        },
        surface: {
          DEFAULT: '#12172470',
          2: '#161C2C',
        },
        border: '#FFFFFF14',
        muted: {
          DEFAULT: '#AAB4C8',
          2: '#6E7890',
        },
        danger: '#F87171',
        success: '#34D399',
        warning: '#F59E0B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(0,229,255,0.10), transparent 40%), radial-gradient(circle at 80% 0%, rgba(108,99,255,0.12), transparent 40%), radial-gradient(circle at 50% 100%, rgba(0,229,255,0.08), transparent 45%)',
        'aurora':
          'linear-gradient(120deg, #00E5FF 0%, #6C63FF 45%, #151A28 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,229,255,0.35), 0 0 60px rgba(108,99,255,0.15)',
        'glow-sm': '0 0 10px rgba(0,229,255,0.25)',
        'inner-glass': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        blink: 'blink 1s step-end infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
        marquee: 'marquee 22s linear infinite',
        'grid-pan': 'gridPan 40s linear infinite',
      },
      keyframes: {
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
          '50%': { opacity: 0.7, filter: 'brightness(1.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [typography],
};
