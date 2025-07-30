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
    // 完全禁用 CSP 在开发环境中
    headers: {
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' ws: wss:;"
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
