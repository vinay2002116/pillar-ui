import { Typography } from '../../atoms/typography'
import {
  AlertDialog as _AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog-components'
import { AlertDialogProps } from './alert-dialog.types'
import React from 'react'
// import { Button } from '@/components/ui/button'

export function AlertDialog({
  trigger,
  headerText,
  descriptionText,
  footer,
}: AlertDialogProps) {
  return (
    <_AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="p-0 bg-light-1 rounded-xl border-neutral-1">
        <AlertDialogHeader className="px-4 pt-3 ">
          <AlertDialogTitle>
            <Typography variant={'h3'} className="text-light-2 ">
              {headerText}
            </Typography>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Typography variant={'body1'} className="text-light-4 ">
              {descriptionText}
            </Typography>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="px-4 py-3 rounded-b-xl bg-light-3 gap-2.5 border-t border-neutral-2">
          {footer}
        </AlertDialogFooter>
      </AlertDialogContent>
    </_AlertDialog>
  )
}
