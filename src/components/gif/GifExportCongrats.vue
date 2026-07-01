<script setup lang="ts">
import UiButton from '@/ui/UiButton.vue'
import UiCard from '@/ui/UiCard.vue'

const emit = defineEmits<{
  cancel: []
}>()

function cancel() {
  emit('cancel')
}
</script>

<template>
  <UiCard w-100 class="bg-white dark:bg-dark-900 !py-5" flex="~ col gap-1">
    <div flex="~ items-center justify-between" w-full>
      <span font-bold text-lg>Congrats 🎉</span>
      <UiButton type="ghost" @click="cancel">
        <div i-ph-x />
      </UiButton>
    </div>
    <span op50 text-sm>
      Your GIF is ready — perfect for your GitHub profile, README, or anywhere you like!
    </span>
  </UiCard>
</template>
