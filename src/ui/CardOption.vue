<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  mode?: 'row' | 'col'
}>(), {
  mode: 'row',
})

const style = computed((): StyleValue => {
  if (props.mode === 'row') {
    return {
      alignItems: 'center',
    }
  }

  return {
    flexDirection: 'column',
  }
})
</script>

<template>
  <div flex="~ gap-2 justify-between" :style="style">
    <label class="text-sm font-medium" flex="~ gap-1.5 items-center" text-sm op85>
      <slot name="label" />
    </label>

    <slot />
  </div>
</template>
