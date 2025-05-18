// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // only proxy API calls that expect JSON
      '/projects': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          // if the browser is asking for HTML, let Vite handle it (serve index.html)
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return req.url
          }
        },
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return req.url
          }
        },
      },
    },
  },
})


