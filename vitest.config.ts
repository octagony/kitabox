import { defineConfig } from 'vitest/config'
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.test.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '#': path.resolve(import.meta.dirname, './src'),
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})