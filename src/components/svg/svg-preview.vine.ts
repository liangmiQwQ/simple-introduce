import type { StyleValue } from 'vue'
import type { Settings } from '../../settings'
import type { getSvgFn } from '@/composables/svg'
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import { getBlurSvg, getFadeSvg } from '@/composables/svg'
import { asDataURL } from '../../composables/svg'

export function SvgPreview({ settings, height, width }: {
  settings: Settings
  height?: number
  width?: number
}) {
  const style = computed((): StyleValue => ({
    height: `${height}px`,
    width: `${width}px`,
  }))

  const isDark = useDark()

  const svg = computed((): string => {
    if (!height)
      return ''

    const fn: getSvgFn = settings.type === 'blur' ? getBlurSvg : getFadeSvg

    return asDataURL(fn(settings, isDark.value ? 'dark' : 'light', width, height, false))
  })

  return vine`
    <div :style>
      <img :src="svg" />
      <!-- <img src="../../assets/blur.svg" /> -->
    </div>
  `
}
