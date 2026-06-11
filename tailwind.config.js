/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#f8f6f1',
        ink: '#1a1a1a',
        'ink-soft': '#3c3c3c',
        'ink-mute': '#6a6a6a',
        rule: '#d8d4c7',
        moss: '#2f4f3a',
        'moss-soft': '#5a7a64',
        ochre: '#a86b3c',
        'ochre-soft': '#c89770',
        night: '#15171a',
        'night-paper': '#1c1f23',
        'night-ink': '#e8e4d8',
        'night-rule': '#2f3338',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', 'serif'],
        serif: ['"EB Garamond"', '"Noto Serif SC"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        cn: ['"Noto Serif SC"', '"EB Garamond"', 'serif'],
      },
      maxWidth: {
        column: '880px',
      },
      letterSpacing: {
        wider2: '0.18em',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        450: '450ms',
      },
    },
  },
  plugins: [],
}
