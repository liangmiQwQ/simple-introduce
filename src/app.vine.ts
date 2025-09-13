import { ref } from 'vue'

import { Preview } from './text-preview.vine'

export function App() {
  return vine`
    <main w-full p-20 flex="~ items-center col gap-3">
      <h1>Simple Introduce</h1>
      <Settings />
      <Preview
        :texts="['👋 Hi There', '🍯 I am Liangmi', '🤔 A Student Developer']"
        :settings="{
          during: 2000,
          type: 'blur',
          fontSize: 56,
        }"
      />
    </main>
  `
}

function Settings() {
  const texts = ref('')

  return vine`
    <div w-full h-50 flex="~ gap-5">
      <textarea
        class="rounded border-1 outline-none resize-none font-mono p-2"
        flex="1"
        placeholder="Enter something your want to show there, one per line"
        v-model="texts"
      />
      <textarea
        class="rounded border-1 outline-none resize-none font-mono p-2"
        flex="1"
        placeholder="Settings"
        v-model="texts"
      />
    </div>
  `
}
