import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.js'),
      name: 'VueSvgGauge',
      fileName: (format) => `vue-svg-gauge${format === 'umd' ? '.umd' : ''}.min.js`,
      formats: ['es', 'umd'],
    },
    outDir: path.resolve(__dirname, './dist/'),
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    minify: 'terser',
  },
})
