/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8860B',
          50: '#F8F5E8',
          100: '#F1EBD1',
          200: '#E3D7A3',
          300: '#D5C375',
          400: '#C7AF47',
          500: '#B8860B',
          600: '#936B09',
          700: '#6E5007',
          800: '#493504',
          900: '#241A02',
        },
        brown: {
          DEFAULT: '#8B4513',
          50: '#F2E6D9',
          100: '#E8D4BF',
          200: '#D4B08B',
          300: '#C08C57',
          400: '#AC6823',
          500: '#8B4513',
          600: '#6F370F',
          700: '#53290B',
          800: '#371B07',
          900: '#1B0D04',
        },
        cream: {
          DEFAULT: '#F5F5DC',
          50: '#FEFEFE',
          100: '#FDFDFA',
          200: '#FBFBF2',
          300: '#F9F9EA',
          400: '#F7F7E3',
          500: '#F5F5DC',
          600: '#EEEEBC',
          700: '#E7E79C',
          800: '#E0E07C',
          900: '#D9D95C',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Source Sans Pro', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
};