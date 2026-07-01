<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  steps: string[]
  currentStep?: number
}>(), {
  currentStep: 0,
})

const style = computed((): StyleValue => ({
  width: `${100 * ((props.currentStep + 1) / props.steps.length)}%`,
}))
</script>

<template>
  <div py8 font-medium text-sm select-none flex="~ col items-center gap-2" min-w-80>
    <div flex="~ items-center gap-2">
      <span>Step</span>
      <span>{{ currentStep }} of {{ steps.length - 1 }}</span>
      <span>{{ steps[currentStep] }}</span>
    </div>
    <div rounded-full w-full h-2 of-hidden op50>
      <div :style="style" class="h-full" duration-300 dark:bg-white bg-neutral-400 />
    </div>
  </div>
</template>
