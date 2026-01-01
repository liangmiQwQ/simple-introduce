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

export const DEFAULT_SETTINGS: Settings = {
  during: 2000,
  type: 'blur',
  fontSize: 56,
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
