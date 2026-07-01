<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { ScreenshotSession } from '@/composables/record'
import type { Settings } from '@/settings'
import { computed, onMounted, ref, shallowRef, useTemplateRef } from 'vue'
import GifPreview from '@/components/gif/GifPreview.vue'
import { startScreenshotSession } from '@/composables/record'
import UiCard from '@/ui/UiCard.vue'
import { sleep } from '@/utils'

const props = defineProps<{
  settings: Settings
  appearance: 'dark' | 'light'
}>()

const emit = defineEmits<{
  next: [count?: number]
}>()

const exporting = ref(false)
const rawSettings = shallowRef<Settings>(JSON.parse(JSON.stringify(props.settings)))
const session = ref<ScreenshotSession>()
const container = useTemplateRef<HTMLElement>('containerExport')
const scale = ref(
  Math.min(
    (document.body.offsetHeight - 100) * 0.9 / rawSettings.value.export.size.height,
    document.body.offsetWidth * 0.9 / rawSettings.value.export.size.width,
  ),
)

const style = computed((): StyleValue => ({
  scale: scale.value,
  ...(props.appearance === 'dark' && {
    background: 'black',
  }),
  ...(props.appearance === 'light' && {
    background: 'white',
  }),
}))

const placeholderStyle = computed((): StyleValue => ({
  height: `${rawSettings.value.export.size.height}px`,
  width: `${rawSettings.value.export.size.width}px`,
}))

async function next() {
  emit('next')
  session.value!.stopRecording()
  exporting.value = true
  session.value!.dispose()
  await session.value!.exportAsGIF()
  emit('next')
}

onMounted(async () => {
  if (props.settings.export.gif.appearance !== 'both' && props.settings.export.gif.appearance !== props.appearance) {
    emit('next', 2)
    return
  }

  session.value = await startScreenshotSession(
    rawSettings.value.export.size.width * scale.value,
    rawSettings.value.export.size.height * scale.value,
  )

  if (container.value && session.value.isActive.value) {
    await sleep(1000 / 60 * 5)
    session.value.startRecording(container.value)
  }
})
</script>

<template>
  <div v-if="!exporting" ref="containerExport" light px-4 py-2 :style="style">
    <GifPreview
      v-if="session"
      :settings="rawSettings"
      :width="rawSettings.export.size.width"
      :height="rawSettings.export.size.height"
      :appearance="appearance"
      @finish-once="next"
    />
    <div v-else :style="placeholderStyle" />
  </div>
  <UiCard v-else w-100 class="bg-white dark:bg-dark-900 !py-5">
    <div animate-pulse flex="~ col gap-1">
      <div flex="~ items-center gap-2" w-full>
        <div i-svg-spinners-8-dots-rotate />
        <span font-medium>Rendering..</span>
      </div>
      <span op64 text-sm>
        Your animation has been recorded! Rendering to GIF now.
        <span font-bold>Please DO NOT close the exporting page</span>
        or your GIF will get lost
      </span>
    </div>
  </UiCard>
</template>
