<script setup vapor lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppFooter />
  <main w-full min-h-screen transition-colors duration-300>
    <div class="p-6 md:p-8 lg:p-12" flex="~ col gap-4">
      <AppHeader />
      <RouterView />
    </div>
  </main>
</template>
