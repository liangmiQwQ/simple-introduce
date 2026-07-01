<script setup vapor lang="ts">
import type { Settings } from '@/settings'
import { computed } from 'vue'
import { DEFAULT_SETTINGS } from '@/settings'
import CardOption from '@/ui/CardOption.vue'
import TextArea from '@/ui/TextArea.vue'
import UiButton from '@/ui/UiButton.vue'
import UiCard from '@/ui/UiCard.vue'
import UiInput from '@/ui/UiInput.vue'
import UiSelect from '@/ui/UiSelect.vue'

const settings = defineModel<Settings>('settings', { required: true })

function resetSettings() {
  Object.assign(settings.value, DEFAULT_SETTINGS)
}

function updateTexts(text: string) {
  settings.value.texts = text.split('\n').filter(line => line.trim())
}

const textsValue = computed({
  get: () => settings.value.texts.join('\n'),
  set: updateTexts,
})
</script>

<template>
  <UiCard class="op80 hover:op100 transition duration-200">
    <div flex="~ gap-6 md:row col lg:col">
      <div flex="~ col gap-4" class="w-full md:w-80 lg:w-full">
        <CardOption>
          <template #label>
            <div i-ph-tag-simple-duotone />
            Animation Type
          </template>
          <UiSelect
            v-model="settings.type"
            :selects="{
              fade: 'Fade',
              blur: 'Blur',
            }"
          />
        </CardOption>

        <CardOption>
          <template #label>
            <div i-ph-alarm-duotone />
            Duration (ms)
          </template>
          <UiInput v-model="settings.during" type="number" :min="500" :step="100" />
        </CardOption>

        <CardOption>
          <template #label>
            <div i-ph-magnifying-glass-duotone />
            Font Size
          </template>
          <UiInput v-model="settings.fontSize" type="number" min="12" step="2" />
        </CardOption>

        <CardOption>
          <template #label>
            <div i-ph-text-a-underline-bold />
            Font Family
          </template>
          <UiInput v-model="settings.fontFamily" type="text" />
        </CardOption>

        <CardOption>
          <template #label>
            <div v-if="settings.textAlign === 'left'" i-ph-align-left-duotone />
            <div v-else-if="settings.textAlign === 'center'" i-ph-align-center-horizontal-duotone />
            <div v-else i-ph-align-right-duotone />
            Text Align
          </template>
          <UiSelect
            v-model="settings.textAlign"
            :selects="{
              left: 'Left',
              center: 'Center',
              right: 'Right',
            }"
          />
        </CardOption>
      </div>

      <div flex="~ col gap-4" flex-1>
        <CardOption mode="col">
          <template #label>
            <div i-ph-cursor-text-duotone />
            Texts (one per line)
          </template>
          <TextArea
            v-model="textsValue"
            placeholder="Enter texts, one per line"
          />
        </CardOption>

        <UiButton text-sm type="destructive" @click="resetSettings">
          <div i-solar-trash-bin-trash-broken />
          Reset Settings
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>
