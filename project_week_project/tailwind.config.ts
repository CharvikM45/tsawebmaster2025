import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',
        sunrise: '#f97316',
        calm: '#38bdf8',
        alert: '#facc15',
        emergency: '#ef4444',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;

