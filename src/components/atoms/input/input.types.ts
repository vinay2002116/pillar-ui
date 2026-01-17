import { type VariantProps } from 'class-variance-authority'
import { InputVariants } from './input.styles'

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'prefix' | 'disabled'
    >,
    VariantProps<typeof InputVariants> {
  message?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
  id?: string
}
