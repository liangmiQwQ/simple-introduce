import { computed, ref } from 'vue'

// Inspired by https://github.com/slidevjs/slidev/blob/453f1dffaf38347c00f9b0d659bba1e18112476c/packages/client/logic/screenshot.ts
export async function startScreenshotSession(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d', { willReadFrequently: true })!
  const video = document.createElement('video')
  video.width = width
  video.height = height

  const isRecording = ref(false)
  const frames: ImageData[] = []

  const captureStream = ref<MediaStream | null>(await navigator.mediaDevices.getDisplayMedia({
    video: {
      // Use 60 fps to record GIF
      frameRate: 60,
      // @ts-expect-error missing types
      cursor: 'never',
    },
    // use self browser to make sure the user choose the proper
    selfBrowserSurface: 'include',
    preferCurrentTab: true,
  }))
  captureStream.value!.addEventListener('inactive', dispose)

  video.srcObject = captureStream.value!
  video.play()

  // collect frames to make GIF
  function startRecording(element: HTMLElement) {
    if (!captureStream.value)
      throw new Error('captureStream inactive')

    const { left, top, width: elWidth } = element.getBoundingClientRect()
    isRecording.value = true

    const capture = () => {
      if (isRecording.value) {
        context.clearRect(0, 0, width, height)
        context.drawImage(
          video,
          left * window.devicePixelRatio,
          top * window.devicePixelRatio,
          elWidth * window.devicePixelRatio,
          elWidth / width * height * window.devicePixelRatio,
          0,
          0,
          width,
          height,
        )

        const imageData = context.getImageData(0, 0, width, height)
        frames.push(imageData)

        requestAnimationFrame(capture)
      }
    }

    capture()
  }

  function stopRecording() {
    isRecording.value = false
  }

  function exportAsGIF() {
    // TODO
  }

  function dispose() {
    captureStream.value?.getTracks().forEach(track => track.stop())
    captureStream.value = null
    frames.length = 0
  }

  return {
    isActive: computed(() => !!captureStream.value),
    startRecording,
    stopRecording,
    exportAsGIF,
    dispose,
    frames,
  }
}

export type ScreenshotSession = Awaited<ReturnType<typeof startScreenshotSession>>

export const chromeVersion = window.navigator.userAgent.match(/Chrome\/(\d+)/)?.[1]
