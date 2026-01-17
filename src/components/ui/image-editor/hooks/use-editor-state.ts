import { useState, useCallback, useEffect } from 'react'
import { EditorState } from '../types'

export const useEditorState = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    isClient: false,
    isDrawingMode: false,
    isEditingText: false,
    isSheetOpen: false,
    isTransforming: false,
    drawing: false,
    isCropping: false,
    isEraseMode: false,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEditorState((prev) => ({ ...prev, isClient: true }))
    }
  }, [])

  const toggleDrawingMode = useCallback(() => {
    setEditorState((prev) => ({
      ...prev,
      isDrawingMode: !prev.isDrawingMode,
      isEraseMode: false, // Disable erase mode when enabling drawing mode
    }))
  }, [])
  const toggleEraseMode = useCallback(() => {
    setEditorState((prev) => ({
      ...prev,
      isEraseMode: !prev.isEraseMode,
      isDrawingMode: false, // Disable drawing mode when erasing
    }))
  }, [])

  const toggleTextEditing = useCallback((isEditing: boolean) => {
    setEditorState((prev) => ({
      ...prev,
      isEditingText: isEditing,
    }))
  }, [])

  const toggleSheetOpen = useCallback((isOpen: boolean) => {
    setEditorState((prev) => ({
      ...prev,
      isSheetOpen: isOpen,
    }))
  }, [])

  return {
    editorState,
    setEditorState,
    toggleDrawingMode,
    toggleTextEditing,
    toggleSheetOpen,
    toggleEraseMode,
  }
}
