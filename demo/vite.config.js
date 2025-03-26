import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Plugin für Vue 3

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['vue'] // Explicitly include dependencies to pre-bundle
  }
});
