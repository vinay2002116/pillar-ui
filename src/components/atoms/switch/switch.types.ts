import { type VariantProps } from 'class-variance-authority'
import { SwitchVariants } from './switch.styles'

export interface SwitchProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof SwitchVariants> {
  disabled?: boolean
  size?: 'sm' | 'md'
}
