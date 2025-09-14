import { computed } from 'vue'

export function UiSelect({ selects, modelValue }: {
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
      class="border-neutral-300 dark:border-neutral-800 p-1 px-2 text-sm rounded"
    >
      <option v-for="(item, index) of Object.keys(selects)" :key="item + index" :value="item">
        {{ selects[item] }}
      </option>
    </select>
  `
}

export function UiInput({ modelValue }: { modelValue?: any }) {
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
      class="border-neutral-300 dark:border-neutral-800 p-1 px-2 text-sm rounded"
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
      class="border-neutral-300 dark:border-neutral-800 outline-none resize-none p-2 rounded"
      h-32
      border
      font-mono
      text-sm
    />
  `
}

export function UiButton() {
  const type = vineProp.withDefault<'default' | 'destructive' | 'ghost'>('default')
  const href = vineProp.withDefault('')

  const typeClassMap: Record<typeof type.value, string> = {
    default: 'border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900',
    destructive: 'border border-red-400 dark:border-none dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800',
    ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
  }

  const componentType = computed(() => href.value ? 'a' : 'button')

  return vine`
    <component
      :is="componentType"
      :href
      target="_blank"
      :class="typeClassMap[type]"
      cursor-pointer
      p-1
      rounded
      transition-colors
    >
      <slot />
    </component>
  `
}
