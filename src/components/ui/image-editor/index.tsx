/* eslint-disable no-console */
import React, { useRef, useEffect, useCallback } from 'react'
// Importing necessary components and libraries
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Transformer,
  Line as KonvaLine,
  Text as KonvaText,
  Group,
  Rect,
} from 'react-konva'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { useToast } from '@/components/molecules/toast'

// Importing custom components
import TextEditor from './components/text-editor'
import DeleteButton from './components/delete-button'
import StickerSheet from './components/sticker-sheet'
import Toolbar from './components/edit-toolbar'
import { KonvaEditProps, Position } from './types'
import {
  useCanvasState,
  useEditorState,
  useBackgroundState,
  useSelectionState,
  useCanvasDimensions,
  useDrawingHandlers,
  useMouseHandlers,
} from './hooks'
import { useDownloadHandlers } from './hooks/use-downloading-handlers'
import { useCropHandlers } from './hooks/use-crop-handlers'

// Import utility functions
import { loadImage as loadImageUtil } from './utils/image.utils'
import { isPointInImage as isPointInImageUtil } from './utils/image.utils'
import { getInitialPositionInImage as getInitialPositionInImageUtil } from './utils/image.utils'
import {
  handleImageTransform as handleImageTransformUtil,
  handleTextTransform as handleTextTransformUtil,
} from './utils/canvas.utils'
import { getRotatedPointerPosition as getRotatedPointerPositionUtil } from './utils/mouse.utils'
import {
  handleUndo as handleUndoUtil,
  handleRedo as handleRedoUtil,
} from './utils/history.utils'

// Constants
const DEFAULT_TEXT = 'Double Tap to Edit' // Default text for new text boxes

const ImageEditor: React.FC<KonvaEditProps> = ({
  stickers = [], // Array of sticker URLs
  backgroundImage, // Background image URL
  onAssetUpload,
  onSave,
}) => {
  // Add downloading state
  const [isDownloading, setIsDownloading] = React.useState(false)
  const { toast } = useToast()

  // Refs - References to DOM elements and Konva nodes
  const imageRefs = useRef<(Konva.Image | null)[]>([]) // References to image elements
  const textBoxRefs = useRef<(Konva.Text | null)[]>([]) // References to text elements
  const transformerRef = useRef<Konva.Transformer>(null) // Reference to transformer (for resizing/rotating)
  const containerRef = useRef<HTMLDivElement>(null) // Reference to container div
  const bgGroupRef = useRef<Konva.Group>(null) // Reference to background group
  const cropRectRef = useRef<Konva.Rect>(null) // Reference to crop rectangle

  // Editor state - tracks various UI and interaction states
  const {
    editorState,
    setEditorState,
    toggleDrawingMode,
    toggleTextEditing,
    toggleSheetOpen,
  } = useEditorState()

  // Background state - tracks background image properties
  const { backgroundState, setBackgroundState, rotateBackground } =
    useBackgroundState({
      bgImageSize: { width: 0, height: 0 }, // Current displayed size
      bgImagePosition: { x: 0, y: 0 }, // Current position
      bgRotation: 0, // Rotation angle in degrees
      originalBgSize: { width: 0, height: 0 }, // Original size before any transforms
    })

  // Canvas elements - stores all elements on the canvas
  const {
    canvasElements,
    setCanvasElements,
    history,
    saveStateToHistory,
    undo: originalUndo,
    redo: originalRedo,
    setHistory,
  } = useCanvasState(
    {
      images: [], // Array of sticker images
      squares: [], // Array of sticker positions/sizes
      textBoxes: [], // Array of text boxes
      lines: [], // Array of drawn lines
      bgImage: null, // Background image
    },
    backgroundState,
    setBackgroundState
  )

  // Selection state - tracks currently selected elements
  const { selectionState, clearSelection, selectImage, selectTextBox } =
    useSelectionState()

  // Dimensions - tracks canvas dimensions
  const dimensions = useCanvasDimensions()

  // Helper functions
  const loadImage = useCallback((url: string) => {
    return loadImageUtil(url)
  }, [])

  const isPointInImage = useCallback(
    (x: number, y: number) => {
      return isPointInImageUtil(x, y, backgroundState, dimensions)
    },
    [backgroundState, dimensions]
  )

  const getInitialPositionInImage = useCallback(
    (width: number, height: number) => {
      return getInitialPositionInImageUtil(width, height, backgroundState)
    },
    [backgroundState]
  )

  const getRotatedPointerPosition = useCallback(
    (pos: Position) => {
      return getRotatedPointerPositionUtil(pos, backgroundState, dimensions)
    },
    [backgroundState, dimensions]
  )

  const handleImageTransform = useCallback(
    (index: number, node: Konva.Image) => {
      handleImageTransformUtil(
        index,
        node,
        setCanvasElements,
        saveStateToHistory
      )
    },
    [saveStateToHistory]
  )

  const handleTextTransformEnd = useCallback(
    (index: number) => {
      const node = textBoxRefs.current[index]
      if (!node) return
      handleTextTransformUtil(
        index,
        node,
        setCanvasElements,
        setEditorState,
        saveStateToHistory
      )
    },
    [saveStateToHistory]
  )

  // Get drawing handlers
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    selectedColor,
    setSelectedColor,
  } = useDrawingHandlers({
    editorState,
    setEditorState,
    canvasElements,
    setCanvasElements,
    backgroundState,
    getRotatedPointerPosition,
    isPointInImage,
    selectImage,
    saveStateToHistory,
  })

  // Get mouse handlers
  const {
    handleStageClick,
    handleImageClick,
    handleTextClick,
    handleLineClick,
    handleTextDblClick,
    handleTextTransformStart,
  } = useMouseHandlers({
    editorState,
    setEditorState,
    canvasElements,
    setCanvasElements,
    selectionState,
    clearSelection,
    selectImage,
    selectTextBox,
    toggleTextEditing,
    saveStateToHistory,
    transformerRef,
    textBoxRefs,
  })

  // Get download handlers
  const { handleDownload } = useDownloadHandlers({
    transformerRef,
    setEditorState,
    onAssetUpload,
  })

  // Get crop handlers
  const {
    cropState: cropStateHandlers,
    toggleCropMode: toggleCropModeHandlers,
    handleCropMouseDown: handleCropMouseDownHandlers,
    handleCropMouseMove: handleCropMouseMoveHandlers,
    handleCropMouseUp: handleCropMouseUpHandlers,
    handleCancelCrop: handleCancelCropHandlers,
    handleApplyCrop,
  } = useCropHandlers(
    canvasElements,
    backgroundState,
    dimensions,
    setCanvasElements,
    setBackgroundState,
    setEditorState,
    clearSelection,
    toggleTextEditing,
    setHistory,
    saveStateToHistory
  )

  // Event handlers
  const handleDragEnd = useCallback(() => {
    transformerRef.current?.getLayer()?.batchDraw() // Redraw layer
    saveStateToHistory() // Save new state
  }, [saveStateToHistory])

  const handleAddTextBox = useCallback(() => {
    setEditorState((prev) => ({
      ...prev,
      isDrawingMode: false,
    }))

    // Calculate size and position for new text box
    const newWidth = backgroundState.bgImageSize.width * 0.25
    const initialPos = {
      x:
        backgroundState.bgImagePosition.x +
        (backgroundState.bgImageSize.width - newWidth) / 2,
      y: backgroundState.bgImagePosition.y + 20, // 20px from top
    }
    const newTextBox = {
      x: initialPos.x,
      y: initialPos.y,
      text: DEFAULT_TEXT,
      fontSize: Math.max(12, backgroundState.bgImageSize.width * 0.03),
      width: newWidth,
      height: 30, // Initial height
      fill: 'black',
      draggable: true,
      rotation: 0,
      id: Math.random().toString(36).substring(2, 9), // Random ID
      align: 'center',
      verticalAlign: 'middle',
      backgroundColor: '#FFB82F',
    }

    setCanvasElements((prev) => ({
      ...prev,
      textBoxes: [...prev.textBoxes, newTextBox],
    }))
    saveStateToHistory()
  }, [backgroundState, saveStateToHistory])

  const handleTextChange = useCallback(
    (index: number, newText: string) => {
      setCanvasElements((prev) => ({
        ...prev,
        textBoxes: prev.textBoxes.map((box, i) =>
          i === index ? { ...box, text: newText } : box
        ),
      }))
      toggleTextEditing(false)
      saveStateToHistory()
    },
    [saveStateToHistory, toggleTextEditing]
  )

  const handleDeleteSelected = useCallback(() => {
    if (selectionState.selectedImageIndex !== null) {
      // Delete selected image
      setCanvasElements((prev) => ({
        ...prev,
        images: prev.images.filter(
          (_, i) => i !== selectionState.selectedImageIndex
        ),
        squares: prev.squares.filter(
          (_, i) => i !== selectionState.selectedImageIndex
        ),
      }))
      selectImage(null)
      saveStateToHistory()
    } else if (selectionState.selectedTextBoxIndex !== null) {
      // Delete selected text box
      setCanvasElements((prev) => ({
        ...prev,
        textBoxes: prev.textBoxes.filter(
          (_, i) => i !== selectionState.selectedTextBoxIndex
        ),
      }))
      selectTextBox(null)
      saveStateToHistory()
    } else if (selectionState.selectedLineId !== null) {
      // Delete selected line
      setCanvasElements((prev) => ({
        ...prev,
        lines: prev.lines.filter(
          (line) => line.id !== selectionState.selectedLineId
        ),
      }))
      selectImage(null)
      saveStateToHistory()
    }
  }, [
    selectionState.selectedImageIndex,
    selectionState.selectedTextBoxIndex,
    selectionState.selectedLineId,
    saveStateToHistory,
    selectImage,
    selectTextBox,
  ])

  const handleClearAllLines = useCallback(() => {
    setEditorState((prev) => ({
      ...prev,
      isEraseMode: !prev.isEraseMode, // Toggle erase mode
      isDrawingMode: false, // Disable drawing mode when erasing
    }))
  }, [setEditorState])

  const handleClearAll = useCallback(() => {
    setEditorState((prev) => ({
      ...prev,
      isDrawingMode: false,
      isEditingText: false,
    }))
    setCanvasElements({
      images: [],
      squares: [],
      textBoxes: [],
      lines: [],
      bgImage: canvasElements.bgImage,
    })
    selectImage(null)
    // Don't save to history when clearing everything
    // saveStateToHistory()
  }, [canvasElements.bgImage, selectImage])

  // const handleDoneEditing = useCallback(() => {
  //   toggleTextEditing(false)
  // }, [toggleTextEditing])

  const handleRotateBackground = useCallback(() => {
    rotateBackground()
  }, [rotateBackground])

  const handleStickerSelection = useCallback(
    async (url: string) => {
      try {
        // Load sticker image
        const img = await loadImage(url)
        const newWidth = backgroundState.bgImageSize.width * 0.25
        const newHeight = newWidth
        const initialPos = getInitialPositionInImage(newWidth, newHeight)

        // Add to canvas
        setCanvasElements((prev) => ({
          ...prev,
          images: [...prev.images, img],
          squares: [
            ...prev.squares,
            {
              x: initialPos.x,
              y: initialPos.y,
              width: newWidth,
              height: newHeight,
              rotation: 0,
            },
          ],
        }))
        saveStateToHistory()
      } catch (error) {
        console.error('Error loading sticker:', error)
      }
    },
    [
      loadImage,
      getInitialPositionInImage,
      backgroundState.bgImageSize.width,
      saveStateToHistory,
    ]
  )

  const handleUndo = useCallback(() => {
    handleUndoUtil(history, setCanvasElements, setBackgroundState, originalUndo)
    // Reset text editor state when undoing
    setEditorState((prev) => ({
      ...prev,
      isEditingText: false,
    }))
    clearSelection()
  }, [history, originalUndo, setBackgroundState, clearSelection])

  const handleRedo = useCallback(() => {
    handleRedoUtil(history, setCanvasElements, setBackgroundState, originalRedo)
  }, [history, originalRedo, setBackgroundState])

  // Effects

  /**
   * Loads the background image when component mounts or image changes
   */
  useEffect(() => {
    const loadBackgroundImage = async () => {
      try {
        const imgUrl = backgroundImage || ''
        const img = await loadImage(imgUrl)
        img.crossOrigin = 'Anonymous'
        // Calculate dimensions to fit container
        const aspectRatio = img.width / img.height
        const containerWidth = Math.min(dimensions.width, 800)
        const calculatedHeight = containerWidth / aspectRatio
        const posX = (dimensions.width - containerWidth) / 2
        const posY = (dimensions.height - calculatedHeight) / 2

        // Update state with loaded image
        setCanvasElements((prev) => ({
          ...prev,
          bgImage: img,
        }))

        setBackgroundState({
          bgImageSize: { width: containerWidth, height: calculatedHeight },
          bgImagePosition: { x: posX, y: posY },
          bgRotation: 0,
          originalBgSize: { width: containerWidth, height: calculatedHeight },
        })

        // Don't save initial state to history
        // saveStateToHistory()

        // Log the history length after initial setup
        console.log('Initial history.past.length:', history.past.length)
      } catch (error) {
        console.error('Error loading background image:', error)
      }
    }

    // Only load if we have a background image URL
    if (backgroundImage) {
      loadBackgroundImage()
    }
  }, [backgroundImage]) // Only depend on backgroundImage prop

  /**
   * Updates transformer when selection changes
   */
  useEffect(() => {
    if (!transformerRef.current) return
    // Get currently selected node
    const selectedNode =
      selectionState.selectedImageIndex !== null
        ? imageRefs.current[selectionState.selectedImageIndex]
        : selectionState.selectedTextBoxIndex !== null
          ? textBoxRefs.current[selectionState.selectedTextBoxIndex]
          : null
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]) // Attach transformer to selected node
      transformerRef.current.getLayer()?.batchDraw()
    } else {
      transformerRef.current.nodes([]) // Clear transformer
    }
  }, [selectionState.selectedImageIndex, selectionState.selectedTextBoxIndex])

  // Derived values
  const buttonPositionClass = 'right-2 top-2' // CSS class for button positioning
  const canUndo = history.past.length > 0 // Whether undo is available
  const canRedo = history.future.length > 0 // Whether redo is available
  // Render loading state if not yet mounted
  if (!editorState.isClient) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    )
  }

  async function handleSave() {
    try {
      setIsDownloading(true)
      const uploads = await handleDownload()

      if (uploads) {
        toast({
          title: 'Success',
          description: 'Image updated successfully!',
          icon: 'success',
        })
        onSave({
          private_url: uploads.private_url,
          public_url: uploads.public_url,
        })
      }
    } catch (error) {
      console.error('Save failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to update image. Please try again.',
        icon: 'danger',
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // Main render
  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden touch-none bg-light-4"
      style={{ overflowY: 'hidden' }}
    >
      {/* Close button - conditionally rendered */}
      {/* {!editorState.isEditingText && !editorState.isSheetOpen && (
        <CloseButton onClick={() => {}} />
      )} */}

      {/* {editorState.isEditingText && <CloseButton onClick={handleDoneEditing} />} */}

      {/* Main toolbar */}
      <Toolbar
        editorState={editorState}
        canUndo={canUndo}
        canRedo={canRedo}
        cropState={cropStateHandlers}
        onSave={handleSave}
        onAddTextBox={handleAddTextBox}
        onOpenStickerSheet={() => toggleSheetOpen(true)}
        onToggleDrawingMode={toggleDrawingMode}
        onToggleCropMode={toggleCropModeHandlers}
        onApplyCrop={handleApplyCrop}
        onCancelCrop={handleCancelCropHandlers}
        onClearAllLines={handleClearAllLines}
        onClearAll={handleClearAll}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onRotateBackground={handleRotateBackground}
        buttonPositionClass={buttonPositionClass}
        isEraserEnabled={canvasElements.lines.length > 0}
        isTrashEnabled={
          canvasElements.textBoxes.length > 0 ||
          canvasElements.lines.length > 0 ||
          canvasElements.images.length > 0
        }
        isDownloading={isDownloading}
      />

      {/* Sticker sheet modal */}
      <StickerSheet
        isOpen={editorState.isSheetOpen}
        onOpenChange={(open) => toggleSheetOpen(open)}
        onSelectSticker={handleStickerSelection}
        stickers={stickers}
      />

      {/* Konva canvas */}
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={
          editorState.isCropping ? handleCropMouseDownHandlers : handleMouseDown
        }
        onMouseMove={
          editorState.isCropping ? handleCropMouseMoveHandlers : handleMouseMove
        }
        onMouseUp={
          editorState.isCropping ? handleCropMouseUpHandlers : handleMouseUp
        }
        onTouchStart={
          editorState.isCropping ? handleCropMouseDownHandlers : handleMouseDown
        }
        onTouchMove={
          editorState.isCropping ? handleCropMouseMoveHandlers : handleMouseMove
        }
        onTouchEnd={
          editorState.isCropping ? handleCropMouseUpHandlers : handleMouseUp
        }
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        <Layer>
          {/* Background group with rotation support */}
          <Group
            ref={bgGroupRef}
            x={dimensions.width / 2}
            y={dimensions.height / 2}
            rotation={backgroundState.bgRotation}
            offsetX={dimensions.width / 2}
            offsetY={dimensions.height / 2}
          >
            {/* Background image */}
            {canvasElements.bgImage && (
              <KonvaImage
                image={canvasElements.bgImage}
                width={backgroundState.bgImageSize.width}
                height={backgroundState.bgImageSize.height}
                x={backgroundState.bgImagePosition.x}
                y={backgroundState.bgImagePosition.y}
                onClick={handleStageClick}
                onTap={handleStageClick}
              />
            )}

            {/* Sticker images */}
            {canvasElements.images.map((img, index) => (
              <Group key={`image-${index}`}>
                <KonvaImage
                  ref={(node) => (imageRefs.current[index] = node)}
                  x={canvasElements.squares[index]?.x || 0}
                  y={canvasElements.squares[index]?.y || 0}
                  image={img}
                  width={canvasElements.squares[index]?.width || 200}
                  height={canvasElements.squares[index]?.height || 200}
                  draggable={!editorState.isDrawingMode}
                  rotation={canvasElements.squares[index]?.rotation || 0}
                  onDragEnd={(e) => {
                    setCanvasElements((prev) => ({
                      ...prev,
                      squares: prev.squares.map((square, i) =>
                        i === index
                          ? { ...square, x: e.target.x(), y: e.target.y() }
                          : square
                      ),
                    }))
                    handleDragEnd()
                  }}
                  onClick={(e) => handleImageClick(index, e)}
                  onTap={(e) =>
                    handleImageClick(index, e as KonvaEventObject<MouseEvent>)
                  }
                  onTransformEnd={(e) => {
                    const node = e.target as Konva.Image
                    handleImageTransform(index, node)
                  }}
                />
                {/* Delete button for selected image */}
                {selectionState.selectedImageIndex === index && (
                  <DeleteButton
                    x={canvasElements.squares[index]?.x || 0}
                    y={canvasElements.squares[index]?.y || 0}
                    onClick={handleDeleteSelected}
                  />
                )}
              </Group>
            ))}

            {/* Drawn lines */}
            {canvasElements.lines.map((line) => (
              <Group key={`line-${line.id}`}>
                <KonvaLine
                  points={line.points}
                  stroke={line.stroke}
                  strokeWidth={line.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation="source-over"
                  onClick={(e) => handleLineClick(line.id, e)}
                  onTap={(e) => handleLineClick(line.id, e)}
                  shadowColor={
                    selectionState.selectedLineId === line.id
                      ? 'yellow'
                      : undefined
                  }
                  shadowBlur={
                    selectionState.selectedLineId === line.id ? 10 : undefined
                  }
                  shadowOpacity={
                    selectionState.selectedLineId === line.id ? 0.8 : undefined
                  }
                />
                {/* Delete button for selected line */}
                {selectionState.selectedLineId === line.id && (
                  <DeleteButton
                    x={line.points[0]}
                    y={line.points[1]}
                    onClick={handleDeleteSelected}
                  />
                )}
              </Group>
            ))}

            {/* Text boxes */}
            {canvasElements.textBoxes.map((textBox, index) => (
              <Group key={`text-${index}`}>
                {/* Text box background */}
                <Rect
                  x={textBox.x}
                  y={textBox.y}
                  width={textBox.width}
                  height={
                    textBoxRefs.current[index]?.height() ||
                    textBox.fontSize * 2.5
                  }
                  fill={textBox.backgroundColor}
                  rotation={textBox.rotation}
                  cornerRadius={4}
                  stroke="black"
                  strokeWidth={2}
                />

                {/* Text element */}
                <KonvaText
                  ref={(node) => (textBoxRefs.current[index] = node)}
                  x={textBox.x}
                  y={textBox.y}
                  text={textBox.text}
                  fontSize={textBox.fontSize}
                  width={textBox.width}
                  height={textBox.height}
                  fill={textBox.fill}
                  align={textBox.align as 'left' | 'center' | 'right'}
                  verticalAlign={
                    textBox.verticalAlign as 'top' | 'middle' | 'bottom'
                  }
                  draggable={
                    !editorState.isEditingText && !editorState.isDrawingMode
                  }
                  rotation={textBox.rotation}
                  onClick={(e) => handleTextClick(index, e)}
                  onTap={(e) =>
                    handleTextClick(index, e as KonvaEventObject<MouseEvent>)
                  }
                  onDblClick={() => handleTextDblClick(index)}
                  onDblTap={() => handleTextDblClick(index)}
                  onTransformStart={handleTextTransformStart}
                  onTransformEnd={() => handleTextTransformEnd(index)}
                  onDragEnd={(e) => {
                    if (editorState.isEditingText) return
                    const newX = e.target.x()
                    const newY = e.target.y()
                    setCanvasElements((prev) => ({
                      ...prev,
                      textBoxes: prev.textBoxes.map((box, i) =>
                        i === index ? { ...box, x: newX, y: newY } : box
                      ),
                    }))
                    handleDragEnd()
                  }}
                  visible={
                    !editorState.isEditingText ||
                    selectionState.selectedTextBoxIndex !== index
                  }
                  perfectDrawEnabled={false}
                  listening={!editorState.isEditingText}
                  scaleX={1}
                  scaleY={1}
                />

                {/* Delete button for selected text box */}
                {selectionState.selectedTextBoxIndex === index &&
                  !editorState.isEditingText && (
                    <DeleteButton
                      x={textBox.x}
                      y={textBox.y}
                      onClick={handleDeleteSelected}
                    />
                  )}

                {/* Text editor (shown when editing text) */}
                {editorState.isEditingText &&
                  selectionState.selectedTextBoxIndex === index && (
                    <TextEditor
                      textNode={textBoxRefs.current[index]}
                      onChange={(newText) => handleTextChange(index, newText)}
                      onClose={() =>
                        setEditorState((prev) => ({
                          ...prev,
                          isEditingText: false,
                        }))
                      }
                      bgImagePosition={backgroundState.bgImagePosition}
                      bgImageSize={backgroundState.bgImageSize}
                      dimensions={dimensions}
                    />
                  )}
              </Group>
            ))}

            {editorState.isCropping && (
              <>
                <Rect
                  ref={cropRectRef}
                  x={cropStateHandlers.cropRect.x}
                  y={cropStateHandlers.cropRect.y}
                  width={cropStateHandlers.cropRect.width}
                  height={cropStateHandlers.cropRect.height}
                  stroke="#FFFAEB"
                  strokeWidth={2}
                  dash={[10, 10]}
                  fill="rgba(0, 0, 0, 0.5)"
                  listening={true}
                  cornerRadius={4}
                  shadowColor={
                    cropStateHandlers.cropRect.width > 0 &&
                    cropStateHandlers.cropRect.height > 0
                      ? cropStateHandlers.isDragging ||
                        cropStateHandlers.isResizing
                        ? '#3b82f6'
                        : 'yellow'
                      : 'red'
                  }
                  shadowBlur={10}
                  shadowOpacity={0.6}
                  onMouseEnter={(e) => {
                    const stage = e.target.getStage()
                    if (stage) {
                      stage.container().style.cursor = 'move'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const stage = e.target.getStage()
                    if (stage) {
                      stage.container().style.cursor = 'default'
                    }
                  }}
                />
                {/* Resize handles */}
                {cropStateHandlers.cropRect.width > 0 &&
                  cropStateHandlers.cropRect.height > 0 && (
                    <>
                      {/* Corner handles */}
                      <Rect
                        x={cropStateHandlers.cropRect.x - 5}
                        y={cropStateHandlers.cropRect.y - 5}
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'nwse-resize'
                          }
                        }}
                      />
                      <Rect
                        x={
                          cropStateHandlers.cropRect.x +
                          cropStateHandlers.cropRect.width -
                          5
                        }
                        y={cropStateHandlers.cropRect.y - 5}
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'nesw-resize'
                          }
                        }}
                      />
                      <Rect
                        x={cropStateHandlers.cropRect.x - 5}
                        y={
                          cropStateHandlers.cropRect.y +
                          cropStateHandlers.cropRect.height -
                          5
                        }
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'nesw-resize'
                          }
                        }}
                      />
                      <Rect
                        x={
                          cropStateHandlers.cropRect.x +
                          cropStateHandlers.cropRect.width -
                          5
                        }
                        y={
                          cropStateHandlers.cropRect.y +
                          cropStateHandlers.cropRect.height -
                          5
                        }
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'nwse-resize'
                          }
                        }}
                      />
                      {/* Edge handles */}
                      <Rect
                        x={
                          cropStateHandlers.cropRect.x +
                          cropStateHandlers.cropRect.width / 2 -
                          5
                        }
                        y={cropStateHandlers.cropRect.y - 5}
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'ns-resize'
                          }
                        }}
                      />
                      <Rect
                        x={
                          cropStateHandlers.cropRect.x +
                          cropStateHandlers.cropRect.width -
                          5
                        }
                        y={
                          cropStateHandlers.cropRect.y +
                          cropStateHandlers.cropRect.height / 2 -
                          5
                        }
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'ew-resize'
                          }
                        }}
                      />
                      <Rect
                        x={
                          cropStateHandlers.cropRect.x +
                          cropStateHandlers.cropRect.width / 2 -
                          5
                        }
                        y={
                          cropStateHandlers.cropRect.y +
                          cropStateHandlers.cropRect.height -
                          5
                        }
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'ns-resize'
                          }
                        }}
                      />
                      <Rect
                        x={cropStateHandlers.cropRect.x - 5}
                        y={
                          cropStateHandlers.cropRect.y +
                          cropStateHandlers.cropRect.height / 2 -
                          5
                        }
                        width={10}
                        height={10}
                        fill="#FFFAEB"
                        stroke="#000"
                        strokeWidth={1}
                        cornerRadius={2}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage()
                          if (stage) {
                            stage.container().style.cursor = 'ew-resize'
                          }
                        }}
                      />
                    </>
                  )}
              </>
            )}
          </Group>

          {/* Transformer for resizing/rotating elements */}
          <Transformer
            ref={transformerRef}
            enabledAnchors={
              selectionState.selectedTextBoxIndex !== null
                ? [
                    'top-left',
                    'top-right',
                    'bottom-left',
                    'bottom-right',
                    'middle-left',
                    'middle-right',
                    'top-center',
                    'bottom-center',
                  ]
                : undefined
            }
            boundBoxFunc={(oldBox, newBox) => {
              if (selectionState.selectedTextBoxIndex !== null) {
                return {
                  ...newBox,
                  width: Math.max(30, newBox.width),
                  height: Math.max(30, newBox.height),
                }
              }
              return newBox
            }}
            keepRatio={false}
          />
        </Layer>
      </Stage>
      {editorState.isDrawingMode && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
          }}
        >
          {['#FFB82F', 'red', 'blue', 'green', 'black', 'white'].map(
            (color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: selectedColor === color ? '2px solid black' : 'none',
                  cursor: 'pointer',
                }}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

export { ImageEditor }
