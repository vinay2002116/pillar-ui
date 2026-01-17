import { useState, useCallback } from 'react'
import { SelectionState } from '../types'

export const useSelectionState = () => {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedImageIndex: null,
    selectedTextBoxIndex: null,
    selectedLineId: null,
  })

  const clearSelection = useCallback(() => {
    setSelectionState({
      selectedImageIndex: null,
      selectedTextBoxIndex: null,
      selectedLineId: null,
    })
  }, [])

  const selectImage = useCallback((index: number | null) => {
    setSelectionState((prev) => ({
      ...prev,
      selectedImageIndex: index,
      selectedTextBoxIndex: null,
      selectedLineId: null,
    }))
  }, [])

  const selectTextBox = useCallback((index: number | null) => {
    setSelectionState((prev) => ({
      ...prev,
      selectedImageIndex: null,
      selectedTextBoxIndex: index,
      selectedLineId: null,
    }))
  }, [])

  return {
    selectionState,
    setSelectionState,
    clearSelection,
    selectImage,
    selectTextBox,
  }
}
