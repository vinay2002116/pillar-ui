'use client'

import React from 'react'

import {
  ToastPrimitive,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastIcon,
} from './toast-components'
import { useToast } from './use-toast'
import { Typography } from '../../atoms/typography'
import { Button } from '../../atoms/button'

function Toast() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        ...props
      }) {
        return (
          <ToastPrimitive key={id} {...props}>
            <div className="grid grid-flow-col gap-2">
              {icon && <ToastIcon icon={icon} />}
              <div className="grid gap-1">
                {title && (
                  <ToastTitle>
                    <Typography variant={'body3'} className="text-light-2">
                      {title}
                    </Typography>
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription>
                    <Typography variant={'body4'} className="text-light-4">
                      {description}
                    </Typography>
                  </ToastDescription>
                )}
                <div>
                  <ToastAction
                    altText={action?.altText ?? ''}
                    onClick={action?.method}
                    className="p-0 m-0"
                  >
                    <Button variant={'link-primary'}>{action?.title}</Button>
                  </ToastAction>
                </div>
              </div>
            </div>

            <ToastClose />
          </ToastPrimitive>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

export { Toast, useToast }
