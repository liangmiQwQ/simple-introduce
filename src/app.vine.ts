import type { Settings } from './settings'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch, watchEffect } from 'vue'
import VineLogo from '@/assets/vine-logo.png'
import { DEFAULT_SETTINGS } from './settings'
import { CardOption, UiCard } from './ui/card-element.vine'
import { TextArea, UiButton, UiInput, UiSelect } from './ui/forms.vine'
import { Preview } from './ui/text-preview.vine'
import { getAspect, getHeight } from './utils'

export function App() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const isDark = useDark()
  const toggleDarkMode = useToggle(isDark)

  return vine`
    <main w-full min-h-screen transition-colors duration-300>
      <div class="p-6 md:p-8 lg:p-12" flex="~ col gap-4">
        <!-- Header -->
        <nav flex="~ justify-between items-center" w-full px-2>
          <h1 class="text-lg" flex="~ items-center gap-1" op90>
            <span font-medium>Simple</span>
            <span op80>Introduce</span>
            <a op60 text-base underline href="https://github.com/liangmiqwq" target="_blank"
              >by LiangMi</a
            >
          </h1>
          <div flex="~ items-center gap-1">
            <UiButton @click="() => toggleDarkMode()" title="Toggle dark mode" type="ghost">
              <div v-if="isDark" i-ph-sun-duotone />
              <div v-else i-ph-moon-duotone />
            </UiButton>
            <UiButton
              title="Github"
              type="ghost"
              href="https://github.com/liangmiQwQ/simple-introduce"
            >
              <div class="i-mdi-github" />
            </UiButton>
            <div flex="~ items-center gap-2" select-none ml-2>
              <div op50>Made with</div>
              <a
                class="op60 hover:op70"
                cursor-pointer
                font-bold
                flex="~ items-center gap-1"
                href="https://github.com/vue-vine/vue-vine"
                target="_blank"
              >
                <img :src="VineLogo" width="20" height="20" />
                <div flex="~">Vue-Vine</div>
              </a>
            </div>
          </div>
        </nav>

        <!-- Content Area -->
        <div flex="~ col lg:row gap-6" w-full>
          <!-- Settings Panel -->
          <div class="w-full lg:w-96">
            <PanelSettings :settings="settings" />
          </div>

          <!-- Preview Area -->
          <PanelPreview :settings />
        </div>
      </div>
    </main>
  `
}

function PanelPreview() {
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
    <UiCard flex-1 h-fit class="!py-0">
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
  `
}

function PanelSettings({ settings }: { settings: Settings }) {
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
            <template #label>Animation Type:</template>
            <UiSelect
              :selects="{
                fade: 'Fade',
                blur: 'Blur',
              }"
              v-model="settings.type"
            />
          </CardOption>

          <CardOption>
            <template #label>Duration (ms):</template>
            <UiInput v-model="settings.during" type="number" :min="500" :step="100" />
          </CardOption>

          <CardOption>
            <template #label>Font Size: </template>
            <UiInput v-model="settings.fontSize" type="number" min="12" step="2" />
          </CardOption>
        </div>

        <!-- Content Settings -->
        <div flex="~ col gap-4" flex-1>
          <CardOption mode="col">
            <template #label>Texts (one per line): </template>
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
