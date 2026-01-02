import type { StyleValue } from 'vue'
import type { Settings } from '../../settings'
import { computed } from 'vue'

export function SvgPreview({ settings, height, width, appearance }: {
  settings: Settings
  height?: number
  width?: number
}) {
  const style = computed((): StyleValue => ({
    height: `${height}px`,
    width: `${width}px`,
  }))

  return vine`
    <div :style>
      <!-- <img src="../../assets/fade.svg" /> -->
      <img src="../../assets/blur.svg" />
    </div>
  `
}
