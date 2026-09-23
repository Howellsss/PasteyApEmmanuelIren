/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm palette. Rule: `rust` (the brand red) for accents on light backgrounds, `copper` on dark.
        ink: '#1B1714',
        cream: '#F6F2EB',
        sand: '#E8DFD2',
        taupe: '#AFA397',
        umber: '#6A5F55',
        copper: '#C08463',
        // light/lighter: brighter reds for text on dark and coffee-brown backgrounds.
        rust: { DEFAULT: '#6E1717', dark: '#5A1212', light: '#D35454', lighter: '#E06666' },
        bark: '#3E352D',
        cocoa: '#26201B',
        walnut: '#3B2F27',
        onyx: '#151515',
        graphite: '#2E2E2E',
        ivory: {
          DEFAULT: '#EDE3CF',
          50: '#F4F0E8',
          100: '#EDE3CF',
          200: '#E8E0D0',
          300: '#D9CDB8',
        },
        charcoal: {
          DEFAULT: '#151515',
          50: '#2A2A2A',
          100: '#222222',
          200: '#1A1A1A',
          300: '#151515',
          400: '#0E0E0E',
        },
        'soft-white': '#FAF9F6',
        espresso: '#3d2e23',
        burgundy: {
          DEFAULT: '#6E1717',
          light: '#8A2424',
          dark: '#5A1212',
          50: '#F5E8E8',
          100: '#E8D0D0',
        },
        gold: {
          DEFAULT: '#B08A45',
          light: '#C9A55F',
          dark: '#9A7637',
          50: '#F5EEDD',
        },
        olive: {
          DEFAULT: '#5B6250',
          light: '#6E7563',
          dark: '#4A5042',
        },
        stone: {
          DEFAULT: '#B8B0A3',
          light: '#CFC8BC',
          dark: '#A09889',
        },
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
        'soft': '0.5rem',
        'button': '0.75rem',
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
