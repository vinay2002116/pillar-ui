import { type VariantProps } from 'class-variance-authority'
import { BadgeVariants } from './badge.styles'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BadgeVariants> {
  showBorder?: boolean
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  id?: string
}
