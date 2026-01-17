import { Typography } from '@/components/atoms/typography'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet-components'
import { SheetProps } from './sheet.types'
import React from 'react'

export function SheetPrimary({
  trigger,
  content,
  triggerProps,
  contentProps,
  title,
  footer,
  titleProps,
  description,
  descriptionProps,
  onOpenChange,
  open,
  onInteractOutside,
  bodyProps,
  container,
}: SheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetTrigger asChild {...triggerProps}>
        {trigger}
      </SheetTrigger>
      <SheetContent
        onInteractOutside={onInteractOutside}
        {...contentProps}
        container={container}
      >
        {title && (
          <SheetHeader className="border-b border-neutral-1">
            <SheetTitle {...titleProps}>
              <Typography variant={'h3'} className="text-light-2">
                {title}
              </Typography>
            </SheetTitle>
          </SheetHeader>
        )}
        <div
          className="p-3 overflow-y-auto"
          style={{
            height: footer ? `calc(100vh - 8rem)` : '100%',
          }}
          {...bodyProps}
        >
          {description && (
            <SheetDescription className="pb-3" {...descriptionProps}>
              <Typography variant={'body2'} className="text-light-4">
                {description}
              </Typography>
            </SheetDescription>
          )}

          {content}
        </div>
        {footer && (
          <SheetFooter className="absolute bottom-0 flex items-center w-full p-3 border-t bg-light-2 border-neutral-1">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { SheetClose }
