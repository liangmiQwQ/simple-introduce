<script setup vapor lang="ts">
import { computed } from 'vue'

type ButtonType = 'default' | 'destructive' | 'secondary' | 'ghost'

const props = withDefaults(defineProps<{
  type?: ButtonType
  href?: string
}>(), {
  type: 'default',
  href: '',
})

const typeClassMap: Record<ButtonType, string> = {
  default: 'border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 op85 hover:op100',
  secondary: 'bg-neutral-200 dark:bg-neutral-800 op80 hover:op100',
  destructive: 'border border-red-400 dark:border-none dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900 op80 hover:op90',
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
}

const componentType = computed(() => props.href ? 'a' : 'button')
const buttonClass = computed(() => typeClassMap[props.type])
</script>

<template>
  <component
    :is="componentType"
    :href="props.href || undefined"
    :target="props.href ? '_blank' : undefined"
    :rel="props.href ? 'noreferrer' : undefined"
    :class="buttonClass"
    cursor-pointer
    rounded
    duration-150
    flex="~ justify-center items-center gap-1"
    class="p1.5 py-1.2"
  >
    <slot />
  </component>
</template>
