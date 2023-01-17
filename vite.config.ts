/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin({
    useEslintrc: true,
    include: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx"],
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'test.setup.ts',
  },
})
