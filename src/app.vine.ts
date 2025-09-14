import type { Settings } from './types/settings'
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { DEFAULT_SETTINGS } from './constants/default-settings'
import { Preview } from './text-preview.vine'

export function App() {
  const settings = useLocalStorage<Settings>('simple-introduce-settings', DEFAULT_SETTINGS)
  const isDark = ref(false)

  const toggleDarkMode = () => {
    const current = localStorage.getItem('color-schema') || 'auto'
    let newMode: string

    if (current === 'dark') {
      newMode = 'light'
      isDark.value = false
    }
    else {
      newMode = 'dark'
      isDark.value = true
    }

    localStorage.setItem('color-schema', newMode)
    document.documentElement.classList.toggle('dark', newMode === 'dark')
  }

  onMounted(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const setting = localStorage.getItem('color-schema') || 'auto'
    isDark.value = setting === 'dark' || (prefersDark && setting !== 'light')
  })

  return vine`
    <main w-full class="p-6 md:p-15 lg:p-20" flex="~ items-center col gap-3">
      <div flex="~ justify-between items-center" w-full>
        <h1>Simple Introduce</h1>
        <button
          @click="toggleDarkMode"
          class="border border-slate-300 dark:border-slate-600 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Toggle dark mode"
        >
          <span v-if="isDark">Light Mode</span>
          <span v-else>Dark Mode</span>
        </button>
      </div>
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
    <div w-full flex="~ gap-5 md:row col" p-4 border border-slate-300 dark:border-slate-600 rounded>
      <!-- Animation Settings -->
      <div
        flex="~ col gap-2"
        class="w-full md:w-100 lg:w-120 md:border-r border-slate-300 dark:border-slate-600"
        pr-5
      >
        <h3 font-bold>Animation Settings</h3>

        <div flex="~ col gap-1">
          <label>Animation Type:</label>
          <select v-model="settings.type" border border-slate-300 dark:border-slate-600 p-1 rounded>
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
            border
            border-slate-300
            dark:border-slate-600
            p-1
            rounded
          />
        </div>

        <div flex="~ col gap-1">
          <label>Font Size:</label>
          <input
            type="number"
            v-model="settings.fontSize"
            min="12"
            max="120"
            step="2"
            border
            border-slate-300
            dark:border-slate-600
            p-1
            rounded
          />
        </div>
      </div>

      <!-- Content Settings -->
      <div flex="~ col gap-2" flex-1>
        <h3 font-bold>Text Content</h3>

        <div flex="~ col gap-1">
          <label>Texts (one per line):</label>
          <textarea
            class="border border-slate-300 dark:border-slate-600 outline-none resize-none font-mono p-2 rounded"
            h-30
            :value="textsValue"
            @input="(e: Event) => updateTexts((e.target as HTMLTextAreaElement).value)"
            placeholder="Enter texts, one per line"
          />
        </div>

        <button
          @click="resetSettings"
          border
          border-slate-300
          dark:border-slate-600
          p-2
          bg-slate-100
          dark:bg-slate-800
          hover:bg-slate-200
          dark:hover:bg-slate-700
          rounded
        >
          Reset to Default
        </button>
      </div>
    </div>
  `
}
