import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@domain-flow': path.resolve(__dirname, './src/domain/flow'),
      '@domain-layer-manager': path.resolve(__dirname, './src/domain/layer-manager'),
      '@domain-map-viewer': path.resolve(__dirname, './src/domain/map-viewer'),
      '@router': path.resolve(__dirname, './src/router'),
    },
  },

  // Exclude test result directories from being watched
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/playwright-report/**',
        '**/test-results/**',
        '**/.jest-cache/**',
        '**/e2e-results/**',
        '**/.playwright/**',
      ],
    },
  },
});
