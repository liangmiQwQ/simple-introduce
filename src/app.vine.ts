import { ref } from 'vue'

import { Preview } from './text-preview.vine'

export function App() {
  return vine`
    <main class="w-full" flex="~ items-center col gap-3">
      <h1>Simple Introduce</h1>
      <Editor />
      <Preview :text="['Good Morning', 'Good Afternoon']" type="magic" />
    </main>
  `
}

function Editor() {
  const texts = ref('')

  return vine`
    <textarea
      class="rounded border-1 outline-none resize-none font-mono w-1/2 h-50 p-2"
      placeholder="Enter something your want to show there, one per line"
      v-model="texts"
    />
  `
}
