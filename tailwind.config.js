/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B1E', // extremely dark base
          900: '#0A1128', // very dark area
          800: '#11224D', // panel dark area
          700: '#1A2C5B', // lighter dark panel
          600: '#203A70', // border blue
        },
        cyan: {
          400: '#64D7E4', // light blue accent
          500: '#00AEEF', // standard cyan/blue
          600: '#008CC4', // dark cyan/blue hover
        },
        lightBg: '#F0F4F8', // light background for services section
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        cursive: ['"Playball"', '"Dancing Script"', 'cursive'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0, 174, 239, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(100, 215, 228, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
