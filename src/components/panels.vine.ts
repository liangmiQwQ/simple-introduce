import type { Settings } from '../settings'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch, watchEffect } from 'vue'
import { DEFAULT_SETTINGS } from '../settings'
import { CardOption, UiCard } from '../ui/card-element.vine'
import { TextArea, UiButton, UiInput, UiSelect } from '../ui/forms.vine'
import { getAspect, getHeight } from '../utils'
import { GifPreview } from './gif/gif-preview.vine'
import { SvgPreview } from './svg/svg-preview.vine'

export function PanelPreview() {
  const settings = vineProp<Settings>()
  const mode = vineProp<'svg' | 'gif'>()
  const emit = vineEmits(['export'])
  const height = ref(0)
  const previewer = useTemplateRef('card-preview')
  const width = ref(0)

  function resizeHandle() {
    if (previewer.value) {
      width.value = (previewer.value.$el as HTMLDivElement).offsetWidth

      height.value = getHeight(width.value, settings.value) + 20
    }
  }

  onMounted(() => {
    window.addEventListener('resize', resizeHandle)
    resizeHandle()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandle)
  })

  watch(settings.value, () => {
    resizeHandle()
  })

  const aspect = computed(() => getAspect(width.value, height.value))

  // dynamic update settings
  // regard the components state as data origin instead of globally replacing
  watchEffect(() => {
    settings.value.export.size = {
      width: width.value,
      height: height.value,
    }
  })

  return vine`
    <div flex-1 h-fit flex="~ col gap-2">
      <UiCard w-full class="!py-0">
        <GifPreview ref="card-preview" :height :settings v-if="mode === 'gif'" />
        <SvgPreview ref="card-preview" :height :settings v-else-if="mode === 'svg'" />
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
      <UiButton type="secondary" @click="() => emit('export')" v-if="mode === 'gif'">
        <div i-hugeicons-gif01 />
        Export as GIF
      </UiButton>
      <UiButton type="secondary" @click="() => emit('export')" v-else-if="mode === 'svg'">
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
  `
}

export function PanelSettings({ settings }: { settings: Settings }) {
  const resetSettings = () => {
    Object.assign(settings, DEFAULT_SETTINGS)
  }

  const updateTexts = (text: string) => {
    settings.texts = text.split('\n').filter(line => line.trim())
  }

  const textsValue = computed(() => settings.texts.join('\n'))

  return vine`
    <UiCard class="op80 hover:op100 transition duration-200">
      <div flex="~ gap-6 md:row col lg:col">
        <!-- Animation Settings -->
        <div flex="~ col gap-4" class="w-full md:w-80 lg:w-full">
          <CardOption>
            <template #label>
              <div i-ph-tag-simple-duotone />
              Animation Type
            </template>
            <UiSelect
              :selects="{
                fade: 'Fade',
                blur: 'Blur',
              }"
              v-model="settings.type"
            />
          </CardOption>

          <CardOption>
            <template #label>
              <div i-ph-alarm-duotone />
              Duration (ms)
            </template>
            <UiInput v-model="settings.during" type="number" :min="500" :step="100" />
          </CardOption>

          <CardOption>
            <template #label>
              <div i-ph-magnifying-glass-duotone />
              Font Size
            </template>
            <UiInput v-model="settings.fontSize" type="number" min="12" step="2" />
          </CardOption>

          <CardOption>
            <template #label>
              <div i-ph-text-a-underline-bold />
              Font Family
            </template>
            <UiInput v-model="settings.fontFamily" type="text" />
          </CardOption>

          <CardOption>
            <template #label>
              <div i-ph-align-left-duotone v-if="settings.textAlign === 'left'" />
              <div i-ph-align-center-horizontal-duotone v-else-if="settings.textAlign === 'center'" />
              <div i-ph-align-right-duotone v-else />
              Text Align
            </template>
            <UiSelect
              :selects="{
                left: 'Left',
                center: 'Center',
                right: 'Right',
              }"
              v-model="settings.textAlign"
            />
          </CardOption>
        </div>

        <!-- Content Settings -->
        <div flex="~ col gap-4" flex-1>
          <CardOption mode="col">
            <template #label>
              <div i-ph-cursor-text-duotone />
              Texts (one per line)
            </template>
            <TextArea
              :value="textsValue"
              @input="(e: Event) => updateTexts((e.target as HTMLTextAreaElement).value)"
              placeholder="Enter texts, one per line"
            />
          </CardOption>

          <UiButton @click="resetSettings" type="destructive" text-sm>
            <div i-solar-trash-bin-trash-broken />
            Reset Settings
          </UiButton>
        </div>
      </div>
    </UiCard>
  `
}
