import type { Settings } from './types/settings'
import { motion } from 'motion-v'
import { computed, onMounted, onUnmounted, ref } from 'vue'

export function Preview({ texts, settings }: {
  texts: string[]
  settings: Settings
}) {
  const line = ref(0)
  let interval: ReturnType<typeof setInterval>

  onMounted(() => {
    interval = setInterval(() => {
      line.value++
    }, settings.during)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  // const text = computed(() => texts[line.value % texts.length])
  const fontSize = computed(() => `${settings.fontSize}px`)

  return vine`
    <div select-none cursor-default w-full h-50>
      <FadePreview
        v-if="settings.type === 'fade'"
        :texts
        :line
        :settings
        :style="{ fontSize, color: settings.textColor }"
      />
      <BlurPreview
        v-else-if="settings.type === 'blur'"
        :texts
        :line
        :settings
        :style="{ fontSize, color: settings.textColor }"
      />
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
