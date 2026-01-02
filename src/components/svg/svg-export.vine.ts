import type { getSvgFn } from '@/composables/svg'
import type { Settings } from '@/settings'
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'
import { asDataURL, getBlurSvg, getFadeSvg } from '@/composables/svg'
import { CardOption, UiCard } from '@/ui/card-element.vine'
import { UiButton, UiSelect } from '@/ui/forms.vine'

export function SvgExport() {
  const settings = vineProp<Settings>()
  const emit = vineEmits(['cancel'])
  const cancel = () => emit('cancel')

  const svg = computed((): string => {
    const fn: getSvgFn = settings.value.type === 'blur' ? getBlurSvg : getFadeSvg

    return fn(settings.value)
  })

  const { copy: copyToClipboard, copied } = useClipboard({ source: svg })
  const copy = () => {
    copyToClipboard()
  }

  const download = () => {
    const url = asDataURL(svg.value)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.svg'
    a.click()
  }

  return vine`
    <div
      fixed
      inset-0
      backdrop-blur-8
      backdrop-brightness-95
      z-panel-content
      z-1
      flex="~ items-center justify-center col"
      @click.self="cancel"
    >
      <UiCard class="bg-white dark:bg-dark-900 !py-5 w-9/10 sm:w-2/3" flex="~ col gap-2">
        <div flex="~ items-center justify-between" w-full>
          <span font-medium text-lg flex="~ items-center gap-1">
            Export as
            <div i-hugeicons-svg01 />
            SVG
          </span>
          <UiButton type="ghost" @click="cancel"> <div i-ph-x /> </UiButton>
        </div>

        <div flex="~ row gap-3">
          <CardOption>
            <template #label>Appearance </template>
            <UiSelect
              :selects="{
                auto: 'Automatic',
                light: 'Light Only',
                dark: 'Dark Only',
              }"
              v-model="settings.export.svg.appearance"
            />
          </CardOption>

          <CardOption justify-left>
            <template #label>Background </template>
            <input type="checkbox" v-model="settings.export.svg.background" />
          </CardOption>
        </div>

        <pre
          w-full
          text-xs
          dark:bg-neutral-800
          bg-neutral-200
          p2
          rounded
          max-h80
          overflow-x-auto
          whitespace-pre-line
          class="op80 hover:op100 duration-300"
          >{{ svg }}</pre
        >

        <div flex="~ row gap-2 justify-end">
          <UiButton @click="copy" px-3>
            <div v-if="!copied" i-ph-copy />
            <div v-else i-ph-check />
            {{ copied ? 'Copied' : 'Copy Code' }}
          </UiButton>
          <UiButton @click="download" px-3>
            <div i-ph-download />
            Download SVG
          </UiButton>
        </div>
      </UiCard>
    </div>
  `
}
