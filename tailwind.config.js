/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm near-blacks carry the page. Gold is the one accent; navy is the one feature chapter per page,
        // and the Invitation is the single full gold band.
        ink: { DEFAULT: '#13100E', 2: '#1B1714' },
        surface: '#1F1A16',
        line: '#2F2823',
        cream: '#F3EEE8',
        ash: '#A0968C',
        // The feature chapter: navy ground with mist body text (one per page).
        navy: { DEFAULT: '#002435', 2: '#001B29' },
        mist: '#B9B0A6',
        // Two golds of one hue: `brand` (#986900) for fills, rules, large words and the gold band;
        // `accent` (lighter) only for small text and marks on dark grounds, where #986900 is too faint.
        accent: { DEFAULT: '#C08A1E', dark: '#A87812' },
        brand: { DEFAULT: '#986900', dark: '#7C5600' },
        bark: '#3E352D',
      },
      fontFamily: {
        // Headings: MADE Kenfolg (the original, heavier cut, served from /fonts); Inter carries the text.
        display: ['"Kenfolg"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.2em' }],
        'meta': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.05em' }],
      },
      maxWidth: {
        'prose-narrow': '38rem',
        'editorial': '72rem',
        'wide': '90rem',
      },
      borderRadius: {
        'subtle': '0.25rem',
        'soft': '0.125rem',
        'button': '0.25rem',
        'pill': '9999px',
      },
      transitionTimingFunction: {
        'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
    },
  },
  plugins: [],
};
