<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { Settings } from '@/settings'
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import BlurPreview from './BlurPreview.vue'
import FadePreview from './FadePreview.vue'

const props = defineProps<{
  settings: Settings
  height?: number
  width?: number
  appearance?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  finishOnce: []
}>()

const line = ref(0)
let interval: ReturnType<typeof setInterval> | undefined

onUnmounted(() => {
  if (interval)
    clearInterval(interval)
})

watchEffect(() => {
  if (interval)
    clearInterval(interval)

  interval = setInterval(() => {
    line.value++
  }, props.settings.during)
})

const style = computed((): StyleValue => ({
  fontSize: `${props.settings.fontSize}px`,
  height: props.height === undefined ? undefined : `${props.height}px`,
  width: props.width === undefined ? undefined : `${props.width}px`,
  ...(props.appearance === 'dark' && {
    color: 'white',
  }),
  ...(props.appearance === 'light' && {
    color: 'black',
  }),
  fontFamily: props.settings.fontFamily,
}))

watchEffect(() => {
  if (line.value === props.settings.texts.length)
    emit('finishOnce')
})
</script>

<template>
  <div select-none cursor-default :style="style">
    <FadePreview v-if="settings.type === 'fade'" :texts="settings.texts" :line="line" :settings="settings" />
    <BlurPreview v-else-if="settings.type === 'blur'" :texts="settings.texts" :line="line" :settings="settings" />
  </div>
</template>
