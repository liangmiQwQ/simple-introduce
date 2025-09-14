import type { StyleValue } from 'vue'
import { computed } from 'vue'

export function Card() {
  return vine`
    <div border border-neutral-200 dark:border-neutral-700 rounded shadow-sm p-4 transition-colors>
      <slot />
    </div>
  `
}

export function CardOption() {
  const mode = vineProp.withDefault<'row' | 'col'>('row')

  const style = computed((): StyleValue => {
    if (mode.value === 'row') {
      return {
        alignItems: 'center',
      }
    }
    else {
      return {
        flexDirection: 'column',
      }
    }
  })

  return vine`
    <div flex="~ gap-2 " :style>
      <label class="text-sm font-medium"><slot name="label" /></label>

      <slot />
    </div>
  `
}
