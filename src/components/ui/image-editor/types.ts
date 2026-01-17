export type Position = { x: number; y: number }

export interface AssetValue {
  private_url: string
  public_url: string
}

export type Square = Position & {
  width: number
  height: number
  rotation: number
}

export type TextBox = Position & {
  text: string
  fontSize: number
  width: number
  height: number
  fill: string
  draggable: boolean
  rotation: number
  id: string
  align: string
  verticalAlign: string
  backgroundColor: string
}

export type DrawingLine = {
  points: number[]
  stroke: string
  strokeWidth: number
  id: string
}

export type CanvasState = {
  images: HTMLImageElement[]
  squares: Square[]
  textBoxes: TextBox[]
  lines: DrawingLine[]
  bgImage: HTMLImageElement | null
  bgImageSize: { width: number; height: number }
  bgImagePosition: { x: number; y: number }
  bgRotation?: number
}

export interface KonvaEditProps {
  stickers?: string[]
  backgroundImage?: string
  onAssetUpload?: (file: File) => Promise<AssetValue>
  onSave: (image: AssetValue) => void
}

export interface CropState {
  cropRect: {
    x: number
    y: number
    width: number
    height: number
  }
  cropStartPos: Position | null
  isDragging: boolean
  dragStartPos: Position | null
  isResizing: boolean
  resizeHandle:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | null
  resizeStartPos: Position | null
}

export interface EditorState {
  isClient: boolean
  isDrawingMode: boolean
  isEditingText: boolean
  isSheetOpen: boolean
  isTransforming: boolean
  drawing: boolean
  isCropping: boolean
  isEraseMode: boolean
}

export type SelectionState = {
  selectedImageIndex: number | null
  selectedTextBoxIndex: number | null
  selectedLineId: string | null
}

export interface BackgroundState {
  bgImageSize: {
    width: number
    height: number
  }
  bgImagePosition: {
    x: number
    y: number
  }
  bgRotation: number
  originalBgSize: {
    width: number
    height: number
  }
}

export interface CanvasElements {
  images: HTMLImageElement[]
  squares: Array<{
    x: number
    y: number
    width: number
    height: number
    rotation: number
  }>
  textBoxes: Array<{
    x: number
    y: number
    text: string
    fontSize: number
    width: number
    height: number
    fill: string
    draggable: boolean
    rotation: number
    id: string
    align: string
    verticalAlign: string
    backgroundColor: string
  }>
  lines: Array<{
    points: number[]
    stroke: string
    strokeWidth: number
    id: string
  }>
  bgImage: HTMLImageElement | null
}

export interface Dimensions {
  width: number
  height: number
}

export type HistoryState = {
  past: CanvasState[]
  present: CanvasState
  future: CanvasState[]
}

export type ToolbarProps = {
  editorState: EditorState
  canUndo: boolean
  canRedo: boolean
  cropState: CropState
  onSave: () => Promise<void>
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
  buttonPositionClass: string
  isEraserEnabled: boolean
  isTrashEnabled: boolean
}
