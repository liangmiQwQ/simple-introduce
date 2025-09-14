import type { Settings } from './settings'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { DEFAULT_SETTINGS } from './settings'
import { Preview } from './text-preview.vine'
import { Card, CardOption } from './ui/card-element.vine'
import { Input, Select, TextArea } from './ui/forms.vine'

export function App() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const isDark = useDark()
  const toggleDarkMode = useToggle(isDark)

  return vine`
    <main w-full min-h-screen transition-colors duration-300>
      <div class="p-6 md:p-8 lg:p-12" flex="~ col gap-4">
        <!-- Header -->
        <nav flex="~ justify-between items-center" w-full>
          <h1 class="text-lg font-medium">Simple Introduce</h1>
          <button
            @click="() => toggleDarkMode()"
            border
            rounded
            class="border-neutral-300 dark:border-neutral-600 p-1"
            title="Toggle dark mode"
          >
            <span v-if="isDark">Light Mode</span>
            <span v-else>Dark Mode</span>
          </button>
        </nav>

        <!-- Content Area -->
        <div flex="~ col lg:row gap-6" w-full>
          <!-- Settings Panel -->
          <div class="w-full lg:w-96">
            <AppSettings :settings="settings" />
          </div>

          <!-- Preview Area -->
          <div class="flex-1 min-h-96">
            <Preview :texts="settings.texts" :settings="settings" />
          </div>
        </div>
      </div>
    </main>
  `
}

function AppSettings({ settings }: { settings: Settings }) {
  const resetSettings = () => {
    Object.assign(settings, DEFAULT_SETTINGS)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const updateTexts = (text: string) => {
    settings.texts = text.split('\n').filter(line => line.trim())
  }

  const textsValue = computed(() => settings.texts.join('\n'))

  return vine`
    <Card>
      <div flex="~ gap-6 md:row col lg:col">
        <!-- Animation Settings -->
        <div flex="~ col gap-4" class="w-full md:w-80 lg:w-full">
          <CardOption>
            <template #label>Animation Type:</template>
            <Select
              :selects="{
                fade: 'Fade',
                blur: 'Blur',
              }"
              v-model="settings.type"
            />
          </CardOption>

          <CardOption>
            <template #label>Duration (ms):</template>
            <Input v-model="settings.during" type="number" :min="500" :step="100" />
          </CardOption>

          <CardOption>
            <template #label>Font Size: </template>
            <Input v-model="settings.fontSize" type="number" min="12" step="2" />
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

          <button
            @click="resetSettings"
            class="border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 p-1 rounded"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </Card>
  `
}
