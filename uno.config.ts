import { defineConfig, presetAttributify, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind4(), presetIcons({
    scale: 1.2,
  })],
})
