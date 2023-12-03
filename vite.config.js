import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Specify your entry point
    rollupOptions: {
      input: 'src/main.js',
    },
  },
})
