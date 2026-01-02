import type { Settings, SvgAppearance } from '../settings'
import { getHeight } from '@/utils'

function getSvg(style: string, childrens: string, width: number, height: number): string {
  return [
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><style>${style}</style><foreignObject width="${width}" height="${height}">`,
    `<div xmlns="http://www.w3.org/1999/xhtml">`,
    childrens,
    `</div></foreignObject></svg>`,
  ].filter(Boolean).join('')
}

function getTextSpans(texts: string[]): string {
  return texts.map((text, index) =>
    `<span class="l${index}">${text}</span>`,
  ).join('')
}

function getStyleHeader(settings: Settings, appearance: SvgAppearance, width: number, height: number, background: boolean): string {
  return [
    `*{font-family:${settings.fontFamily}`,
    appearance === 'light' && `;color:#000`,
    appearance === 'light' && background && `;background:#fff`,
    appearance === 'dark' && `;color:#fff`,
    appearance === 'dark' && background && `;background:#000`,
    `}`,
    appearance === 'auto' && `@media(prefers-color-scheme:dark){*{ color:#fff${background ? ';background:#000' : ''}}}@media(prefers-color-scheme:light){*{ color:#000${background ? ';background:#fff' : ''}}}`,
    `span{font-size:${settings.fontSize}px;display:block;position:absolute;animation:a ${settings.during * settings.texts.length}ms linear infinite;opacity:0}`,
    ...settings.texts.map((text, index) => `.l${index}{top:${(height - getHeight(width, settings, text)) / 2}px;animation-delay:${index * settings.during}ms}`),
  ].filter(Boolean).join('')
}

export function getBlurSvg(settings: Settings, appearance?: SvgAppearance, width?: number, height?: number, background?: boolean): string {
  const _appearance = appearance === undefined ? settings.export.svg.appearance : appearance
  const _width = width === undefined ? settings.export.size.width : width
  const _height = height === undefined ? settings.export.size.height : height
  const _background = background === undefined ? settings.export.svg.background : background

  const animation = [
    `@keyframes a{0%{opacity: 0;filter: blur(5px);transform: translateY(20px);animation-timing-function: ease}`,
    `${1000 / (settings.during * settings.texts.length)}%{opacity: 1;filter: blur(0px);transform: translateY(0px);animation-timing-function: linear}`,
    `${1 / settings.texts.length}%{opacity: 1;filter: blur(0px);transform: translateY(0px);animation-timing-function: ease}`,
    `${(settings.during + 1000) / (settings.during * settings.texts.length)}%{opacity: 0;filter: blur(5px);transform: translateY(-20px);animation-timing-function: linear}`,
    `100%{opacity: 0;filter: blur(5px);transform: translateY(-20px);}`,
  ].join('')

  return getSvg(animation + getStyleHeader(settings, _appearance, _width, _height, _background), getTextSpans(settings.texts), _width, _height)
}
