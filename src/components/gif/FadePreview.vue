<script setup lang="ts">
import type { ComponentPublicInstance, CSSProperties } from 'vue'
import type { Settings } from '@/settings'
import { motion } from 'motion-v'
import { computed, useTemplateRef } from 'vue'

const props = defineProps<{
  texts: string[]
  line: number
  settings: Settings
}>()

const MotionSpan = motion.span
const containerBox = useTemplateRef<HTMLDivElement>('containerFade')
const prevLine = useTemplateRef<ComponentPublicInstance>('prevFade')
const currentLine = useTemplateRef<ComponentPublicInstance>('currentFade')
const defaultStyle = computed((): CSSProperties => ({ textAlign: props.settings.textAlign }))

function getElementHeight(component: ComponentPublicInstance | null) {
  return (component?.$el as HTMLElement | undefined)?.offsetHeight
}

const prevStyle = computed((): CSSProperties => {
  const prevHeight = getElementHeight(prevLine.value)
  if (containerBox.value && prevHeight !== undefined) {
    return {
      top: `${(containerBox.value.offsetHeight - prevHeight) / 2}px`,
      ...defaultStyle.value,
    }
  }

  return defaultStyle.value
})

const currentStyle = computed((): CSSProperties => {
  const currentHeight = getElementHeight(currentLine.value)
  if (containerBox.value && currentHeight !== undefined) {
    return {
      top: `${(containerBox.value.offsetHeight - currentHeight) / 2}px`,
      ...defaultStyle.value,
    }
  }

  return defaultStyle.value
})
</script>

<template>
  <div :key="line" ref="containerFade" relative of-clip w-full h-full>
    <MotionSpan ref="prevFade" :animate="{ opacity: 0 }" absolute w-full :style="prevStyle">
      {{ texts[(line - 1) % texts.length] }}
    </MotionSpan>
    <MotionSpan
      ref="currentFade"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      absolute
      w-full
      :style="currentStyle"
    >
      {{ texts[line % texts.length] }}
    </MotionSpan>
  </div>
</template>
