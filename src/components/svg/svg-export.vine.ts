import type { Settings } from '@/settings'
import { UiCard } from '@/ui/card-element.vine'
import { UiButton } from '@/ui/forms.vine'

export function SvgExport() {
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
      flex="~ items-center justify-center col"
      @click.self="cancel"
    >
      <UiCard class="bg-white dark:bg-dark-900 !py-5 max-w-2/3" flex="~ col gap-1">
        <div flex="~ items-center justify-between" w-full>
          <span font-medium text-lg flex="~ items-center gap-1">
            Export as
            <div i-hugeicons-svg01 />
            SVG
          </span>
          <UiButton type="ghost" @click="cancel"> <div i-ph-x /> </UiButton>
        </div>
        <!-- Content there -->
      </UiCard>
    </div>
  `
}
