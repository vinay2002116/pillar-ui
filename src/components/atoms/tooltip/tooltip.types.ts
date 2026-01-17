import { TooltipContentProps } from '@radix-ui/react-tooltip'
import React from 'react'
export type TooltipProps = {
  /**
   * The content of the tooltip.
   */
  content: React.ReactNode
  headerText?: React.ReactNode
  /**
   * The position of the tooltip.
   */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * The children of the tooltip.
   */
  children?: React.ReactNode
  trigger?: 'hover' | 'click'
  triggerElement?: React.ReactNode | string
  delayDuration?: number
  id?: string
  className?: string
} & Omit<
  TooltipContentProps,
  'side' | 'children' | 'className' | 'headerText' | 'content'
>
