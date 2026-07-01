import { fileURLToPath } from 'node:url'
import { DevTools } from '@vitejs/devtools'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    UnoCSS(),
    command === 'serve' && DevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  devtools: {
    enabled: command === 'serve',
  },
  build: {
    rolldownOptions: {
      devtools: {},
    },
  },
  experimental: {
    bundledDev: true,
  },
}))
