/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette "B": warm near-blacks with one accent. Rule: the accent is for small marks
        // (words, numbers, rules, arrows) and never for large fills; buttons are cream.
        ink: { DEFAULT: '#13100E', 2: '#1B1714' },
        surface: '#1F1A16',
        line: '#2F2823',
        cream: '#F3EEE8',
        ash: '#A0968C',
        // The one light "chapter" per page: bone background with umber body text.
        bone: '#EEE6DA',
        umber: '#6B6057',
        accent: { DEFAULT: '#DA4F43', dark: '#C2443A' },
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
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
