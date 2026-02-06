import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true, // TS 체크

      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      }, // ESLint 체크
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://203.252.131.18:4533",
        changeOrigin: true,
      },
    },
  },
});
