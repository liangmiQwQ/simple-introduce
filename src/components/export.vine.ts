import type { StyleValue } from 'vue'
import type { Settings } from '@/settings'
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import { CardOption, UiCard } from '@/ui/card-element.vine'
import { UiButton, UiSelect } from '@/ui/forms.vine'
import { Preview } from '@/ui/text-preview.vine'

interface ExportProcess {
  current: number
  steps: string[]
}

export function AppExport() {
  const settings = vineProp<Settings>()
  const emit = vineEmits(['cancel'])
  const cancel = () => emit('cancel')

  // for export process
  const process = reactive<ExportProcess>({
    current: 0,
    steps: [
      'Configuration',
      'Record (Light)',
      'Record (Dark)',
      'Complete',
    ],
  })
  const next = () => process.current++

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
      <SettingPanel v-if="process.current === 0" :settings @cancel="cancel" @next="next" />
      <RecordingDisplay v-else-if="process.current === 1" appearance="light" :settings @next="next" />
      <RecordingDisplay v-else-if="process.current === 2" appearance="dark" :settings @next="next" />
      <Congrats v-else-if="process.current === 3" @cancel="cancel" />
      <ExportProgress :steps="process.steps" :current-step="process.current" />
    </div>
  `
}

function RecordingDisplay() {
  const settings = vineProp<Settings>()
  const appearance = vineProp<'dark' | 'light'>()
  const emit = vineEmits(['next'])

  const rawSettings = toRaw(settings)
  const next = () => emit('next')
  const scale = ref<number>(
    Math.min(
      (document.body.offsetHeight - 100) * 0.9 / rawSettings.value.export.size.height,
      document.body.offsetWidth * 0.9 / rawSettings.value.export.size.width,
    ),
  )

  const style = computed((): StyleValue => ({
    scale: scale.value,
    ...(appearance.value === 'dark' && {
      background: 'black',
    }),
    ...(appearance.value === 'light' && {
      background: 'white',
    }),
  }))

  onMounted(() => (settings.value.export.appearance !== 'both' && settings.value.export.appearance !== appearance.value) && next())

  return vine`
    <!-- Recording Container -->
    <div light px-4 :style>
      <Preview
        :settings
        :width="rawSettings.export.size.width"
        :height="rawSettings.export.size.height"
        :appearance
        @finishOnce="next"
      />
    </div>
  `
}

function Congrats() {
  const emit = vineEmits(['cancel', 'next'])
  const cancel = () => emit('cancel')

  return vine`
    <UiCard w-100 class="bg-white dark:bg-dark-900 !py-5" flex="~ col gap-1">
      <div flex="~ items-center justify-between" w-full>
        <span font-bold text-lg>Congrats 🎉</span>
        <UiButton type="ghost" @click="cancel"> <div i-ph-x /> </UiButton>
      </div>
      <span op50 text-sm>
        Your GIF is ready — perfect for your GitHub profile, README, or anywhere you like!
      </span>
    </UiCard>
  `
}

function SettingPanel() {
  const settings = vineProp<Settings>()
  const emit = vineEmits(['cancel', 'next'])
  const cancel = () => emit('cancel')
  const next = () => emit('next')

  return vine`
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
        <UiButton class="!p1" @click="next">Generate GIF</UiButton>
      </div>
    </UiCard>
  `
}

function ExportProgress() {
  const steps = vineProp<string[]>()
  const currentStep = vineProp.withDefault(0)

  const style = computed((): StyleValue => ({
    width: `${100 * ((currentStep.value + 1) / steps.value.length)}%`,
  }))

  return vine`
    <div py8 font-medium text-sm select-none flex="~ col items-center gap-2" min-w-80>
      <div flex="~ items-center gap-2">
        <span>Step</span>
        <span>{{ currentStep }} of {{ steps.length - 1 }}</span>
        <span>{{ steps[currentStep] }}</span>
      </div>
      <div rounded-full w-full h-2 of-hidden op50>
        <div :style class="h-full" duration-300 dark:bg-white bg-neutral-400 />
      </div>
    </div>
  `
}
