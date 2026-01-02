import type { StyleValue } from 'vue'
import type { Settings } from '../../settings'
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import { getBlurSvg } from '@/composables/svg-generator'

export function SvgPreview({ settings, height, width, appearance }: {
  settings: Settings
  height?: number
  width?: number
}) {
  const style = computed((): StyleValue => ({
    height: `${height}px`,
    width: `${width}px`,
  }))

  console.log(getBlurSvg(settings, useDark().value ? 'dark' : 'light', width, height, false))

  return vine`
    <div :style>
      <!-- <img src="../../assets/fade.svg" /> -->
      <img src="../../assets/blur.svg" />
    </div>
  `
}
