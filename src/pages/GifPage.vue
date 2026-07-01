<script setup lang="ts">
import type { Settings } from '@/settings'
import { useLocalStorage } from '@vueuse/core'
import GifExport from '@/components/gif/GifExport.vue'
import PanelPreview from '@/components/PanelPreview.vue'
import PanelSettings from '@/components/PanelSettings.vue'
import { useExport } from '@/composables/export'
import { DEFAULT_SETTINGS } from '@/settings'

const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
const { exporting, cancelExport, startExport } = useExport()
</script>

<template>
  <div flex="~ col lg:row gap-6" w-full>
    <GifExport v-if="exporting" v-model:settings="settings" @cancel="cancelExport" />

    <div class="w-full lg:w-96">
      <PanelSettings v-model:settings="settings" />
    </div>

    <PanelPreview v-model:settings="settings" mode="gif" @export="startExport" />
  </div>
</template>
