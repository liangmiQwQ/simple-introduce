import type { SvgSettings } from '../settings'

export function generateSvg(settings: SvgSettings): string {
  const { texts, fontSize, textAlign, animation, duration, width, height, theme } = settings

  const bgColor = theme === 'dark' ? '#000000' : '#ffffff'
  const textColor = theme === 'dark' ? '#ffffff' : '#000000'
  const totalDuration = texts.length * duration

  // Calculate text position
  const x = textAlign === 'center' ? '50%' : textAlign === 'right' ? '95%' : '5%'
  const anchor = textAlign === 'center' ? 'middle' : textAlign === 'right' ? 'end' : 'start'
  const y = '50%'

  let content = ''

  texts.forEach((text, index) => {
    // We will use CSS animation for better control and looping

    content += `<text
      x="${x}"
      y="${y}"
      dominant-baseline="middle"
      text-anchor="${anchor}"
      fill="${textColor}"
      font-family="system-ui, -apple-system, sans-serif"
      font-size="${fontSize}px"
      font-weight="bold"
      style="opacity: 0; animation: anim-${index} ${totalDuration / 1000}s linear infinite;"
    >
      ${text}
    </text>`
  })

  const keyframes = texts.map((_, index) => {
    // Current text index is active from (index / N) to ((index+1)/N)
    // Let's say N=4.
    // 0: 0% -> 25%
    // 1: 25% -> 50%
    // ...

    // Within the slot:
    // 0% -> 10% (relative): Fade In
    // 10% -> 90% (relative): Visible
    // 90% -> 100% (relative): Fade Out

    const slot = 100 / texts.length
    const start = index * slot
    const end = (index + 1) * slot
    const fadeIn = start + (slot * 0.15)
    const fadeOut = end - (slot * 0.15)

    // Blur logic:
    // Start: blur(10px), opacity 0
    // FadeIn: blur(0px), opacity 1
    // FadeOut: blur (0px), opacity 1
    // End: blur(10px), opacity 0

    const filterStart = animation === 'blur' ? 'filter: blur(8px);' : ''
    const filterEnd = animation === 'blur' ? 'filter: blur(0px);' : ''

    return `
      @keyframes anim-${index} {
        0%, ${Math.max(0, start - 0.01)}% { opacity: 0; ${filterStart} }
        ${start}%, ${fadeIn}% { opacity: 1; ${filterEnd} }
        ${fadeOut}%, ${end}% { opacity: 1; ${filterEnd} }
        ${Math.min(100, end + 0.01)}%, 100% { opacity: 0; ${filterStart} }
      }
    `
  }).join('\n')

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      ${keyframes}
    </style>
  </defs>
  <rect width="100%" height="100%" fill="${bgColor}" />
  ${content}
</svg>`
}
