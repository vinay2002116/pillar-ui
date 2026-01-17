import { useCallback } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import Konva from 'konva'
import { EditorState, CanvasElements } from '../types'

interface UseMouseHandlersProps {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
  canvasElements: CanvasElements
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElements>>
  selectionState: {
    selectedImageIndex: number | null
    selectedTextBoxIndex: number | null
    selectedLineId: string | null
  }
  clearSelection: () => void
  selectImage: (index: number | null) => void
  selectTextBox: (index: number | null) => void
  toggleTextEditing: (isEditing: boolean) => void
  saveStateToHistory: () => void
  transformerRef: React.RefObject<Konva.Transformer>
  textBoxRefs: React.MutableRefObject<(Konva.Text | null)[]>
}

export const useMouseHandlers = ({
  editorState,
  setEditorState,
  setCanvasElements,
  clearSelection,
  selectImage,
  selectTextBox,
  toggleTextEditing,
  saveStateToHistory,
  transformerRef,
  textBoxRefs,
}: UseMouseHandlersProps) => {
  const handleStageClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage()
      if (!stage) return
      // If clicking on stage or background image, clear selections
      if (e.target === stage || e.target === stage.findOne('Image')) {
        clearSelection()
        toggleTextEditing(false)
        transformerRef.current?.nodes([])?.getLayer()?.batchDraw()
      }
    },
    [clearSelection, toggleTextEditing]
  )

  const handleImageClick = useCallback(
    (index: number, e: KonvaEventObject<MouseEvent>) => {
      if (editorState.isDrawingMode) return // Prevent selection when in drawing mode
      e.cancelBubble = true // Prevent event from bubbling to stage
      selectImage(index)
      toggleTextEditing(false)
    },
    [editorState.isDrawingMode, selectImage, toggleTextEditing]
  )

  const handleTextClick = useCallback(
    (index: number, e: KonvaEventObject<MouseEvent>) => {
      if (editorState.isEditingText || editorState.isDrawingMode) return // Prevent selection when in drawing mode
      e.cancelBubble = true // Prevent event from bubbling to stage
      selectTextBox(index)
    },
    [editorState.isEditingText, editorState.isDrawingMode, selectTextBox]
  )

  const handleLineClick = useCallback(
    (id: string, e: KonvaEventObject<Event>) => {
      if (editorState.isDrawingMode) return // Prevent selection when in drawing mode
      e.cancelBubble = true // Prevent event from bubbling to stage
      selectImage(null)
      toggleTextEditing(false)
    },
    [editorState.isDrawingMode, selectImage, toggleTextEditing]
  )

  const handleTextDblClick = useCallback(
    (index: number) => {
      if (editorState.isEditingText || editorState.isDrawingMode) return // Prevent selection when in drawing mode
      selectTextBox(index)
      toggleTextEditing(true)
    },
    [
      editorState.isEditingText,
      editorState.isDrawingMode,
      selectTextBox,
      toggleTextEditing,
    ]
  )

  const handleImageTransform = useCallback(
    (index: number, node: Konva.Image) => {
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
    },
    [saveStateToHistory]
  )

  const handleTextTransformStart = useCallback(() => {
    setEditorState((prev) => ({ ...prev, isTransforming: true }))
  }, [])

  const handleTextTransformEnd = useCallback(
    (index: number) => {
      const node = textBoxRefs.current[index]
      if (!node) return

      setCanvasElements((prev) => ({
        ...prev,
        textBoxes: prev.textBoxes.map((box, i) =>
          i === index
            ? {
                ...box,
                width: Math.max(30, box.width * node.scaleX()),
                rotation: node.rotation(),
                x: node.x(),
                y: node.y(),
              }
            : box
        ),
      }))
      node.scaleX(1)
      setEditorState((prev) => ({ ...prev, isTransforming: false }))
      saveStateToHistory()
    },
    [saveStateToHistory]
  )

  return {
    handleStageClick,
    handleImageClick,
    handleTextClick,
    handleLineClick,
    handleTextDblClick,
    handleImageTransform,
    handleTextTransformStart,
    handleTextTransformEnd,
  }
}
