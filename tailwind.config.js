/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        brand: {
          50:  '#f4f7f3',
          100: '#e5efe2',
          200: '#cfe1c8',
          300: '#b7d2ad',  
          400: '#9fc494',
          500: '#8ab87f',
          600: '#6ea060',
          700: '#587e4d',
          800: '#3f5c38',
          900: '#2b3f26',
        },
        cream: '#faf8f4',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
