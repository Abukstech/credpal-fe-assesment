import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
  server: {
    proxy: {
      '/': {
      
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    cssCodeSplit: false, // This bundles all CSS into one file
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/styles.[hash].css';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
    // Add source maps for better debugging
    sourcemap: true,
    // Optimize CSS minification
    cssMinify: true,
  },
  css: {
    // Enable CSS modules if you're using them
    modules: {
      localsConvention: 'camelCase',
    },
    // Optimize PostCSS
    postcss: {
      plugins: [],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
