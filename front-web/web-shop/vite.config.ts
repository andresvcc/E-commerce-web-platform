import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  plugins: [react({ babel: { plugins: [] } })],
  resolve: {
    alias: [
      { find: '@/', replacement: '/src' },
      { find: '@/Assets', replacement: '/src/assets' },
      { find: '@/Components', replacement: '/src/components' },
    ],
  },
});
