import { type VariantProps } from 'class-variance-authority'
import { CheckboxVariants } from './checkbox.styles'

export interface CheckboxProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof CheckboxVariants> {
  id?: string
}
