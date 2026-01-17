import React from 'react'
import { Button } from '@/components/atoms/button'
import { Spinner } from '@/components/unstyled/spinner'
import {
  Type,
  Pen,
  Eraser,
  Save,
  Trash2,
  Undo,
  Redo,
  RotateCw,
  Crop,
  Check,
  X,
} from 'lucide-react'
import { CropState } from '../types'

interface ToolbarProps {
  editorState: {
    isEditingText: boolean
    isSheetOpen: boolean
    isDrawingMode: boolean
    isCropping: boolean
    isEraseMode: boolean
  }
  canUndo: boolean
  canRedo: boolean
  cropState: CropState
  onSave: () => void
  onAddTextBox: () => void
  onOpenStickerSheet: () => void
  onToggleDrawingMode: () => void
  onToggleCropMode: () => void
  onApplyCrop: () => void
  onCancelCrop: () => void
  onClearAllLines: () => void
  onClearAll: () => void
  onUndo: () => void
  onRedo: () => void
  onRotateBackground: () => void
  onDoneEditing?: () => void
  buttonPositionClass: string
  isEraserEnabled: boolean
  isTrashEnabled: boolean
  isDownloading: boolean
}

const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  canUndo,
  canRedo,
  cropState,
  onSave,
  onAddTextBox,
  onOpenStickerSheet,
  onToggleDrawingMode,
  onToggleCropMode,
  onApplyCrop,
  onCancelCrop,
  onClearAllLines,
  onClearAll,
  onUndo,
  onRedo,
  onRotateBackground,
  onDoneEditing,
  buttonPositionClass,
  isEraserEnabled,
  isTrashEnabled,
  isDownloading,
}) => {
  if (editorState.isSheetOpen) return null

  // Determine if there is any content on the canvas
  const hasContent = isEraserEnabled || isTrashEnabled

  return (
    <>
      {/* Done button - positioned top-left */}
      {editorState.isEditingText && (
        <div className="absolute left-4 top-4 z-[100]">
          <Button
            onClick={onDoneEditing}
            size="md"
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1 rounded-md"
          >
            <span>Done</span>
          </Button>
        </div>
      )}

      {/* Regular toolbar - positioned according to buttonPositionClass */}
      <div
        className={`absolute ${buttonPositionClass} z-[100] flex flex-col items-end gap-2 pr-2`}
      >
        {!editorState.isEditingText && (
          <>
            <Button
              onClick={onSave}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={!hasContent || editorState.isCropping || isDownloading}
            >
              {isDownloading ? (
                <Spinner size="sm" className="text-light-1" />
              ) : (
                <Save height={20} width={20} />
              )}
            </Button>
            <Button
              onClick={onAddTextBox}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={editorState.isCropping || isDownloading}
            >
              <Type height={16} width={16} />
            </Button>
            <Button
              onClick={onOpenStickerSheet}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={editorState.isCropping || isDownloading}
            >
              <img
                src="https://frontend-static-files.geoiq.io/strapi/Sticker_Icons_1_fa6b45751f/Sticker_Icons_1_fa6b45751f.svg"
                alt="Sticker"
              />
            </Button>
            <Button
              onClick={onToggleDrawingMode}
              size="md"
              style={
                editorState.isDrawingMode ? { backgroundColor: '#3b82f6' } : {}
              }
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={
                editorState.isEditingText ||
                editorState.isCropping ||
                isDownloading
              }
            >
              <Pen height={16} width={16} />
            </Button>
            <Button
              onClick={onToggleCropMode}
              size="md"
              variant="secondary"
              style={
                editorState.isCropping ? { backgroundColor: '#3b82f6' } : {}
              }
              className={`cursor-pointer rounded-md border-none bg-none text-light-1 `}
              disabled={hasContent || isDownloading}
            >
              <Crop height={16} width={16} />
            </Button>
            {editorState.isCropping && (
              <>
                <Button
                  onClick={onApplyCrop}
                  size="md"
                  variant="secondary"
                  className="bg-green-300 border-none rounded-md cursor-pointer text-light-1"
                  disabled={
                    !cropState.cropRect.width ||
                    !cropState.cropRect.height ||
                    isDownloading
                  }
                >
                  <Check height={16} width={16} />
                </Button>
                <Button
                  onClick={onCancelCrop}
                  size="md"
                  variant="secondary"
                  className="bg-red-300 border-none rounded-md cursor-pointer text-light-1"
                  disabled={isDownloading}
                >
                  <X height={16} width={16} />
                </Button>
              </>
            )}
            <Button
              onClick={onClearAllLines} // This will toggle erase mode
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={
                !isEraserEnabled ||
                editorState.isEditingText ||
                editorState.isCropping ||
                isDownloading
              }
            >
              <Eraser height={16} width={16} />{' '}
            </Button>
            <Button
              onClick={onClearAll}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={
                !isTrashEnabled ||
                editorState.isEditingText ||
                editorState.isCropping ||
                isDownloading
              }
            >
              <Trash2 height={16} width={16} />
            </Button>
            <Button
              onClick={onUndo}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={
                !canUndo ||
                editorState.isEditingText ||
                editorState.isCropping ||
                isDownloading
              }
            >
              <Undo height={16} width={16} />
            </Button>
            <Button
              onClick={onRedo}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={
                !canRedo ||
                editorState.isEditingText ||
                editorState.isCropping ||
                isDownloading
              }
            >
              <Redo height={16} width={16} />
            </Button>
            <Button
              onClick={onRotateBackground}
              size="md"
              variant="secondary"
              className="border-none rounded-md cursor-pointer bg-none text-light-1"
              disabled={editorState.isCropping || isDownloading}
            >
              <RotateCw height={16} width={16} />
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default Toolbar
