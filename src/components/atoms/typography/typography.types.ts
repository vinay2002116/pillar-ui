import { type VariantProps } from 'class-variance-authority'
import { TypographyVariants } from './typography.styles'

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof TypographyVariants> {
  id?: string
}
