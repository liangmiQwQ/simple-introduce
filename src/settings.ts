export interface Settings {
  during: number
  type: 'blur' | 'fade'
  fontSize: number
  textAlign: 'left' | 'center' | 'right'
  texts: string[]
  export: {
    appearance: 'dark' | 'light' | 'both'
    size: {
      width: number
      height: number
    }
  }
}

export interface SvgSettings {
  texts: string[]
  fontSize: number
  textAlign: 'left' | 'center' | 'right'
  animation: 'fade' | 'blur'
  duration: number
  width: number
  height: number
  theme: 'light' | 'dark'
}

export const DEFAULT_SETTINGS: Settings = {
  during: 2000,
  type: 'blur',
  fontSize: 56,
  textAlign: 'left',
  texts: [
    '👋 Hi there, fellow developer',
    '📱 Tired of boring GitHub profiles?',
    '🎥 We make animated GIFs from your words',
    '✨ Simple, clean, and actually cool',
  ],
  export: {
    appearance: 'both',
    size: {
      width: 0,
      height: 0,
    },
  },
}

export const DEFAULT_SVG_SETTINGS: SvgSettings = {
  texts: [
    '👋 Hi there, fellow developer',
    '🎨 SVG animations are crisp & scalable',
    '⚡️ Smaller file size, better quality',
    '✨ Try it out now!',
  ],
  fontSize: 48,
  textAlign: 'center',
  animation: 'fade',
  duration: 2000,
  width: 800,
  height: 200,
  theme: 'light',
}
