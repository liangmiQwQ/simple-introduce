import type { Settings } from './settings'

export function getHeight(width: number, settings: Settings) {
  const el = document.createElement('div')

  el.style.width = `${width}px`
  el.style.fontSize = `${settings.fontSize}px`
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.pointerEvents = 'none'
  el.style.left = '-9999px'
  el.style.top = '-9999px'
  document.body.appendChild(el)

  const heightList: number[] = []

  for (const text of settings.texts) {
    el.innerHTML = getHTML(text)
    heightList.push(el.offsetHeight)
  }

  document.body.removeChild(el)

  return Math.max(...heightList)
}

export function getHTML(text: string) {
  return text
}

export function getAspect(width: number, height: number): [number, number] {
  if (width <= 0 || height <= 0 || !Number.isFinite(width) || !Number.isFinite(height)) {
    return [0, 0]
  }

  const gcd = (a: number, b: number): number => {
    a = a < 0 ? -a : a
    b = b < 0 ? -b : b

    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  const countDecimals = (value: number): number => {
    if (value === Math.floor(value))
      return 0

    const str = value.toString()
    const dotIndex = str.indexOf('.')

    if (dotIndex === -1)
      return 0

    const eIndex = str.indexOf('e')
    if (eIndex !== -1) {
      const exponent = Number.parseInt(str.substring(eIndex + 1), 10)
      return Math.max(0, str.substring(dotIndex + 1, eIndex).length - exponent)
    }

    return str.length - dotIndex - 1
  }

  let intWidth: number, intHeight: number

  if (width === Math.floor(width) && height === Math.floor(height)) {
    intWidth = width
    intHeight = height
  }
  else {
    const widthDecimals = countDecimals(width)
    const heightDecimals = countDecimals(height)
    const maxDecimals = Math.max(widthDecimals, heightDecimals)
    const precision = 10 ** Math.min(maxDecimals, 6)

    intWidth = Math.round(width * precision)
    intHeight = Math.round(height * precision)
  }

  const divisor = gcd(intWidth, intHeight)

  return [intWidth / divisor, intHeight / divisor]
}

export function sleep(time: number) {
  return new Promise<void>(resolve =>
    setTimeout(() => resolve(), time),
  )
}
