<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '@/ui/UiButton.vue'

const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
const router = useRouter()
const route = useRoute()

const isSvg = computed(() => route.path === '/svg')
const isGif = computed(() => route.path === '/gif')
</script>

<template>
  <nav flex="~ justify-between items-center" w-full pr-2>
    <div flex="~ items-center gap-1">
      <UiButton px-4 :type="isSvg ? 'secondary' : 'ghost'" @click="router.push('/svg')">
        <div i-hugeicons-svg01 />
        <span class="hidden sm:inline">.svg</span>
      </UiButton>
      <UiButton px-4 :type="isGif ? 'secondary' : 'ghost'" @click="router.push('/gif')">
        <div i-hugeicons-gif01 />
        <span class="hidden sm:inline">.gif</span>
      </UiButton>
    </div>
    <div flex="~ items-center gap-1">
      <UiButton title="Toggle dark mode" type="ghost" @click="toggleDarkMode()">
        <div v-if="isDark" i-ph-sun-duotone />
        <div v-else i-ph-moon-duotone />
      </UiButton>
      <UiButton title="GitHub" type="ghost" href="https://github.com/liangmiQwQ/simple-introduce">
        <div class="i-mdi-github" />
      </UiButton>
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
    </div>
  </nav>
</template>
