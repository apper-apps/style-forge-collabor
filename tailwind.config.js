/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",
        secondary: "#F5F5F5",
        accent: "#FF006E",
        surface: "#FFFFFF",
        background: "#FAFAFA",
        success: "#00C896",
        warning: "#FFB800",
        error: "#FF3333",
        info: "#0066FF",
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'selection-flash': 'selectionFlash 0.2s ease-out'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        selectionFlash: {
          '0%': { backgroundColor: 'rgba(255, 0, 110, 0.1)' },
          '50%': { backgroundColor: 'rgba(255, 0, 110, 0.3)' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
    },
  },
  plugins: [],
}