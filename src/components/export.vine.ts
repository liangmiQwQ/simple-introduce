import type { StyleValue } from 'vue'
import type { Settings } from '@/settings'
import { computed } from 'vue'
import { CardOption, UiCard } from '@/ui/card-element.vine'
import { UiButton, UiSelect } from '@/ui/forms.vine'

export function AppExport() {
  const settings = vineProp<Settings>()
  const emit = vineEmits(['cancel'])
  const cancel = () => emit('cancel')

  return vine`
    <div
      fixed
      inset-0
      backdrop-blur-8
      backdrop-brightness-95
      z-panel-content
      z-1
      flex="~ items-center justify-between col"
      @click.self="cancel"
    >
      <div />
      <UiCard min-w-100 class="bg-white dark:bg-dark-900">
        <div flex="~ col gap-4">
          <div flex="~ items-center justify-between">
            <span font-medium text-lg>Export Settings </span>
            <UiButton type="ghost" @click="cancel"> <div i-ph-x /> </UiButton>
          </div>
          <CardOption>
            <template #label>Appearance</template>
            <UiSelect
              :selects="{
                both: 'Both',
                light: 'Light Only',
                dark: 'Dark Only',
              }"
              v-model="settings.export.appearance"
            />
          </CardOption>
          <UiButton class="!p1">Generate GIF</UiButton>
        </div>
      </UiCard>
      <ExportProgress :steps="['Configuration']" />
    </div>
  `
}

export function ExportProgress() {
  const steps = vineProp<string[]>()
  const currentStep = vineProp.withDefault(0)

  const style = computed((): StyleValue => ({
    width: `${100 * (currentStep.value + 1 / steps.value.length)}%`,
  }))

  return vine`
    <div py8 font-medium text-sm select-none flex="~ col items-center gap-2" min-w-80>
      <div flex="~ items-center gap-2">
        <span>{{ steps[currentStep] }}</span>
        <span>{{ currentStep }} of {{ steps.length - 1 }}</span>
      </div>
      <div rounded-full w-full h-2 of-hidden op50>
        <div :style class="h-full" duration-300 dark:bg-white bg-neutral-400 />
      </div>
    </div>
  `
}
