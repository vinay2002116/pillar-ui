import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './dialog-components'
import { DialogProps } from './dialog.types'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/atoms/typography'

function _Dialog({
  trigger,
  body,
  title,
  description,
  footer,
  onOpenChange,
  open,
  footerClassName,
  contentClassName,
  onInteractOutside,
}: DialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onInteractOutside={onInteractOutside}
        className={cn(
          'max-w-full border border-neutral-1 bg-white',
          contentClassName
        )}
      >
        {(title || description) && (
          <DialogHeader className="px-4 py-3">
            {title && (
              <DialogTitle>
                <Typography variant={'h3'} className="text-light-2">
                  {title}
                </Typography>
              </DialogTitle>
            )}
            {description && (
              <DialogDescription>
                <Typography variant={'body4'} className="text-light-4">
                  {description}
                </Typography>
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="">{body}</div>
        {footer && (
          <DialogFooter
            className={cn('rounded-b-xl bg-light-3 px-4 py-3', footerClassName)}
          >
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { _Dialog, DialogClose, DialogTrigger }
