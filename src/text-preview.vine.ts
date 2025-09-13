import { onMounted, onUnmounted, ref } from 'vue'

export function Preview({ text, type }: {
  text: string[]
  type: 'magic'
}) {
  return vine`
    <MagicPreview v-if="type === 'magic'" :text />
  `
}

function MagicPreview({ text }: { text: string[] }) {
  const index = ref(0)

  let interval: ReturnType<typeof setInterval>

  onMounted(() => {
    interval = setInterval(() => {
      index.value++
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  return vine`
    <div>
      {{ text[index % text.length] }}
    </div>
  `
}
