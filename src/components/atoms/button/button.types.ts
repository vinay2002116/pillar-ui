import { type VariantProps } from 'class-variance-authority'
import { ButtonVariants } from './button.styles'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean
  loading?: boolean
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  id?: string
}
