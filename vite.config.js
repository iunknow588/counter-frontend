import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
    build: {
        rollupOptions: {
            external: ['@magic-sdk/provider', '@magic-sdk/types'],
        },
    },
});
