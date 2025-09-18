import { UiCard } from '@/ui/card-element.vine'

export function AppExport() {
  return vine`
    <div
      fixed
      inset-0
      backdrop-blur-8
      backdrop-brightness-95
      z-panel-content
      z-1
      flex="~ items-center justify-center"
    >
      <UiCard> Hello </UiCard>
    </div>
  `
}
