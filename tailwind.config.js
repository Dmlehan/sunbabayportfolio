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
          950: '#03050c', // Almost black base
          900: '#070b1e', // Deep futuristic navy
          800: '#0f162e', // Card background base
          700: '#182245', // Lighter panel/hover state
          600: '#23315d', // Border blue-navy
          500: '#2f417a', // Text muted navy
        },
        electric: {
          DEFAULT: '#00A3FF', // Electric blue accent
          hover: '#0085d1',
          light: '#33B5FF',
          dark: '#006299',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        cursive: ['"Playball"', '"Dancing Script"', 'cursive'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0, 163, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(0, 163, 255, 0.8))' },
        }
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 163, 255, 0.35)',
        'neon-bright': '0 0 25px rgba(0, 163, 255, 0.6)',
        'neon-inset': 'inset 0 0 15px rgba(0, 163, 255, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
