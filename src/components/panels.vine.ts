import type { Settings } from '../settings'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { DEFAULT_SETTINGS } from '../settings'
import { CardOption, UiCard } from '../ui/card-element.vine'
import { TextArea, UiButton, UiInput, UiSelect } from '../ui/forms.vine'
import { Preview } from '../ui/text-preview.vine'
import { getAspect, getHeight } from '../utils'

export function PanelPreview() {
  const settings = vineProp<Settings>()
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

  return vine`
    <div flex-1 h-fit flex="~ col gap-2">
      <UiCard w-full class="!py-0">
        <Preview ref="card-preview" :height :settings="settings" />
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
      <UiButton type="secondary">
        <div i-hugeicons-gif01 />
        Export as GIF
      </UiButton>
    </div>
  `
}

export function PanelSettings({ settings }: { settings: Settings }) {
  const resetSettings = () => {
    Object.assign(settings, DEFAULT_SETTINGS)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const updateTexts = (text: string) => {
    settings.texts = text.split('\n').filter(line => line.trim())
  }

  const textsValue = computed(() => settings.texts.join('\n'))

  return vine`
    <UiCard>
      <div flex="~ gap-6 md:row col lg:col">
        <!-- Animation Settings -->
        <div flex="~ col gap-4" class="w-full md:w-80 lg:w-full">
          <CardOption>
            <template #label>Animation Type</template>
            <UiSelect
              :selects="{
                fade: 'Fade',
                blur: 'Blur',
              }"
              v-model="settings.type"
            />
          </CardOption>

          <CardOption>
            <template #label>Duration (ms)</template>
            <UiInput v-model="settings.during" type="number" :min="500" :step="100" />
          </CardOption>

          <CardOption>
            <template #label>Font Size</template>
            <UiInput v-model="settings.fontSize" type="number" min="12" step="2" />
          </CardOption>

          <CardOption>
            <template #label>Text Align</template>
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
            <template #label>Texts (one per line)</template>
            <TextArea
              :value="textsValue"
              @input="(e: Event) => updateTexts((e.target as HTMLTextAreaElement).value)"
              placeholder="Enter texts, one per line"
            />
          </CardOption>

          <UiButton @click="resetSettings" type="destructive"> Reset to Default </UiButton>
        </div>
      </div>
    </UiCard>
  `
}
