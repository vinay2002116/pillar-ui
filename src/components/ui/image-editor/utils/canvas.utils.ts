import Konva from 'konva'
import { CanvasElements, EditorState } from '../types'

export const handleImageTransform = (
  index: number,
  node: Konva.Image,
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElements>>,
  saveStateToHistory: () => void
): void => {
  const scaleX = node.scaleX()
  const scaleY = node.scaleY()
  setCanvasElements((prev) => ({
    ...prev,
    squares: prev.squares.map((square, i) =>
      i === index
        ? {
            ...square,
            width: Math.max(30, square.width * scaleX),
            height: Math.max(30, square.height * scaleY),
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
          }
        : square
    ),
  }))
  node.scaleX(1)
  node.scaleY(1)
  saveStateToHistory()
}

export const handleTextTransform = (
  index: number,
  node: Konva.Text,
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElements>>,
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>,
  saveStateToHistory: () => void
): void => {
  const scaleX = node.scaleX()
  const scaleY = node.scaleY()

  setCanvasElements((prev) => ({
    ...prev,
    textBoxes: prev.textBoxes.map((box, i) =>
      i === index
        ? {
            ...box,
            width: Math.max(30, box.width * scaleX),
            height: Math.max(30, box.height * scaleY),
            rotation: node.rotation(),
            x: node.x(),
            y: node.y(),
          }
        : box
    ),
  }))

  // Reset the scale after applying the transform
  node.scaleX(1)
  node.scaleY(1)
  setEditorState((prev) => ({ ...prev, isTransforming: false }))
  saveStateToHistory()
}
