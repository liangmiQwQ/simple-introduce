import { ref } from 'vue'

export function useExport() {
  const exporting = ref<boolean>(false)
  const startExport = () => exporting.value = true
  const cancelExport = () => exporting.value = false

  return { exporting, startExport, cancelExport }
}
