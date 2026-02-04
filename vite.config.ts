import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mt5-trading-bot/', // GitHub Pages repository name
  resolve: {
    alias: {
      '/vite.svg': path.resolve(__dirname, 'public/vite.svg'),
    },
  },
  build: {
    // Production build optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
  },
  // Asset optimization for images
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
})
