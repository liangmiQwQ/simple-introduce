import type { StyleValue } from 'vue'
import type { Settings } from '../settings'
import { motion } from 'motion-v'
import { computed, onUnmounted, ref, useTemplateRef, watchEffect } from 'vue'

export function Preview({ settings, height }: {
  settings: Settings
  height?: number
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

  const style = computed(() => ({
    fontSize: `${settings.fontSize}px`,
    height: `${height}px`,
  }))

  return vine`
    <div select-none cursor-default w-full :style>
      <FadePreview v-if="settings.type === 'fade'" :texts="settings.texts" :line :settings />
      <BlurPreview v-else-if="settings.type === 'blur'" :texts="settings.texts" :line :settings />
    </div>
  `
}

function FadePreview({ texts, line, settings }: { texts: string[], line: number, settings: Settings }) {
  const containerBox = useTemplateRef('container-fade')
  const prevLine = useTemplateRef('prev-fade')
  const currentLine = useTemplateRef('current-fade')
  const defaultStyle = computed(() => ({ textAlign: settings.textAlign }))

  const prevStyle = computed((): StyleValue => {
    if (containerBox.value && prevLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (prevLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
        ...defaultStyle.value,
      }
    }

    return defaultStyle.value
  })

  const currentStyle = computed((): StyleValue => {
    if (containerBox.value && currentLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (currentLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
        ...defaultStyle.value,
      }
    }

    return defaultStyle.value
  })

  return vine`
    <div :key="line" relative of-clip w-full h-full ref="container-fade">
      <motion.span :animate="{ opacity: 0 }" absolute w-full ref="prev-fade" :style="prevStyle">
        {{ texts[(line - 1) % texts.length] }}
      </motion.span>
      <motion.span
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        absolute
        w-full
        ref="current-fade"
        :style="currentStyle"
      >
        {{ texts[line % texts.length] }}
      </motion.span>
    </div>
  `
}

function BlurPreview({ texts, line, settings }: { texts: string[], line: number, settings: Settings }) {
  const containerBox = useTemplateRef('container-blur')
  const prevLine = useTemplateRef('prev-blur')
  const currentLine = useTemplateRef('current-blur')
  const defaultStyle = computed(() => ({ textAlign: settings.textAlign }))

  const prevStyle = computed((): StyleValue => {
    if (containerBox.value && prevLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (prevLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
        ...defaultStyle.value,
      }
    }

    return undefined
  })

  const currentStyle = computed((): StyleValue => {
    if (containerBox.value && currentLine.value) {
      return {
        top:
          `${(containerBox.value.offsetHeight - (currentLine.value.$el as HTMLSpanElement).offsetHeight) / 2}px`,
        ...defaultStyle.value,
      }
    }

    return undefined
  })

  return vine`
    <div :key="line" relative of-clip w-full h-full ref="container-blur">
      <motion.span
        :animate="{
          opacity: 0,
          filter: 'blur(5px)',
          y: -20,
          transition: { duration: 1 },
        }"
        absolute
        w-full
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
        w-full
        ref="current-blur"
      >
        {{ texts[line % texts.length] }}
      </motion.span>
    </div>
  `
}
