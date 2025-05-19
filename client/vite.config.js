import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure SPA routing
  server: {
    proxy: {
      '/projects': {
        target: 'http://localhost:5006',
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return req.url;
          }
        },
      },
      '/uploads': {
        target: 'http://localhost:5006',
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return req.url;
          }
        },
      },
    },
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
  },
});


