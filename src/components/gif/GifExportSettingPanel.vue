<script setup lang="ts">
import type { Settings } from '@/settings'
import CardOption from '@/ui/CardOption.vue'
import UiButton from '@/ui/UiButton.vue'
import UiCard from '@/ui/UiCard.vue'
import UiSelect from '@/ui/UiSelect.vue'

const emit = defineEmits<{
  cancel: []
  next: []
}>()

const settings = defineModel<Settings>('settings', { required: true })

function cancel() {
  emit('cancel')
}

function next() {
  emit('next')
}
</script>

<template>
  <UiCard min-w-100 class="bg-white dark:bg-dark-900">
    <div flex="~ col gap-4">
      <div flex="~ items-center justify-between">
        <span font-medium text-lg>Export Settings </span>
        <UiButton type="ghost" @click="cancel">
          <div i-ph-x />
        </UiButton>
      </div>
      <CardOption>
        <template #label>
          Appearance
        </template>
        <UiSelect
          v-model="settings.export.gif.appearance"
          :selects="{
            both: 'Both',
            light: 'Light Only',
            dark: 'Dark Only',
          }"
        />
      </CardOption>
      <UiButton class="!p1" @click="next">
        Generate GIF
      </UiButton>
    </div>
  </UiCard>
</template>
