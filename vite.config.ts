import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      buffer: "buffer/",
    },
  },
  optimizeDeps: {
    include: ["buffer"],
    exclude: ["@magic-sdk/provider", "@magic-sdk/types"],
  },
  build: {
    rollupOptions: {
      external: ["@magic-sdk/provider", "@magic-sdk/types"],
    },
  },
  base: "/counter-frontend/", // 部署到 GitHub Pages 时需设置为仓库名
});
