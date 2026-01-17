/* eslint-disable no-console */
import { useCallback } from 'react'
import Konva from 'konva'
import { AssetValue, EditorState } from '../types'

interface UseDownloadHandlersProps {
  transformerRef: React.RefObject<Konva.Transformer>
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
  onAssetUpload?: (file: File) => Promise<AssetValue>
}

export const useDownloadHandlers = ({
  transformerRef,
  setEditorState,
  onAssetUpload,
}: UseDownloadHandlersProps) => {
  const handleDownload = useCallback(async () => {
    setEditorState((prev) => ({
      ...prev,
      isDrawingMode: false,
    }))
    try {
      const stage = transformerRef.current?.getStage()
      if (!stage) {
        console.error('Stage not found.')
        return
      }

      // Prepare stage for export
      transformerRef.current?.nodes([])
      stage.batchDraw()

      // Create temporary stage for export
      const tempStage = new Konva.Stage({
        container: document.createElement('div'),
        width: stage.width(),
        height: stage.height(),
      })

      const tempLayer = new Konva.Layer()
      tempStage.add(tempLayer)

      // Clone main group
      const mainGroup = stage.findOne('Group')
      if (!mainGroup) {
        console.error('Main group not found')
        return
      }

      const clone = mainGroup.clone({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      })

      // Adjust positions of cloned elements
      clone.children?.forEach((child: Konva.Node) => {
        if (
          child.getClassName() === 'Image' &&
          child === (mainGroup as Konva.Group).findOne('Image')
        ) {
          return // Skip background image
        }

        // Get absolute position and rotation
        const absPos = child.getAbsolutePosition()
        const absRotation = child.getAbsoluteRotation()

        child.x(absPos.x)
        child.y(absPos.y)
        child.rotation(absRotation)
        child.scaleX(1)
        child.scaleY(1)
      })

      tempLayer.add(clone)
      tempLayer.draw()

      // Calculate bounding box of all elements
      const bbox = clone.getClientRect()

      // Create final export stage with proper dimensions
      const exportStage = new Konva.Stage({
        container: document.createElement('div'),
        width: bbox.width,
        height: bbox.height,
      })

      const exportLayer = new Konva.Layer()
      exportStage.add(exportLayer)

      // Position group to fit bounding box
      const exportGroup = new Konva.Group({
        x: -bbox.x,
        y: -bbox.y,
      })

      exportGroup.add(clone.clone())
      exportLayer.add(exportGroup)
      exportLayer.draw()

      // Export as high-quality PNG
      const dataURL = exportStage.toDataURL({
        mimeType: 'image/png',
        quality: 1,
        pixelRatio: 2,
      })

      // Clean up
      tempStage.destroy()
      exportStage.destroy()

      // Upload to server
      const blob = await fetch(dataURL).then((res) => res.blob())
      const file = new File([blob], 'canvas-export.png', {
        type: 'image/png',
      })

      if (onAssetUpload) {
        const uploads = await onAssetUpload(file)
        return uploads
      }
    } catch (error) {
      console.error('Download failed:', error)
      throw error // Re-throw to handle in the parent component
    }
  }, [transformerRef, setEditorState, onAssetUpload])

  return {
    handleDownload,
  }
}
