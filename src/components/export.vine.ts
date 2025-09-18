import type { Settings } from '@/settings'
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
      flex="~ items-center justify-center"
      @click.self="cancel"
    >
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
    </div>
  `
}
