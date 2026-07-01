<script setup vapor lang="ts">
const model = defineModel<any>()
</script>

<template>
  <input
    v-model="model"
    flex-1
    border
    outline-none
    class="border-neutral-300 dark:border-neutral-800 p-1 px-2 text-sm rounded op70 focus:op100"
    duration-100
  >
</template>
