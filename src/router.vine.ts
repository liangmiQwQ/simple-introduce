import type { Settings } from './settings'
import { useLocalStorage } from '@vueuse/core'
import { createRouter, createWebHistory } from 'vue-router'
import { GifExport } from './components/gif-export.vine'
import { PanelPreview, PanelSettings } from './components/panels.vine'
import { SvgExport } from './components/svg-export.vine'
import { useExport } from './composables/export'
import { DEFAULT_SETTINGS } from './settings'

export function SvgPage() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const { exporting, cancelExport, startExport } = useExport()

  return vine`
    <div flex="~ col lg:row gap-6" w-full>
      <!-- Export Overlay -->
      <SvgExport :settings v-if="exporting" @cancel="cancelExport" />

      <!-- Settings Panel -->
      <div class="w-full lg:w-96">
        <PanelSettings :settings="settings" />
      </div>

      <!-- Preview Area -->
      <PanelPreview :settings @export="startExport" mode="svg" />
    </div>
  `
}

export function GifPage() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const { exporting, cancelExport, startExport } = useExport()

  return vine`
    <div flex="~ col lg:row gap-6" w-full>
      <!-- Export Overlay -->
      <GifExport :settings v-if="exporting" @cancel="cancelExport" />

      <!-- Settings Panel -->
      <div class="w-full lg:w-96">
        <PanelSettings :settings="settings" />
      </div>

      <!-- Preview Area -->
      <PanelPreview :settings @export="startExport" mode="gif" />
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
