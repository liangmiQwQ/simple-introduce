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
const containerBox = useTemplateRef<HTMLDivElement>('containerBlur')
const prevLine = useTemplateRef<ComponentPublicInstance>('prevBlur')
const currentLine = useTemplateRef<ComponentPublicInstance>('currentBlur')
const defaultStyle = computed((): CSSProperties => ({ textAlign: props.settings.textAlign }))

function getElementHeight(component: ComponentPublicInstance | null) {
  return (component?.$el as HTMLElement | undefined)?.offsetHeight
}

const prevStyle = computed((): CSSProperties | undefined => {
  const prevHeight = getElementHeight(prevLine.value)
  if (containerBox.value && prevHeight !== undefined) {
    return {
      top: `${(containerBox.value.offsetHeight - prevHeight) / 2}px`,
      ...defaultStyle.value,
    }
  }

  return undefined
})

const currentStyle = computed((): CSSProperties | undefined => {
  const currentHeight = getElementHeight(currentLine.value)
  if (containerBox.value && currentHeight !== undefined) {
    return {
      top: `${(containerBox.value.offsetHeight - currentHeight) / 2}px`,
      ...defaultStyle.value,
    }
  }

  return undefined
})
</script>

<template>
  <div :key="line" ref="containerBlur" relative of-clip w-full h-full>
    <MotionSpan
      ref="prevBlur"
      :animate="{
        opacity: 0,
        filter: 'blur(5px)',
        y: -20,
        transition: { duration: 1 },
      }"
      absolute
      w-full
      :style="prevStyle"
    >
      {{ texts[(line - 1) % texts.length] }}
    </MotionSpan>
    <MotionSpan
      ref="currentBlur"
      :initial="{ opacity: 0, filter: 'blur(5px)', y: 20 }"
      :animate="{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: { duration: 1 },
      }"
      :style="currentStyle"
      absolute
      w-full
    >
      {{ texts[line % texts.length] }}
    </MotionSpan>
  </div>
</template>
