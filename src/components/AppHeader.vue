<script setup vapor lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import UiButton from '@/ui/UiButton.vue'

const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
</script>

<template>
  <nav flex="~ justify-between items-center" w-full pr-2>
    <span op90 flex gap-1>
      <span font-medium>Simple</span>
      <span op80>Introduce</span>
      <a
        op60
        text-base
        underline
        class="hidden sm:inline"
        href="https://github.com/liangmiqwq"
        target="_blank"
        rel="noreferrer"
      >by Liang Mi</a>
    </span>
    <div flex="~ items-center gap-1">
      <UiButton title="Toggle dark mode" type="ghost" @click="toggleDarkMode()">
        <div v-if="isDark" i-ph-sun-duotone />
        <div v-else i-ph-moon-duotone />
      </UiButton>
      <UiButton title="GitHub" type="ghost" href="https://github.com/liangmiQwQ/simple-introduce">
        <div class="i-mdi-github" />
      </UiButton>
    </div>
  </nav>
</template>
