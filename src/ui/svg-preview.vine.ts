import type { SvgSettings } from '../settings'
import { computed } from 'vue'
import { generateSvg } from '../composables/svg-generator'

export function SvgPreview({ settings }: { settings: SvgSettings }) {
  const svgContent = computed(() => generateSvg(settings))

  return vine`
    <div flex="~ items-center justify-center" class="checker-bg" v-html="svgContent" />
  `
}
