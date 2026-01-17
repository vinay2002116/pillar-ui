import * as SheetPrimitive from '@radix-ui/react-dialog'
import React from 'react'

import { SheetContentProps } from './sheet-components'

export type SheetProps = {
  trigger: React.ReactNode
  triggerProps?: SheetPrimitive.DialogTriggerProps
  content: React.ReactNode
  contentProps?: SheetContentProps & SheetPrimitive.DialogContentProps
  title?: React.ReactNode
  titleProps?: SheetPrimitive.DialogTitleProps
  description?: React.ReactNode
  descriptionProps?: SheetPrimitive.DialogDescriptionProps
  footer?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInteractOutside?: (e: any) => void
  bodyProps?: React.HTMLAttributes<HTMLDivElement>
  id?: string
  /**
   * The container element for the sheet. The container should have a position relative in order to work.
   * give inline styles as transform: 'translateZ(0)',
   */
  container?: Element | DocumentFragment | null | undefined
}
