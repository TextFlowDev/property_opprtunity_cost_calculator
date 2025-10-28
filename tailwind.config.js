/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          },
          '50%': { 
            opacity: '0.9',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.8)'
          },
        },
      },
    },
  },
  plugins: [],
}
