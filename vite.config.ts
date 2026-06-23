import { fileURLToPath } from 'node:url'
import { DevTools } from '@vitejs/devtools'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { VineVitePlugin } from 'vue-vine/vite'

export default defineConfig({
  plugins: [
    VineVitePlugin({
      vueCompilerOptions: {
        __enableTransformBareAttrAsBool: false,
      },
    }),
    UnoCSS(),
    DevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  devtools: {
    enabled: true,
  },
  build: {
    rolldownOptions: {
      devtools: {},
    },
  },
  experimental: {
    bundledDev: true,
  },
})
