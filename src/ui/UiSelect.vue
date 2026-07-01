<script setup vapor lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  selects: Record<string, string>
}>()

const model = defineModel<any>()
const options = computed(() => Object.entries(props.selects))
</script>

<template>
  <select
    v-model="model"
    border
    flex-1
    duration-100
    outline-none
    class="border-neutral-300 dark:border-neutral-800 p-1 px-2 text-sm rounded op70 focus:op100"
  >
    <option v-for="[value, label] of options" :key="value" :value="value">
      {{ label }}
    </option>
  </select>
</template>
