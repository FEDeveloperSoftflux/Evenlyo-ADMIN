/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        // Brand colors
        brand: {
          primary: '#E31B95',
          secondary: '#FF295D',
          tertiary: '#C817AE',
        },
        // Style guide colors
        primary: {
          DEFAULT: '#E31B95',
          from: "#FF295D",
          mid: "#E31B95",
          to: "#C817AE",
          50: '#FCE7F3',
          100: '#F9A8D4',
          500: '#E31B95',
          600: '#C817AE',
          700: '#A613A0'
        },
        secondary: {
          DEFAULT: '#FF295D'
        },
        white: '#FFFFFF',
        black: '#000000',
        blue: {
          DEFAULT: '#2970BE'
        },
        green: {
          DEFAULT: '#04C373',
          dark: '#1C752E'
        },
        yellow: {
          DEFAULT: '#FFD500'
        },
        accent: {
          light: '#FCF6D8',
          pink: '#FFEDF0'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Style guide typography scale
        'h1': ['60px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['50px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'subtitle-1': ['25px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle-2': ['21px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle-3': ['19px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-4': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'subtitle-5': ['17px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-6': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'subtitle-7': ['15px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-8': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'btn-1': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'btn-2': ['18px', { lineHeight: '1.4', fontWeight: '700' }],
      },
      backgroundImage: {
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'category': '0 4px 20px rgba(227, 27, 149, 0.15)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
