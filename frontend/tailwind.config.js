/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    container: {
      center: true,  
      padding: '2rem',  
    },
    extend: {
      colors: { 
        "rabbit-main": "#ea2e0e",
      },
    },
  },
  plugins: [],
}
