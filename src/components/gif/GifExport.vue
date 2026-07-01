<script setup lang="ts">
import type { Settings } from '@/settings'
import { reactive } from 'vue'
import GifExportCongrats from './GifExportCongrats.vue'
import GifExportProgress from './GifExportProgress.vue'
import GifExportSettingPanel from './GifExportSettingPanel.vue'
import GifRecordingDisplay from './GifRecordingDisplay.vue'

interface ExportProcess {
  current: number
  steps: string[]
}

const emit = defineEmits<{
  cancel: []
}>()

const settings = defineModel<Settings>('settings', { required: true })

const process = reactive<ExportProcess>({
  current: 0,
  steps: [
    'Configuration',
    'Record (Light)',
    'Exporting (Light)',
    'Record (Dark)',
    'Exporting (Dark)',
    'Finished',
  ],
})

function cancel() {
  emit('cancel')
}

function next(count?: number) {
  process.current += count ?? 1
}
</script>

<template>
  <div
    fixed
    inset-0
    backdrop-blur-8
    backdrop-brightness-95
    z-panel-content
    z-1
    flex="~ items-center justify-between col"
    @click.self="cancel"
  >
    <div />
    <GifExportSettingPanel
      v-if="process.current === 0"
      v-model:settings="settings"
      @cancel="cancel"
      @next="next"
    />
    <GifRecordingDisplay
      v-else-if="process.current === 1 || process.current === 2"
      appearance="light"
      :settings="settings"
      @next="next"
    />
    <GifRecordingDisplay
      v-else-if="process.current === 3 || process.current === 4"
      appearance="dark"
      :settings="settings"
      @next="next"
    />
    <GifExportCongrats v-else-if="process.current === process.steps.length - 1" @cancel="cancel" />
    <GifExportProgress :steps="process.steps" :current-step="process.current" />
  </div>
</template>
