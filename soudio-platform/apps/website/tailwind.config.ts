import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0faf8',
          100: '#d0f0ea',
          200: '#a1e1d5',
          300: '#6acbbb',
          400: '#38b0a0',
          500: '#1d9485',
          600: '#157a6e',
          700: '#116259',
          800: '#0f4f48',
          900: '#0d3f3a',
          950: '#072826',
        },
        accent: {
          50:  '#fdf8ee',
          100: '#f8edcc',
          200: '#f1d990',
          300: '#e8c14e',
          400: '#d9a82a',
          500: '#b8891a',
          600: '#966e15',
          700: '#745514',
          800: '#5a4214',
          900: '#4a3714',
        },
        neutral: {
          50:  '#f8f8f7',
          100: '#f0f0ee',
          200: '#e3e3e0',
          300: '#ccccc8',
          400: '#a8a8a3',
          500: '#86867f',
          600: '#6b6b63',
          700: '#565650',
          800: '#3e3e3a',
          900: '#282826',
          950: '#161614',
        },
      },
      fontFamily: {
        cairo:   ['Cairo', 'sans-serif'],
        display: ['Cairo', 'sans-serif'],
        body:    ['Cairo', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-in':   'slideIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
