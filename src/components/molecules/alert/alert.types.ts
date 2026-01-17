import { type VariantProps } from 'class-variance-authority'
import { AlertVariants } from './alert.styles'
import React from 'react'

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AlertVariants> {
  id?: string
  description?: React.ReactNode
  title?: string
  showButton?: boolean
  buttonLabel?: string
  onButtonClick?: () => void
  shortContent?: boolean
}
