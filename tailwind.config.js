/** @type {import('tailwindcss').Config} */
const withAlpha = (v) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: withAlpha('--bg'),
        surface: withAlpha('--surface'),
        elevated: withAlpha('--elevated'),
        fg: withAlpha('--fg'),
        muted: withAlpha('--muted'),
        subtle: withAlpha('--subtle'),
        line: withAlpha('--line'),
        accent: withAlpha('--accent'),
        violet: withAlpha('--violet'),
        cyan: withAlpha('--cyan'),
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { content: '72rem' },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: { to: { transform: 'translateX(-50%)' } },
        aurora: {
          '0%,100%': { transform: 'translate(-50%, 0) scale(1)' },
          '33%': { transform: 'translate(-45%, 30px) scale(1.08)' },
          '66%': { transform: 'translate(-55%, -20px) scale(0.95)' },
        },
        drift: {
          '0%,100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-40px, 40px) scale(1.1)' },
        },
        pulseDot: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 24s linear infinite',
        'spin-slower': 'spin-slow 40s linear infinite reverse',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
