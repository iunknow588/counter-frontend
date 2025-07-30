import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    exclude: ['@magic-sdk/provider', '@magic-sdk/types'],
  },
  server: {
    // 开发服务器配置
    port: 5173,
    host: true,
    // 禁用 CSP 在开发环境中
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none';"
    }
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      external: ['@magic-sdk/provider', '@magic-sdk/types'],
    },
  },
})
