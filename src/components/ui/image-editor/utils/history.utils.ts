import { CanvasElements, BackgroundState, CanvasState } from '../types'

interface History {
  past: CanvasState[]
  future: CanvasState[]
}

export const handleUndo = (
  history: History,
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElements>>,
  setBackgroundState: React.Dispatch<React.SetStateAction<BackgroundState>>,
  originalUndo: () => void
): void => {
  if (history.past.length === 0) return

  const previousState = history.past[history.past.length - 1]
  setCanvasElements((prev: CanvasElements) => ({
    ...previousState,
    bgImage: prev.bgImage,
  }))
  setBackgroundState((prev: BackgroundState) => ({
    ...prev,
    bgImageSize: { ...previousState.bgImageSize },
    bgImagePosition: { ...previousState.bgImagePosition },
    originalBgSize: prev.originalBgSize,
  }))
  originalUndo()
}

export const handleRedo = (
  history: History,
  setCanvasElements: React.Dispatch<React.SetStateAction<CanvasElements>>,
  setBackgroundState: React.Dispatch<React.SetStateAction<BackgroundState>>,
  originalRedo: () => void
): void => {
  if (history.future.length === 0) return

  const nextState = history.future[0]
  setCanvasElements((prev: CanvasElements) => ({
    ...nextState,
    bgImage: prev.bgImage,
  }))
  setBackgroundState((prev: BackgroundState) => ({
    ...prev,
    bgImageSize: { ...nextState.bgImageSize },
    bgImagePosition: { ...nextState.bgImagePosition },
    originalBgSize: prev.originalBgSize,
  }))
  originalRedo()
}
