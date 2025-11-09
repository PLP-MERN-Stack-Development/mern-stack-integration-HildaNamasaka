import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Correct import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 1. The React plugin
    react({
      // We keep the React Compiler here, as it is a Babel plugin
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    
    // 2. The Tailwind CSS v4 plugin must be listed here, at the top level
    tailwindcss(), 
  ],
})