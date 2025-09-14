export function Select({ selects, modelValue }: {
  selects: Record<any, string>
  modelValue?: any
}) {
  const emit = vineEmits(['update:modelValue'])

  const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLSelectElement).value)
  }

  return vine`
    <select
      :value="modelValue"
      @input="updateValue"
      border
      flex-1
      class="border-neutral-300 dark:border-neutral-600 p-1 px-2 text-sm rounded"
    >
      <option v-for="(item, index) of Object.keys(selects)" :key="item + index" :value="item">
        {{ selects[item] }}
      </option>
    </select>
  `
}

export function Input({ modelValue }: { modelValue?: any }) {
  const emit = vineEmits(['update:modelValue'])

  const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }

  return vine`
    <input
      :value="modelValue"
      @input="updateValue"
      flex-1
      border
      class="border-neutral-300 dark:border-neutral-600 p-1 px-2 text-sm rounded"
    />
  `
}

export function TextArea({ modelValue }: { modelValue?: any }) {
  const emit = vineEmits(['update:modelValue'])

  const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
  }

  return vine`
    <textarea
      :value="modelValue"
      @input="updateValue"
      class="border-neutral-300 dark:border-neutral-600 outline-none resize-none p-2 rounded"
      h-32
      border
      font-mono
      text-sm
    />
  `
}
