import { defineConfig, presetAttributify, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  // You can delete the file when unocss supports this by default
  content: {
    pipeline: {
      include: ['**/*.vine.ts'],
    },
  },
  presets: [presetAttributify(), presetWind4(), presetIcons({
    scale: 1.2,
  })],
})
