import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F6F1',
          deep: '#EFECE3',
          warm: '#E8E3D8',
        },
        forest: {
          DEFAULT: '#123020',
          deep: '#0B1F14',
          mid: '#1B432E',
        },
        brand: {
          DEFAULT: '#2E7D46',
          hover: '#246638',
          light: '#E6F2EA',
          glow: '#3FA45E',
        },
        sage: {
          DEFAULT: '#6B8E78',
          muted: '#9AB5A4',
          border: '#D5DFD8',
        },
        crimson: {
          DEFAULT: '#B83B33',
          soft: '#F9EAE9',
        },
        ink: {
          DEFAULT: '#101813',
          muted: '#45544B',
          subtle: '#6A7A70',
        },
      },
      fontFamily: {
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        architectural: '0 24px 60px -15px rgba(18, 48, 32, 0.14)',
        elevated: '0 12px 32px -8px rgba(18, 48, 32, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
