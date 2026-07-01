<template>
  <div
    flex="~ items-center gap-2"
    select-none
    ml-2
    fixed
    bottom-5
    right-5
    class="hidden sm:flex z-10"
  >
    <div op50>
      Made with
    </div>
    <a
      class="op60 hover:op70"
      cursor-pointer
      font-bold
      flex="~ items-center gap-1"
      href="https://vuejs.org/"
      target="_blank"
      rel="noreferrer"
    >
      <div i-mdi-vuejs />
      <div flex="~">
        Vue
      </div>
    </a>
  </div>
</template>
