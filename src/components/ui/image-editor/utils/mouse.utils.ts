import { BackgroundState } from '../types'

interface Position {
  x: number
  y: number
}

export const getRotatedPointerPosition = (
  pos: Position,
  bgState: BackgroundState,
  dimensions: { width: number; height: number }
): Position => {
  if (bgState.bgRotation === 0) return pos

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2
  const angle = -bgState.bgRotation * (Math.PI / 180)

  const translatedX = pos.x - centerX
  const translatedY = pos.y - centerY

  const rotatedX = translatedX * Math.cos(angle) - translatedY * Math.sin(angle)
  const rotatedY = translatedX * Math.sin(angle) + translatedY * Math.cos(angle)

  return {
    x: rotatedX + centerX,
    y: rotatedY + centerY,
  }
}
