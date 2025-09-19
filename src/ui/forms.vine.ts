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
      duration-100
      outline-none
      class="border-neutral-300 dark:border-neutral-800 p-1 px-2 text-sm rounded op70 focus:op100"
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
      outline-none
      class="border-neutral-300 dark:border-neutral-800 p-1 px-2 text-sm rounded op70 focus:op100"
      duration-100
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
      class="border-neutral-300 dark:border-neutral-800 outline-none resize-none p-2 rounded op70 focus:op100"
      duration-100
      h-32
      border
      font-mono
      text-sm
    />
  `
}

export function UiButton() {
  const type = vineProp.withDefault<'default' | 'destructive' | 'secondary' | 'ghost'>('default')
  const href = vineProp.withDefault('')

  const typeClassMap: Record<typeof type.value, string> = {
    default: 'border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 op85 hover:op100',
    secondary: 'bg-neutral-200 dark:bg-neutral-800 op80 hover:op100',
    destructive: 'border border-red-400 dark:border-none dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 op80 hover:op100',
    ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
  }

  const componentType = computed(() => href.value ? 'a' : 'button')

  return vine`
    <component
      :is="componentType"
      :href
      target="_blank"
      :class="typeClassMap[type]"
      cursor-pointer
      rounded
      duration-150
      flex="~ justify-center items-center gap-1"
      class="p1.5"
    >
      <slot />
    </component>
  `
}
