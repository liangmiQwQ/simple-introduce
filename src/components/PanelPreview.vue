<script setup lang="ts">
import type { Settings } from '@/settings'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import GifPreview from '@/components/gif/GifPreview.vue'
import SvgPreview from '@/components/svg/SvgPreview.vue'
import UiButton from '@/ui/UiButton.vue'
import UiCard from '@/ui/UiCard.vue'
import { getAspect, getHeight } from '@/utils'

const props = defineProps<{
  mode: 'svg' | 'gif'
}>()

const emit = defineEmits<{
  export: []
}>()

const settings = defineModel<Settings>('settings', { required: true })

const height = ref(0)
const width = ref(0)
const previewer = useTemplateRef<HTMLDivElement>('cardPreview')

function resizeHandle() {
  if (!previewer.value)
    return

  width.value = previewer.value.offsetWidth
  height.value = getHeight(width.value, settings.value) + 20
}

onMounted(() => {
  window.addEventListener('resize', resizeHandle)
  resizeHandle()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandle)
})

watch(settings, resizeHandle, { deep: true })

const aspect = computed(() => getAspect(width.value, height.value))

watch([width, height], ([nextWidth, nextHeight]) => {
  settings.value.export.size = {
    width: nextWidth,
    height: nextHeight,
  }
}, { immediate: true })
</script>

<template>
  <div flex-1 h-fit flex="~ col gap-2">
    <UiCard w-full class="!py-0">
      <div ref="cardPreview" w-full>
        <GifPreview v-if="props.mode === 'gif'" :height="height" :settings="settings" />
        <SvgPreview v-else-if="props.mode === 'svg'" :height="height" :settings="settings" />
      </div>
      <div p-2 text-sm flex="~ items-center gap-4 justify-center" op60 w-full>
        <div flex="~ items-center gap-1">
          <span op50>Size</span>
          <span op80>{{ width }} * {{ height }}</span>
        </div>
        <div flex="~ items-center gap-1">
          <span op50>Aspect</span>
          <span op80>{{ aspect[0] }} : {{ aspect[1] }}</span>
        </div>
      </div>
    </UiCard>
    <UiButton v-if="props.mode === 'gif'" type="secondary" @click="emit('export')">
      <div i-hugeicons-gif01 />
      Export as GIF
    </UiButton>
    <UiButton v-else-if="props.mode === 'svg'" type="secondary" @click="emit('export')">
      <div i-hugeicons-svg01 />
      Export as SVG
    </UiButton>

    <div op15 text-xs text-right>
      <p>Tip: GIF and SVG are using different rendering, exporting logic</p>
      <p>The previewing, exporting result may be different</p>
      <a href="https://github.com/liangmiQwQ/simple-introduce/issues/new" underline>
        Issues welcome to report
      </a>
    </div>
  </div>
</template>
