import type { SvgSettings } from '../settings'
import { computed, ref } from 'vue'
import { generateSvg } from '../composables/svg-generator'
import { UiCard } from '../ui/card-element.vine'
import { UiButton } from '../ui/forms.vine'

export function SvgExport({ settings, onClose }: { settings: SvgSettings, onClose: () => void }) {
  const svgContent = computed(() => generateSvg(settings))
  const copied = ref(false)

  const download = () => {
    const blob = new Blob([svgContent.value], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'introduction.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copy = () => {
    navigator.clipboard.writeText(svgContent.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  }

  return vine`
    <div
      fixed
      inset-0
      backdrop-blur-8
      backdrop-brightness-95
      z-panel-content
      z-1
      flex="~ items-center justify-center"
      @click.self="onClose"
    >
      <UiCard class="bg-white dark:bg-dark-900 w-full max-w-2xl max-h-90vh flex flex-col gap-4">
        <!-- Header -->
        <div flex="~ items-center justify-between">
          <span font-medium text-lg>Export SVG</span>
          <UiButton type="ghost" @click="onClose"> <div i-ph-x /> </UiButton>
        </div>

        <!-- Preview -->
        <div
          class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded overflow-auto font-mono text-xs h-64 whitespace-pre"
        >
          {{ svgContent }}
        </div>

        <!-- Actions -->
        <div flex="~ gap-2 justify-end">
          <UiButton @click="copy" type="secondary">
            <div :class="copied ? 'i-ph-check' : 'i-ph-copy'" />
            {{ copied ? 'Copied' : 'Copy Code' }}
          </UiButton>
          <UiButton @click="download">
            <div i-ph-download-simple />
            Download SVG
          </UiButton>
        </div>
      </UiCard>
    </div>
  `
}
