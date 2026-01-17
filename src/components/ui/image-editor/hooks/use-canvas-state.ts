import { useState, useCallback, useEffect } from 'react'
import {
  CanvasElements,
  BackgroundState,
  HistoryState,
  CanvasState,
} from '../types'

const MAX_HISTORY_STEPS = 100 // Maximum undo/redo steps to keep in memory

export const useCanvasState = (
  initialState: CanvasElements,
  backgroundState: BackgroundState,
  setBackgroundState: React.Dispatch<React.SetStateAction<BackgroundState>>
) => {
  const [canvasElements, setCanvasElements] =
    useState<CanvasElements>(initialState)
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: {
      images: [],
      squares: [],
      textBoxes: [],
      lines: [],
      bgRotation: 0,
      bgImage: null,
      bgImageSize: { width: 0, height: 0 },
      bgImagePosition: { x: 0, y: 0 },
    },
    future: [],
  })

  // Track if we've initialized the history with the background image
  const [isInitialized, setIsInitialized] = useState(false)

  // Save initial state to history when background image is loaded
  useEffect(() => {
    if (canvasElements.bgImage && !isInitialized) {
      const initialHistoryState: CanvasState = {
        images: [],
        squares: [],
        textBoxes: [],
        lines: [],
        bgRotation: backgroundState.bgRotation,
        bgImage: null,
        bgImageSize: { ...backgroundState.bgImageSize },
        bgImagePosition: { ...backgroundState.bgImagePosition },
      }

      setHistory({
        past: [],
        present: initialHistoryState,
        future: [],
      })
      setIsInitialized(true)
    }
  }, [canvasElements.bgImage, backgroundState, isInitialized])

  const saveStateToHistory = useCallback(() => {
    const currentState: CanvasState = {
      images: [...canvasElements.images],
      squares: [...canvasElements.squares],
      textBoxes: [...canvasElements.textBoxes],
      lines: [...canvasElements.lines],
      bgImage: null, // We don't store the actual image in history
      bgImageSize: { ...backgroundState.bgImageSize },
      bgImagePosition: { ...backgroundState.bgImagePosition },
    }

    setHistory((prev) => {
      // Skip saving if the current state is identical to the present state
      if (isStateEqual(currentState, prev.present)) {
        return prev
      }

      return {
        past: [...prev.past, prev.present].slice(-MAX_HISTORY_STEPS),
        present: currentState,
        future: [], // Clear future when making new changes
      }
    })
  }, [canvasElements, backgroundState])

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev

      const newPresent = prev.past[prev.past.length - 1]
      const newPast = prev.past.slice(0, -1)

      // Update canvas elements while preserving the background image
      setCanvasElements((prevElements) => ({
        ...newPresent,
        bgImage: prevElements.bgImage,
      }))

      // Update background state while preserving the current rotation
      setBackgroundState((prev) => ({
        ...prev,
        bgImageSize: { ...newPresent.bgImageSize },
        bgImagePosition: { ...newPresent.bgImagePosition },
      }))

      return {
        past: newPast,
        present: newPresent,
        future: [prev.present, ...prev.future],
      }
    })
  }, [setBackgroundState])

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev

      const newPresent = prev.future[0]
      const newFuture = prev.future.slice(1)

      // Update canvas elements while preserving the background image
      setCanvasElements((prevElements) => ({
        ...newPresent,
        bgImage: prevElements.bgImage,
      }))

      // Update background state while preserving the current rotation
      setBackgroundState((prev) => ({
        ...prev,
        bgImageSize: { ...newPresent.bgImageSize },
        bgImagePosition: { ...newPresent.bgImagePosition },
      }))

      return {
        past: [...prev.past, prev.present],
        present: newPresent,
        future: newFuture,
      }
    })
  }, [setBackgroundState])

  // Helper function to compare states without JSON.stringify
  const isStateEqual = (a: CanvasState, b: CanvasState): boolean => {
    return (
      a.images.length === b.images.length &&
      a.squares.length === b.squares.length &&
      a.textBoxes.length === b.textBoxes.length &&
      a.lines.length === b.lines.length &&
      a.bgImageSize.width === b.bgImageSize.width &&
      a.bgImageSize.height === b.bgImageSize.height &&
      a.bgImagePosition.x === b.bgImagePosition.x &&
      a.bgImagePosition.y === b.bgImagePosition.y
    )
  }

  return {
    canvasElements,
    setCanvasElements,
    history,
    setHistory,
    saveStateToHistory,
    undo,
    redo,
  }
}
