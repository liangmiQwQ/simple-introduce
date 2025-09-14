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
    <main w-full min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300>
      <div class="p-6 md:p-8 lg:p-12" flex="~ col gap-6">
        <!-- Header -->
        <div flex="~ justify-between items-center" w-full>
          <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Simple Introduce
          </h1>
          <button
            @click="toggleDarkMode"
            class="border border-neutral-300 dark:border-neutral-600 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Toggle dark mode"
          >
            <span v-if="isDark" class="text-neutral-700 dark:text-neutral-300">Light Mode</span>
            <span v-else class="text-neutral-700 dark:text-neutral-300">Dark Mode</span>
          </button>
        </div>

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
    <div
      w-full
      bg-white
      dark:bg-neutral-800
      border
      border-neutral-200
      dark:border-neutral-700
      rounded-lg
      shadow-sm
      p-6
      transition-colors
    >
      <div flex="~ gap-6 md:row col lg:col">
        <!-- Animation Settings -->
        <div flex="~ col gap-4" class="w-full md:w-80">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Animation Settings
          </h3>

          <div flex="~ col gap-2">
            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Animation Type:
            </label>
            <select
              v-model="settings.type"
              class="border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="blur">Blur</option>
              <option value="fade">Fade</option>
            </select>
          </div>

          <div flex="~ col gap-2">
            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Duration (ms):
            </label>
            <input
              type="number"
              v-model="settings.during"
              min="500"
              max="10000"
              step="100"
              class="border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div flex="~ col gap-2">
            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Font Size:
            </label>
            <input
              type="number"
              v-model="settings.fontSize"
              min="12"
              max="120"
              step="2"
              class="border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <!-- Content Settings -->
        <div flex="~ col gap-4" flex-1>
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Text Content</h3>

          <div flex="~ col gap-2">
            <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Texts (one per line):
            </label>
            <textarea
              class="border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 outline-none resize-none font-mono p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              h-32
              :value="textsValue"
              @input="(e: Event) => updateTexts((e.target as HTMLTextAreaElement).value)"
              placeholder="Enter texts, one per line"
            />
          </div>

          <button
            @click="resetSettings"
            class="border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors font-medium"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  `
}
