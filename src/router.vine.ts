import type { Settings } from './settings'
import { useLocalStorage } from '@vueuse/core'
import { createRouter, createWebHistory } from 'vue-router'
import { AppExport } from './components/export.vine'
import { PanelPreview, PanelSettings } from './components/panels.vine'
import { useExport } from './composables/export'
import { DEFAULT_SETTINGS } from './settings'

export function GifPage() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const { exporting, cancelExport, startExport } = useExport()

  return vine`
    <div flex="~ col lg:row gap-6" w-full>
      <!-- Export Overlay -->
      <AppExport :settings v-if="exporting" @cancel="cancelExport" />

      <!-- Settings Panel -->
      <div class="w-full lg:w-96">
        <PanelSettings :settings="settings" />
      </div>

      <!-- Preview Area -->
      <PanelPreview :settings @exportGif="startExport" />
    </div>
  `
}

export function SvgPage() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const { exporting, cancelExport, startExport } = useExport()

  return vine`
    <div flex="~ col lg:row gap-6" w-full>
      <!-- Export Overlay -->
      <AppExport :settings v-if="exporting" @cancel="cancelExport" />

      <!-- Settings Panel -->
      <div class="w-full lg:w-96">
        <PanelSettings :settings="settings" />
      </div>

      <!-- Preview Area -->
      <PanelPreview :settings @exportGif="startExport" />
    </div>
  `
}

const routes = [
  { path: '/', redirect: '/svg' },
  { path: '/gif', component: GifPage },
  { path: '/svg', component: SvgPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
