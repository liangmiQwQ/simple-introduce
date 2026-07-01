<script setup vapor lang="ts">
const model = defineModel<any>()
</script>

<template>
  <textarea
    v-model="model"
    class="border-neutral-300 dark:border-neutral-800 outline-none resize-none p-2 rounded op70 focus:op100"
    duration-100
    h-32
    border
    font-mono
    text-sm
  />
</template>
