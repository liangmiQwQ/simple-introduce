export interface Settings {
  during: number
  type: 'blur' | 'fade'
  fontSize: number
  fontFamily: string
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

export const DEFAULT_SETTINGS: Settings = {
  during: 2000,
  type: 'blur',
  fontSize: 56,
  fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  textAlign: 'left',
  texts: [
    '👋 Hi there, fellow developer',
    '📱 Tired of boring GitHub profiles?',
    '🎥 We make animated images from your words',
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
