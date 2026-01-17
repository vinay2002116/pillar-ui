import { BackgroundState } from '../types'

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
  })
}

export const isPointInImage = (
  x: number,
  y: number,
  bgState: BackgroundState,
  dimensions: { width: number; height: number }
): boolean => {
  if (bgState.bgRotation === 0) {
    return (
      x >= bgState.bgImagePosition.x &&
      x <= bgState.bgImagePosition.x + bgState.bgImageSize.width &&
      y >= bgState.bgImagePosition.y &&
      y <= bgState.bgImagePosition.y + bgState.bgImageSize.height
    )
  }

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2
  const distance = Math.sqrt(
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
  )
  return (
    distance <
    Math.max(bgState.bgImageSize.width, bgState.bgImageSize.height) * 0.8
  )
}

export const getInitialPositionInImage = (
  width: number,
  height: number,
  bgState: BackgroundState
): { x: number; y: number } => ({
  x: bgState.bgImagePosition.x + (bgState.bgImageSize.width - width) / 2,
  y: bgState.bgImagePosition.y + (bgState.bgImageSize.height - height) / 2,
})
