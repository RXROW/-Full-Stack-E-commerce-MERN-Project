// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // This allows JSX in .js files
      include: "**/*.{jsx,js}",
    }),
  ],
  // Rest of your config...
})