'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'
import { Typography } from '@/components/atoms/typography'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

type TooltipContentProps = {
  headerText: React.ReactNode
  content: React.ReactNode
} & Omit<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'content'
>

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, headerText, content, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden bg-light-1 rounded-lg bg p-3 text-xs text-light-4 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border border-neutral-1 max-w-96 shadow-lg',
      className
    )}
    {...props}
  >
    <div className="flex gap-0.5 flex-col">
      <Typography variant={'body5'} className="text-light-2">
        {headerText}
      </Typography>
      <Typography variant={'body6'} className="text-light-4">
        {content}
      </Typography>
    </div>
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip as TooltipWrapper,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
