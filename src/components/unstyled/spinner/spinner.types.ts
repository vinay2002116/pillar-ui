import { type VariantProps } from 'class-variance-authority'
import { SpinnerVariants } from './spinner.styles'

export interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof SpinnerVariants> {
  id?: string
}
