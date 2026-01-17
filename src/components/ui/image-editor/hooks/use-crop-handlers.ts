import { useCallback, useState, useEffect } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import {
  CropState,
  EditorState,
  BackgroundState,
  Dimensions,
  CanvasElements,
  HistoryState,
} from '../types'
import {
  getRotatedPointerPosition,
  isPointInImage,
  applyCrop,
  transformElementsAfterCrop,
} from '../utils/crop.utils'

const RESIZE_HANDLE_SIZE = 10

export const useCropHandlers = (
  canvasElements: CanvasElements,
  backgroundState: BackgroundState,
  dimensions: Dimensions,
  setCanvasElements: (
    elements: CanvasElements | ((prev: CanvasElements) => CanvasElements)
  ) => void,
  setBackgroundState: (
    state: BackgroundState | ((prev: BackgroundState) => BackgroundState)
  ) => void,
  setEditorState: (
    state: EditorState | ((prev: EditorState) => EditorState)
  ) => void,
  clearSelection: () => void,
  toggleTextEditing: (value: boolean) => void,
  setHistory: (
    state: HistoryState | ((prev: HistoryState) => HistoryState)
  ) => void,
  saveStateToHistory?: () => void
) => {
  const [cropState, setCropState] = useState<CropState>({
    cropRect: { x: 0, y: 0, width: 0, height: 0 },
    cropStartPos: null,
    isDragging: false,
    dragStartPos: null,
    isResizing: false,
    resizeHandle: null,
    resizeStartPos: null,
  })

  useEffect(() => {
    setEditorState((prev) => {
      return prev
    })
  }, [setEditorState])

  const getResizeHandle = useCallback(
    (x: number, y: number): CropState['resizeHandle'] => {
      const { cropRect } = cropState
      if (!cropRect.width || !cropRect.height) return null

      const handles = {
        'top-left': {
          x: cropRect.x,
          y: cropRect.y,
        },
        'top-right': {
          x: cropRect.x + cropRect.width,
          y: cropRect.y,
        },
        'bottom-left': {
          x: cropRect.x,
          y: cropRect.y + cropRect.height,
        },
        'bottom-right': {
          x: cropRect.x + cropRect.width,
          y: cropRect.y + cropRect.height,
        },
        top: {
          x: cropRect.x + cropRect.width / 2,
          y: cropRect.y,
        },
        right: {
          x: cropRect.x + cropRect.width,
          y: cropRect.y + cropRect.height / 2,
        },
        bottom: {
          x: cropRect.x + cropRect.width / 2,
          y: cropRect.y + cropRect.height,
        },
        left: {
          x: cropRect.x,
          y: cropRect.y + cropRect.height / 2,
        },
      }

      for (const [handle, pos] of Object.entries(handles)) {
        if (
          Math.abs(x - pos.x) <= RESIZE_HANDLE_SIZE &&
          Math.abs(y - pos.y) <= RESIZE_HANDLE_SIZE
        ) {
          return handle as CropState['resizeHandle']
        }
      }

      return null
    },
    [cropState.cropRect]
  )

  const toggleCropMode = useCallback(() => {
    // First set the editor state
    setEditorState((prev) => {
      const newState = {
        ...prev,
        isCropping: !prev.isCropping,
        isDrawingMode: false,
      }
      return newState
    })

    // Clear any existing selections
    clearSelection()
    toggleTextEditing(false)

    // Always initialize crop rectangle to cover the entire image when entering crop mode
    setCropState({
      cropRect: {
        x: backgroundState.bgImagePosition.x,
        y: backgroundState.bgImagePosition.y,
        width: backgroundState.bgImageSize.width,
        height: backgroundState.bgImageSize.height,
      },
      cropStartPos: null,
      isDragging: false,
      dragStartPos: null,
      isResizing: false,
      resizeHandle: null,
      resizeStartPos: null,
    })
  }, [
    clearSelection,
    toggleTextEditing,
    backgroundState.bgImagePosition,
    backgroundState.bgImageSize,
    setEditorState,
  ])

  const handleCropMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage()
      const pos = stage?.getPointerPosition()
      if (!stage || !pos) return

      const rotatedPos = getRotatedPointerPosition(
        pos,
        backgroundState,
        dimensions
      )

      // Check if we're clicking on a resize handle
      const resizeHandle = getResizeHandle(rotatedPos.x, rotatedPos.y)
      if (resizeHandle) {
        setCropState((prev) => ({
          ...prev,
          isResizing: true,
          resizeHandle,
          resizeStartPos: rotatedPos,
        }))
        return
      }

      // Check if we're clicking inside an existing crop rectangle
      if (
        cropState.cropRect.width > 0 &&
        cropState.cropRect.height > 0 &&
        rotatedPos.x >= cropState.cropRect.x &&
        rotatedPos.x <= cropState.cropRect.x + cropState.cropRect.width &&
        rotatedPos.y >= cropState.cropRect.y &&
        rotatedPos.y <= cropState.cropRect.y + cropState.cropRect.height
      ) {
        // Start dragging the crop rectangle
        setCropState((prev) => ({
          ...prev,
          isDragging: true,
          dragStartPos: rotatedPos,
        }))
      } else if (isPointInImage(rotatedPos.x, rotatedPos.y, backgroundState)) {
        // Start creating a new crop rectangle
        setCropState({
          cropStartPos: rotatedPos,
          cropRect: {
            x: rotatedPos.x,
            y: rotatedPos.y,
            width: 0,
            height: 0,
          },
          isDragging: false,
          dragStartPos: null,
          isResizing: false,
          resizeHandle: null,
          resizeStartPos: null,
        })
      }
    },
    [backgroundState, dimensions, cropState.cropRect, getResizeHandle]
  )

  const handleCropMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage()
      const pos = stage?.getPointerPosition()
      if (!stage || !pos) return

      const rotatedPos = getRotatedPointerPosition(
        pos,
        backgroundState,
        dimensions
      )

      if (
        cropState.isResizing &&
        cropState.resizeHandle &&
        cropState.resizeStartPos
      ) {
        const dx = rotatedPos.x - cropState.resizeStartPos.x
        const dy = rotatedPos.y - cropState.resizeStartPos.y

        const minX = backgroundState.bgImagePosition.x
        const minY = backgroundState.bgImagePosition.y
        const maxX =
          backgroundState.bgImagePosition.x + backgroundState.bgImageSize.width
        const maxY =
          backgroundState.bgImagePosition.y + backgroundState.bgImageSize.height

        let newX = cropState.cropRect.x
        let newY = cropState.cropRect.y
        let newWidth = cropState.cropRect.width
        let newHeight = cropState.cropRect.height

        switch (cropState.resizeHandle) {
          case 'top-left':
            newX = Math.max(
              minX,
              Math.min(
                cropState.cropRect.x + cropState.cropRect.width - 10,
                cropState.cropRect.x + dx
              )
            )
            newY = Math.max(
              minY,
              Math.min(
                cropState.cropRect.y + cropState.cropRect.height - 10,
                cropState.cropRect.y + dy
              )
            )
            newWidth = cropState.cropRect.width - (newX - cropState.cropRect.x)
            newHeight =
              cropState.cropRect.height - (newY - cropState.cropRect.y)
            break
          case 'top-right':
            newY = Math.max(
              minY,
              Math.min(
                cropState.cropRect.y + cropState.cropRect.height - 10,
                cropState.cropRect.y + dy
              )
            )
            newWidth = Math.max(
              10,
              Math.min(
                maxX - cropState.cropRect.x,
                cropState.cropRect.width + dx
              )
            )
            newHeight =
              cropState.cropRect.height - (newY - cropState.cropRect.y)
            break
          case 'bottom-left':
            newX = Math.max(
              minX,
              Math.min(
                cropState.cropRect.x + cropState.cropRect.width - 10,
                cropState.cropRect.x + dx
              )
            )
            newWidth = cropState.cropRect.width - (newX - cropState.cropRect.x)
            newHeight = Math.max(
              10,
              Math.min(
                maxY - cropState.cropRect.y,
                cropState.cropRect.height + dy
              )
            )
            break
          case 'bottom-right':
            newWidth = Math.max(
              10,
              Math.min(
                maxX - cropState.cropRect.x,
                cropState.cropRect.width + dx
              )
            )
            newHeight = Math.max(
              10,
              Math.min(
                maxY - cropState.cropRect.y,
                cropState.cropRect.height + dy
              )
            )
            break
          case 'top':
            newY = Math.max(
              minY,
              Math.min(
                cropState.cropRect.y + cropState.cropRect.height - 10,
                cropState.cropRect.y + dy
              )
            )
            newHeight =
              cropState.cropRect.height - (newY - cropState.cropRect.y)
            break
          case 'right':
            newWidth = Math.max(
              10,
              Math.min(
                maxX - cropState.cropRect.x,
                cropState.cropRect.width + dx
              )
            )
            break
          case 'bottom':
            newHeight = Math.max(
              10,
              Math.min(
                maxY - cropState.cropRect.y,
                cropState.cropRect.height + dy
              )
            )
            break
          case 'left':
            newX = Math.max(
              minX,
              Math.min(
                cropState.cropRect.x + cropState.cropRect.width - 10,
                cropState.cropRect.x + dx
              )
            )
            newWidth = cropState.cropRect.width - (newX - cropState.cropRect.x)
            break
        }

        setCropState((prev) => ({
          ...prev,
          cropRect: {
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          },
          resizeStartPos: rotatedPos,
        }))
      } else if (cropState.isDragging && cropState.dragStartPos) {
        // Handle dragging the crop rectangle
        const dx = rotatedPos.x - cropState.dragStartPos.x
        const dy = rotatedPos.y - cropState.dragStartPos.y

        const minX = backgroundState.bgImagePosition.x
        const minY = backgroundState.bgImagePosition.y
        const maxX =
          backgroundState.bgImagePosition.x + backgroundState.bgImageSize.width
        const maxY =
          backgroundState.bgImagePosition.y + backgroundState.bgImageSize.height

        const newX = Math.max(
          minX,
          Math.min(maxX - cropState.cropRect.width, cropState.cropRect.x + dx)
        )
        const newY = Math.max(
          minY,
          Math.min(maxY - cropState.cropRect.height, cropState.cropRect.y + dy)
        )

        setCropState((prev) => ({
          ...prev,
          cropRect: {
            ...prev.cropRect,
            x: newX,
            y: newY,
          },
          dragStartPos: rotatedPos,
        }))
      } else if (cropState.cropStartPos) {
        // Handle creating a new crop rectangle
        const minX = backgroundState.bgImagePosition.x
        const minY = backgroundState.bgImagePosition.y
        const maxX =
          backgroundState.bgImagePosition.x + backgroundState.bgImageSize.width
        const maxY =
          backgroundState.bgImagePosition.y + backgroundState.bgImageSize.height

        const constrainedX = Math.max(minX, Math.min(maxX, rotatedPos.x))
        const constrainedY = Math.max(minY, Math.min(maxY, rotatedPos.y))

        const width = constrainedX - cropState.cropStartPos.x
        const height = constrainedY - cropState.cropStartPos.y

        setCropState((prev) => ({
          ...prev,
          cropRect: {
            x: width > 0 ? cropState.cropStartPos!.x : constrainedX,
            y: height > 0 ? cropState.cropStartPos!.y : constrainedY,
            width: Math.abs(width),
            height: Math.abs(height),
          },
        }))
      }
    },
    [
      cropState.cropStartPos,
      cropState.isDragging,
      cropState.dragStartPos,
      cropState.isResizing,
      cropState.resizeHandle,
      cropState.resizeStartPos,
      cropState.cropRect,
      backgroundState,
      dimensions,
    ]
  )

  const handleCropMouseUp = useCallback(() => {
    if (cropState.isDragging) {
      setCropState((prev) => ({
        ...prev,
        isDragging: false,
        dragStartPos: null,
      }))
    } else if (cropState.isResizing) {
      setCropState((prev) => ({
        ...prev,
        isResizing: false,
        resizeHandle: null,
        resizeStartPos: null,
      }))
    } else if (
      cropState.cropRect.width > 10 &&
      cropState.cropRect.height > 10 &&
      saveStateToHistory
    ) {
      saveStateToHistory()
    } else {
      setCropState({
        cropRect: { x: 0, y: 0, width: 0, height: 0 },
        cropStartPos: null,
        isDragging: false,
        dragStartPos: null,
        isResizing: false,
        resizeHandle: null,
        resizeStartPos: null,
      })
    }
    setCropState((prev) => ({
      ...prev,
      cropStartPos: null,
    }))
  }, [
    cropState.cropRect.width,
    cropState.cropRect.height,
    cropState.isDragging,
    cropState.isResizing,
    saveStateToHistory,
  ])

  const handleCancelCrop = useCallback(() => {
    setEditorState((prev) => ({ ...prev, isCropping: false }))
    setCropState({
      cropRect: { x: 0, y: 0, width: 0, height: 0 },
      cropStartPos: null,
      isDragging: false,
      dragStartPos: null,
      isResizing: false,
      resizeHandle: null,
      resizeStartPos: null,
    })
  }, [])

  const handleApplyCrop = useCallback(async () => {
    if (
      !canvasElements.bgImage ||
      cropState.cropRect.width === 0 ||
      cropState.cropRect.height === 0
    ) {
      return
    }

    try {
      const { croppedImage, newWidth, newHeight, scaleX, scaleY } =
        await applyCrop(
          cropState.cropRect,
          canvasElements,
          backgroundState
          // dimensions
        )

      const angle = -backgroundState.bgRotation * (Math.PI / 180)
      const { newSquares, newTextBoxes, newLines } = transformElementsAfterCrop(
        cropState.cropRect,
        scaleX,
        scaleY,
        angle,
        dimensions,
        newWidth,
        newHeight,
        canvasElements
      )

      setCanvasElements((prev) => ({
        ...prev,
        bgImage: croppedImage,
        squares: newSquares,
        textBoxes: newTextBoxes,
        lines: newLines,
      }))

      setBackgroundState((prev) => ({
        ...prev,
        bgImageSize: {
          width: newWidth,
          height: newHeight,
        },
        bgImagePosition: {
          x: (dimensions.width - newWidth) / 2,
          y: (dimensions.height - newHeight) / 2,
        },
        bgRotation: 0,
      }))

      setCropState({
        cropRect: { x: 0, y: 0, width: 0, height: 0 },
        cropStartPos: null,
        isDragging: false,
        dragStartPos: null,
        isResizing: false,
        resizeHandle: null,
        resizeStartPos: null,
      })

      setEditorState((prev) => ({ ...prev, isCropping: false }))

      // Reset history after cropping
      setHistory(() => ({
        past: [],
        present: {
          images: newSquares.length > 0 ? [croppedImage] : [],
          squares: newSquares,
          textBoxes: newTextBoxes,
          lines: newLines,
          bgImage: null,
          bgImageSize: {
            width: newWidth,
            height: newHeight,
          },
          bgImagePosition: {
            x: (dimensions.width - newWidth) / 2,
            y: (dimensions.height - newHeight) / 2,
          },
          bgRotation: 0,
        },
        future: [],
      }))
    } catch (error) {
      // Silently handle error to prevent UI from breaking
      // eslint-disable-next-line no-console
      console.error('Error applying crop:', error)
    }
  }, [
    canvasElements,
    cropState.cropRect,
    backgroundState,
    dimensions,
    setCanvasElements,
    setBackgroundState,
    setEditorState,
    setHistory,
  ])

  return {
    cropState,
    setCropState,
    toggleCropMode,
    handleCropMouseDown,
    handleCropMouseMove,
    handleCropMouseUp,
    handleCancelCrop,
    handleApplyCrop,
  }
}
