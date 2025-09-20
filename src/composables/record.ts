import GIF from 'gif.js'
import gifWorkerURL from 'gif.js/dist/gif.worker.js?url'
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

  async function exportAsGIF() {
    if (frames.length === 0) {
      throw new Error('No frames to export')
    }

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width,
      height,
      workerScript: gifWorkerURL,
    })

    // Add each frame to the GIF
    for (const frame of frames) {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = width
      tempCanvas.height = height
      const tempCtx = tempCanvas.getContext('2d')!
      tempCtx.putImageData(frame, 0, 0)

      gif.addFrame(tempCtx, { delay: 1000 / 60 }) // 60fps
    }

    // Generate and download the GIF
    return new Promise<void>((resolve) => {
      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'introduction.gif'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        resolve()
      })

      gif.render()
    })
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
