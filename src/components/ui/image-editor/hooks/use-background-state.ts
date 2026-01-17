import { useState, useCallback } from 'react'
import { BackgroundState } from '../types'

export const useBackgroundState = (initialState: BackgroundState) => {
  const [backgroundState, setBackgroundState] =
    useState<BackgroundState>(initialState)

  const rotateBackground = useCallback(() => {
    setBackgroundState((prev) => ({
      ...prev,
      bgRotation: (prev.bgRotation + 90) % 360,
    }))
  }, [])

  const updateBackgroundSize = useCallback(
    (size: { width: number; height: number }) => {
      setBackgroundState((prev) => ({
        ...prev,
        bgImageSize: size,
      }))
    },
    []
  )

  return {
    backgroundState,
    setBackgroundState,
    rotateBackground,
    updateBackgroundSize,
  }
}
