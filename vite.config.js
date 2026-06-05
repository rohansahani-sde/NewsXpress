import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    chunkSizeWarningLimit: 350,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-router')) return 'router';
            if (id.includes('axios')) return 'axios';
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor';
          }
        },
        manualChunksIds: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-router')) return 'router';
          }
          return undefined;
        },
      },
    },
  },
})
