import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VineLogo from '@/assets/vine-logo.png'
import { UiButton } from './ui/forms.vine'

export function App() {
  return vine`
    <Footer />
    <main w-full min-h-screen transition-colors duration-300>
      <div class="p-6 md:p-8 lg:p-12" flex="~ col gap-4">
        <!-- Header -->
        <AppHeader />

        <!-- Router View -->
        <RouterView />
      </div>
    </main>
  `
}

function AppHeader() {
  const isDark = useDark()
  const toggleDarkMode = useToggle(isDark)
  const router = useRouter()
  const route = useRoute()

  const isGif = computed(() => route.path === '/gif')
  const isSvg = computed(() => route.path === '/svg')

  return vine`
    <!-- Header -->
    <nav flex="~ justify-between items-center" w-full pr-2>
      <div flex="~ items-center gap-1">
        <UiButton px-4 :type="isGif ? 'default' : 'ghost'" @click="router.push('/gif')">
          <div i-hugeicons-gif01 />
          .gif
        </UiButton>
        <UiButton px-4 :type="isSvg ? 'default' : 'ghost'" @click="router.push('/svg')">
          <div i-hugeicons-svg01 />
          .svg
        </UiButton>
      </div>
      <div flex="~ items-center gap-1">
        <UiButton @click="() => toggleDarkMode()" title="Toggle dark mode" type="ghost">
          <div v-if="isDark" i-ph-sun-duotone />
          <div v-else i-ph-moon-duotone />
        </UiButton>
        <UiButton title="Github" type="ghost" href="https://github.com/liangmiQwQ/simple-introduce">
          <div class="i-mdi-github" />
        </UiButton>
        <span op90 flex gap-1>
          <span font-medium>Simple</span>
          <span op80>Introduce</span>
          <a op60 text-base underline href="https://github.com/liangmiqwq" target="_blank"
            >by Liang Mi</a
          >
        </span>
      </div>
    </nav>
  `
}

function Footer() {
  return vine`
    <div flex="~ items-center gap-2" select-none ml-2 fixed bottom-5 right-5>
      <div op50>Made with</div>
      <a
        class="op60 hover:op70"
        cursor-pointer
        font-bold
        flex="~ items-center gap-1"
        href="https://github.com/vue-vine/vue-vine"
        target="_blank"
      >
        <img :src="VineLogo" width="20" height="20" />
        <div flex="~">Vue-Vine</div>
      </a>
    </div>
  `
}
