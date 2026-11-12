import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F5F0',
          deep: '#EDEAE2',
          warm: '#E5E0D5',
        },
        forest: {
          DEFAULT: '#163524',
          deep: '#0F2419',
          mid: '#1E4630',
        },
        brand: {
          DEFAULT: '#2E7D46',
          hover: '#246538',
          light: '#EBF4EE',
          glow: '#3B9657',
        },
        sage: {
          DEFAULT: '#668472',
          muted: '#94AD9E',
          border: '#DCE2DD',
        },
        crimson: {
          DEFAULT: '#B83B33',
          soft: '#F9EAE9',
        },
        ink: {
          DEFAULT: '#1A221D',
          muted: '#525E57',
          subtle: '#738078',
        },
      },
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        architectural: '0 20px 48px -12px rgba(22, 53, 36, 0.10)',
        elevated: '0 8px 24px -6px rgba(22, 53, 36, 0.07)',
      },
    },
  },
  plugins: [],
} satisfies Config;
