import { type VariantProps } from 'class-variance-authority'
import { AnimatedInputContainerVariants } from './animated-input.styles'

export interface AnimatedInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'prefix' | 'disabled'
    >,
    VariantProps<typeof AnimatedInputContainerVariants> {
  message?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
  id?: string
  placeholder?: string
  placeholders?: string[]
}
