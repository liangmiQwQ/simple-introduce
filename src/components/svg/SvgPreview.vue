<script setup vapor lang="ts">
import type { StyleValue } from 'vue'
import type { getSvgFn } from '@/composables/svg'
import type { Settings } from '@/settings'
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import { asDataURL, getBlurSvg, getFadeSvg } from '@/composables/svg'

const props = defineProps<{
  settings: Settings
  height?: number
  width?: number
}>()

const isDark = useDark()

const style = computed((): StyleValue => ({
  height: props.height === undefined ? undefined : `${props.height}px`,
  width: props.width === undefined ? undefined : `${props.width}px`,
}))

const svg = computed((): string => {
  if (!props.height)
    return ''

  const fn: getSvgFn = props.settings.type === 'blur' ? getBlurSvg : getFadeSvg

  return asDataURL(fn(props.settings, isDark.value ? 'dark' : 'light', props.width, props.height, false))
})
</script>

<template>
  <div :style="style">
    <img :src="svg" alt="">
  </div>
</template>
