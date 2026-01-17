import React, { useEffect, useRef } from 'react'
import { Html } from 'react-konva-utils'
import Konva from 'konva'
import { Dimensions } from '../types'

interface TextEditorProps {
  textNode: Konva.Text | null
  onClose: () => void
  onChange: (text: string) => void
  bgImagePosition: { x: number; y: number }
  bgImageSize: { width: number; height: number }
  dimensions: Dimensions
}

const TextEditor: React.FC<TextEditorProps> = ({
  textNode,
  onClose,
  onChange,
  bgImagePosition,
  bgImageSize,
  dimensions,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!textareaRef.current || !textNode) return

    const textarea = textareaRef.current
    const stage = textNode.getStage()
    if (!stage) return

    // Get the absolute position of the text node
    const scale = textNode.getAbsoluteScale()

    // Calculate position relative to background image
    const textareaWidth = Math.min(400, bgImageSize.width * 0.8)
    const left = bgImagePosition.x + (bgImageSize.width - textareaWidth) / 2
    const top = bgImagePosition.y + 20 // 20px from top of background image

    // Apply textarea styles
    Object.assign(textarea.style, {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${textareaWidth}px`,
      minHeight: '60px',
      fontSize: `${textNode.fontSize() * scale.x}px`,
      border: '2px solid black',
      padding: '4px',
      margin: '0px',
      background: textNode.fill() === 'black' ? '#FFB82F' : 'white',
      outline: 'none',
      resize: 'none',
      lineHeight: textNode.lineHeight().toString(),
      fontFamily: textNode.fontFamily(),
      textAlign: textNode.align() as 'left' | 'center' | 'right',
      color: textNode.fill(),
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      opacity: '10',
      pointerEvents: 'auto',
      zIndex: '1000',
      overflow: 'hidden',
      transformOrigin: 'top center',
    })

    textarea.value = textNode.text()
    textarea.focus()

    const handleInput = () => {
      textarea.style.height = 'auto'
      const newHeight = Math.max(
        textarea.scrollHeight,
        textNode.height() * scale.y
      )
      textarea.style.height = `${newHeight}px`
      textNode.height(newHeight / scale.y)
      textNode.getLayer()?.batchDraw()
    }

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      // Check if the click/touch is outside the textarea and its parent elements
      const target = e.target as Node
      if (!textarea.contains(target)) {
        onChange(textarea.value)
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Save on Ctrl+Enter or Cmd+Enter (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        onChange(textarea.value)
        onClose()
        return
      }

      // Close without saving on Escape
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      // Allow Shift+Enter for new lines
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        document.execCommand('insertLineBreak')
      }
    }

    const handleBlur = () => {
      onChange(textarea.value)
      onClose()
    }

    textarea.addEventListener('keydown', handleKeyDown)
    textarea.addEventListener('input', handleInput)
    textarea.addEventListener('blur', handleBlur)
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick)
      window.addEventListener('touchend', handleOutsideClick)
    })

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown)
      textarea.removeEventListener('input', handleInput)
      textarea.removeEventListener('blur', handleBlur)
      window.removeEventListener('click', handleOutsideClick)
      window.removeEventListener('touchend', handleOutsideClick)
    }
  }, [textNode, onClose, onChange, bgImagePosition, bgImageSize, dimensions])

  return <Html>{textNode && <textarea ref={textareaRef} />}</Html>
}

export default TextEditor
