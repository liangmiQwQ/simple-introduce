import type { Settings } from './types/settings'
import { motion } from 'motion-v'
import { computed, onUnmounted, ref, watchEffect } from 'vue'

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
    <div select-none cursor-default w-full h-50 :style="{ fontSize }">
      <FadePreview v-if="settings.type === 'fade'" :texts :line :settings />
      <BlurPreview v-else-if="settings.type === 'blur'" :texts :line :settings />
    </div>
  `
}

function FadePreview({ texts, line }: { texts: string[], line: number, settings: Settings }) {
  return vine`
    <div :key="line" relative w-full>
      <motion.span :animate="{ opacity: 0 }" absolute>
        {{ texts[(line - 1) % texts.length] }}
      </motion.span>
      <motion.span :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" absolute>
        {{ texts[line % texts.length] }}
      </motion.span>
    </div>
  `
}

function BlurPreview({ texts, line }: { texts: string[], line: number, settings: Settings }) {
  return vine`
    <div :key="line" relative w-full h-full>
      <motion.span
        :animate="{ opacity: 0, filter: 'blur(5px)', y: -20, transition: { duration: 1 } }"
        absolute
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
        absolute
      >
        {{ texts[line % texts.length] }}
      </motion.span>
    </div>
  `
}
