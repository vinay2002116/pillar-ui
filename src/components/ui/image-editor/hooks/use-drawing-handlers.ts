import { useCallback, useState } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { Position, EditorState, CanvasElements } from '../types'

interface UseDrawingHandlersProps {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
  canvasElements: CanvasElements
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElements>>
  backgroundState: {
    bgImageSize: { width: number }
  }
  getRotatedPointerPosition: (pos: Position) => Position
  isPointInImage: (x: number, y: number) => boolean
  selectImage: (index: number | null) => void
  saveStateToHistory: () => void
}

export const useDrawingHandlers = ({
  editorState,
  setEditorState,
  canvasElements,
  setCanvasElements,
  backgroundState,
  getRotatedPointerPosition,
  isPointInImage,
  selectImage,
  saveStateToHistory,
}: UseDrawingHandlersProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('#FFB82F') // Default to yellow
  const [isErasing, setIsErasing] = useState(false)

  const handleMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage()
      const pos = stage?.getPointerPosition()
      if (!stage || !pos) return
      if (editorState.isEraseMode) {
        // Start erasing
        const rotatedPos = getRotatedPointerPosition(pos)
        setCanvasElements((prev) => {
          const updatedLines = prev.lines.filter((line) => {
            // Check if the pointer is near any point in the line
            const isNearLine = line.points.some((_, index) => {
              if (index % 2 === 0) {
                const x = line.points[index]
                const y = line.points[index + 1]
                const distance = Math.sqrt(
                  Math.pow(rotatedPos.x - x, 2) + Math.pow(rotatedPos.y - y, 2)
                )
                return distance < 10 // Erase points within a 10px radius
              }
              return false
            })
            return !isNearLine // Keep lines that are not near the pointer
          })
          return { ...prev, lines: updatedLines }
        })
        return
      }

      if (
        !editorState.isDrawingMode ||
        !canvasElements.bgImage ||
        editorState.isEditingText
      )
        return

      const rotatedPos = getRotatedPointerPosition(pos)
      if (!isPointInImage(rotatedPos.x, rotatedPos.y)) return

      setEditorState((prev) => ({ ...prev, drawing: true }))
      const newLine = {
        points: [rotatedPos.x, rotatedPos.y],
        stroke: selectedColor,
        strokeWidth: Math.max(3, backgroundState.bgImageSize.width * 0.005),
        id: Math.random().toString(36).substring(2, 9),
      }
      setCanvasElements((prev) => ({
        ...prev,
        lines: [...prev.lines, newLine],
      }))
      selectImage(null)
    },
    [
      editorState.isEraseMode,
      editorState.isDrawingMode,
      editorState.isEditingText,
      canvasElements.bgImage,
      getRotatedPointerPosition,
      isPointInImage,
      setEditorState,
      selectedColor,
      backgroundState.bgImageSize.width,
      setCanvasElements,
      selectImage,
    ]
  )

  const handleMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage()
      const pos = stage?.getPointerPosition()
      if (!stage || !pos) return
      if (editorState.isEraseMode && isErasing) {
        const rotatedPos = getRotatedPointerPosition(pos)
        setCanvasElements((prev) => {
          const updatedLines = prev.lines.map((line) => {
            const newPoints = line.points.filter((_, index) => {
              if (index % 2 === 0) {
                const x = line.points[index]
                const y = line.points[index + 1]
                const distance = Math.sqrt(
                  Math.pow(rotatedPos.x - x, 2) + Math.pow(rotatedPos.y - y, 2)
                )
                return distance > 10 // Erase points within a 10px radius
              }
              return true
            })
            return { ...line, points: newPoints }
          })
          return { ...prev, lines: updatedLines }
        })
        return
      }

      // Ignore if not drawing
      if (
        !editorState.drawing ||
        !editorState.isDrawingMode ||
        !canvasElements.bgImage ||
        editorState.isEditingText
      )
        return

      // Add point to current line
      const rotatedPos = getRotatedPointerPosition(pos)
      if (!isPointInImage(rotatedPos.x, rotatedPos.y)) return

      setCanvasElements((prev) => {
        if (prev.lines.length === 0) return prev
        const lastLine = prev.lines[prev.lines.length - 1]
        return {
          ...prev,
          lines: [
            ...prev.lines.slice(0, -1),
            {
              ...lastLine,
              points: [...lastLine.points, rotatedPos.x, rotatedPos.y],
            },
          ],
        }
      })
    },
    [
      editorState.drawing,
      editorState.isDrawingMode,
      editorState.isEditingText,
      canvasElements.bgImage,
      getRotatedPointerPosition,
      isPointInImage,
    ]
  )

  const handleMouseUp = useCallback(() => {
    if (editorState.isEraseMode && isErasing) {
      setIsErasing(false)
      saveStateToHistory()
      return
    }
    // Finalize drawing
    if (editorState.drawing) {
      saveStateToHistory()
    }
    setEditorState((prev) => ({ ...prev, drawing: false }))
  }, [editorState.drawing, saveStateToHistory, isErasing, setEditorState])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    selectedColor,
    setSelectedColor, // Expose color state
  }
}
