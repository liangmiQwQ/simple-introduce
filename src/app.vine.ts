import type { Settings } from './types/settings'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { DEFAULT_SETTINGS } from './constants/default-settings'
import { Preview } from './text-preview.vine'

export function App() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)

  return vine`
    <main w-full p-20 flex="~ items-center col gap-3">
      <h1>Simple Introduce</h1>
      <AppSettings :settings="settings" />
      <Preview :texts="settings.texts" :settings="settings" />
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
    <div w-full flex="~ wrap gap-5" p-4 border-1>
      <div flex="~ col gap-2" w-100 border-r-1 pr-5>
        <h3 font-bold>Animation Settings</h3>

        <div flex="~ col gap-1">
          <label>Animation Type:</label>
          <select v-model="settings.type" border-1 p-1>
            <option value="blur">Blur</option>
            <option value="fade">Fade</option>
          </select>
        </div>

        <div flex="~ col gap-1">
          <label>Duration (ms):</label>
          <input
            type="number"
            v-model="settings.during"
            min="500"
            max="10000"
            step="100"
            border-1
            p-1
          />
        </div>

        <div flex="~ col gap-1">
          <label>Font Size:</label>
          <input type="number" v-model="settings.fontSize" min="12" max="120" step="2" border-1 p-1 />
        </div>
      </div>

      <div flex="~ col gap-2" flex-1>
        <h3 font-bold>Text Content</h3>

        <div flex="~ col gap-1">
          <label>Texts (one per line):</label>
          <textarea
            class="border-1 outline-none resize-none font-mono p-2"
            h-20
            :value="textsValue"
            @input="(e: Event) => updateTexts((e.target as HTMLTextAreaElement).value)"
            placeholder="Enter texts, one per line"
          />
        </div>

        <button @click="resetSettings" border-1 p-2 bg-gray-100 hover:bg-gray-200>
          Reset to Default
        </button>
      </div>
    </div>
  `
}
