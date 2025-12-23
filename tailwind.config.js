import { text } from 'stream/consumers'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        almendra: ['Almendra', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        magic: {
          dark: '#1a0f0a',
          gold: '#d3a625',
          red: '#740001',
          parchment: '#fdf6e3'
        },
        house: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          text: 'var(--color-text)'
        }
      },
      textShadow: {
        'readable': '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 1px rgba(255,255,255,0.5)',
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}

