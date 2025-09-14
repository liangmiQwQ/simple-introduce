export interface Settings {
  during: number
  type: 'blur' | 'fade'
  fontSize: number
  texts: string[]
}

export const DEFAULT_SETTINGS: Settings = {
  during: 2000,
  type: 'blur',
  fontSize: 56,
  texts: [
    '👋 Hi there, fellow developer',
    '📱 Tired of boring GitHub profiles?',
    '🎥 We make animated GIFs from your words',
    '✨ Simple, clean, and actually cool',
  ],
}
