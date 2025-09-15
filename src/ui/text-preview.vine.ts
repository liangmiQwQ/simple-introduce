import type { StyleValue } from 'vue'
import type { Settings } from '../settings'
import { motion } from 'motion-v'
import { computed, onUnmounted, ref, useTemplateRef, watchEffect } from 'vue'

export function Preview({ texts, settings }: {
  texts: string[]
  settings: Settings
}) {
  const line = ref(0)
  let interval: ReturnType<typeof setInterval>

  onUnmounted(() => {
    clearInterval(interval)
  })

  watchEffect(() => {
    clearInterval(interval)
    interval = setInterval(() => {
      line.value++
    }, settings.during)
  })

  // const text = computed(() => texts[line.value % texts.length])
  const fontSize = computed(() => `${settings.fontSize}px`)

  return vine`
    <div select-none cursor-default w-full :style="{ fontSize }">
      <FadePreview v-if="settings.type === 'fade'" :texts :line :settings />
      <BlurPreview v-else-if="settings.type === 'blur'" :texts :line :settings />
    </div>
  `
}

function FadePreview({ texts, line }: { texts: string[], line: number, settings: Settings }) {
  const containerBox = useTemplateRef('container-fade')
  const prevLine = useTemplateRef('prev-fade')
  const currentLine = useTemplateRef('current-fade')

  const prevStyle = computed((): StyleValue => {
    if (containerBox.value && prevLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (prevLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
      }
    }

    return undefined
  })

  const currentStyle = computed((): StyleValue => {
    if (containerBox.value && currentLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (currentLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
      }
    }

    return undefined
  })

  return vine`
    <div :key="line" relative w-full h-full ref="container-fade">
      <motion.span :animate="{ opacity: 0 }" absolute ref="prev-fade" :style="prevStyle">
        {{ texts[(line - 1) % texts.length] }}
      </motion.span>
      <motion.span
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        absolute
        ref="current-fade"
        :style="currentStyle"
      >
        {{ texts[line % texts.length] }}
      </motion.span>
    </div>
  `
}

function BlurPreview({ texts, line }: { texts: string[], line: number, settings: Settings }) {
  const containerBox = useTemplateRef('container-blur')
  const prevLine = useTemplateRef('prev-blur')
  const currentLine = useTemplateRef('current-blur')

  const prevStyle = computed((): StyleValue => {
    if (containerBox.value && prevLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (prevLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
      }
    }

    return undefined
  })

  const currentStyle = computed((): StyleValue => {
    if (containerBox.value && currentLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (currentLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
      }
    }

    return undefined
  })

  return vine`
    <div :key="line" relative w-full h-full ref="container-blur">
      <motion.span
        :animate="{
          opacity: 0,
          filter: 'blur(5px)',
          y: -20,
          transition: { duration: 1 },
        }"
        absolute
        :style="prevStyle"
        ref="prev-blur"
      >
        {{ texts[(line - 1) % texts.length] }}
      </motion.span>
      <motion.span
        :initial="{ opacity: 0, filter: 'blur(5px)', y: 20 }"
        :animate="{
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: { duration: 1 },
        }"
        :style="currentStyle"
        absolute
        ref="current-blur"
      >
        {{ texts[line % texts.length] }}
      </motion.span>
    </div>
  `
}
