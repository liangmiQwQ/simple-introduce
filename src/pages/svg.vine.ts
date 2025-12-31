import type { SvgSettings } from '../settings'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { PanelSvgSettings } from '../components/panels.vine'
import { SvgExport } from '../components/svg-export.vine'
import { DEFAULT_SVG_SETTINGS } from '../settings'
import { UiCard } from '../ui/card-element.vine'
import { UiButton } from '../ui/forms.vine'
import { SvgPreview } from '../ui/svg-preview.vine'

export function SvgPage() {
  const settings = useLocalStorage<SvgSettings>('simple-introduce-svg-settings', DEFAULT_SVG_SETTINGS)
  const isExporting = ref(false)

  return vine`
    <div flex="~ col lg:row gap-6" w-full>
      <!-- Export Overlay -->
      <SvgExport :settings v-if="isExporting" @close="isExporting = false" />

      <!-- Settings Panel -->
      <div class="w-full lg:w-96">
        <PanelSvgSettings :settings="settings" />
      </div>

      <!-- Preview Area -->
      <div flex-1 h-fit flex="~ col gap-2">
        <UiCard
          w-full
          class="!py-0 overflow-hidden min-h-300px flex items-center justify-center bg-neutral-100 dark:bg-neutral-900"
        >
          <SvgPreview :settings="settings" />
        </UiCard>
        <UiButton type="secondary" @click="isExporting = true">
          <div i-hugeicons-svg01 />
          Export as SVG
        </UiButton>
      </div>
    </div>
  `
}
