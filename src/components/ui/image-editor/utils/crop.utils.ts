import { Position, BackgroundState, Dimensions, CanvasElements } from '../types'

export const getRotatedPointerPosition = (
  pos: Position,
  backgroundState: BackgroundState,
  dimensions: Dimensions
): Position => {
  const angle = -backgroundState.bgRotation * (Math.PI / 180)
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  const relX = pos.x - centerX
  const relY = pos.y - centerY

  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return {
    x: relX * cos - relY * sin + centerX,
    y: relX * sin + relY * cos + centerY,
  }
}

export const isPointInImage = (
  x: number,
  y: number,
  backgroundState: BackgroundState
): boolean => {
  const { bgImagePosition, bgImageSize } = backgroundState
  return (
    x >= bgImagePosition.x &&
    x <= bgImagePosition.x + bgImageSize.width &&
    y >= bgImagePosition.y &&
    y <= bgImagePosition.y + bgImageSize.height
  )
}

export const isElementInCropArea = (
  x: number,
  y: number,
  width: number,
  height: number,
  cropRect: { x: number; y: number; width: number; height: number }
): boolean => {
  if (!cropRect.width || !cropRect.height) return true

  const elementRight = x + width
  const elementBottom = y + height
  const cropRight = cropRect.x + cropRect.width
  const cropBottom = cropRect.y + cropRect.height

  return (
    x < cropRight &&
    elementRight > cropRect.x &&
    y < cropBottom &&
    elementBottom > cropRect.y
  )
}

export const applyCrop = (
  cropRect: { x: number; y: number; width: number; height: number },
  canvasElements: CanvasElements,
  backgroundState: BackgroundState,
//   dimensions: Dimensions
): Promise<{
  croppedImage: HTMLImageElement
  newWidth: number
  newHeight: number
  scaleX: number
  scaleY: number
}> => {
  return new Promise((resolve, reject) => {
    if (
      !canvasElements.bgImage ||
      cropRect.width === 0 ||
      cropRect.height === 0
    ) {
      reject(new Error('Invalid crop parameters'))
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = cropRect.width
    canvas.height = cropRect.height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    const scaleX =
      canvasElements.bgImage.width / backgroundState.bgImageSize.width
    const scaleY =
      canvasElements.bgImage.height / backgroundState.bgImageSize.height

    const sourceX = (cropRect.x - backgroundState.bgImagePosition.x) * scaleX
    const sourceY = (cropRect.y - backgroundState.bgImagePosition.y) * scaleY
    const sourceWidth = cropRect.width * scaleX
    const sourceHeight = cropRect.height * scaleY

    ctx.drawImage(
      canvasElements.bgImage,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const croppedImage = new window.Image()
    croppedImage.src = canvas.toDataURL('image/png')
    croppedImage.onload = () => {
      const newAspectRatio = cropRect.width / cropRect.height
      let newWidth = backgroundState.originalBgSize.width
      let newHeight = backgroundState.originalBgSize.width / newAspectRatio

      if (newHeight > backgroundState.originalBgSize.height) {
        newHeight = backgroundState.originalBgSize.height
        newWidth = backgroundState.originalBgSize.height * newAspectRatio
      }

      resolve({
        croppedImage,
        newWidth,
        newHeight,
        scaleX: newWidth / cropRect.width,
        scaleY: newHeight / cropRect.height,
      })
    }

    croppedImage.onerror = () => {
      reject(new Error('Failed to load cropped image'))
    }
  })
}

export const transformElementsAfterCrop = (
  cropRect: { x: number; y: number; width: number; height: number },
  scaleX: number,
  scaleY: number,
  angle: number,
  dimensions: Dimensions,
  newWidth: number,
  newHeight: number,
  canvasElements: CanvasElements
) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  // Transform squares (stickers)
  const newSquares = canvasElements.squares
    .filter((square) =>
      isElementInCropArea(
        square.x,
        square.y,
        square.width,
        square.height,
        cropRect
      )
    )
    .map((square) => {
      const relX = square.x - centerX
      const relY = square.y - centerY

      const unrotatedX = relX * cos - relY * sin
      const unrotatedY = relX * sin + relY * cos

      const cropRelX = unrotatedX - (cropRect.x - centerX)
      const cropRelY = unrotatedY - (cropRect.y - centerY)

      return {
        ...square,
        x: cropRelX * scaleX + (dimensions.width - newWidth) / 2 + newWidth / 2,
        y:
          cropRelY * scaleY +
          (dimensions.height - newHeight) / 2 +
          newHeight / 2,
        width: square.width * scaleX,
        height: square.height * scaleY,
      }
    })

  // Transform text boxes
  const newTextBoxes = canvasElements.textBoxes
    .filter((textBox) =>
      isElementInCropArea(
        textBox.x,
        textBox.y,
        textBox.width,
        textBox.fontSize * 1.5,
        cropRect
      )
    )
    .map((textBox) => {
      const relX = textBox.x - centerX
      const relY = textBox.y - centerY

      const unrotatedX = relX * cos - relY * sin
      const unrotatedY = relX * sin + relY * cos

      const cropRelX = unrotatedX - (cropRect.x - centerX)
      const cropRelY = unrotatedY - (cropRect.y - centerY)

      return {
        ...textBox,
        x: cropRelX * scaleX + (dimensions.width - newWidth) / 2 + newWidth / 2,
        y:
          cropRelY * scaleY +
          (dimensions.height - newHeight) / 2 +
          newHeight / 2,
        width: textBox.width * scaleX,
        fontSize: textBox.fontSize * Math.min(scaleX, scaleY),
      }
    })

  // Transform lines
  const newLines = canvasElements.lines
    .filter((line) => {
      for (let i = 0; i < line.points.length; i += 2) {
        const x = line.points[i]
        const y = line.points[i + 1]
        if (isElementInCropArea(x, y, 1, 1, cropRect)) {
          return true
        }
      }
      return false
    })
    .map((line) => {
      const newPoints = line.points.map((point, index) => {
        const relX = point - centerX
        const relY = line.points[index + 1] - centerY

        const unrotatedX = relX * cos - relY * sin
        const unrotatedY = relX * sin + relY * cos

        const cropRelX = unrotatedX - (cropRect.x - centerX)
        const cropRelY = unrotatedY - (cropRect.y - centerY)

        if (index % 2 === 0) {
          return (
            cropRelX * scaleX + (dimensions.width - newWidth) / 2 + newWidth / 2
          )
        } else {
          return (
            cropRelY * scaleY +
            (dimensions.height - newHeight) / 2 +
            newHeight / 2
          )
        }
      })
      return {
        ...line,
        points: newPoints,
        strokeWidth: line.strokeWidth * Math.min(scaleX, scaleY),
      }
    })

  return {
    newSquares,
    newTextBoxes,
    newLines,
  }
}
