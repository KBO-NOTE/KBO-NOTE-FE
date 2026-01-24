import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true, // TS 체크
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }, // ESLint 체크
    }),
  ],
});
