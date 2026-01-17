import * as React from 'react'
import { cn } from '@/lib/utils'
import { TypographyVariants } from './typography.styles'
import { TypographyProps } from './typography.types'
import {
  defaultTypographyVariant,
  variantElementMap,
} from './typography.config'

const Typography = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  TypographyProps
>(({ className, variant = defaultTypographyVariant, id, ...props }, ref) => {
  const Comp: React.ElementType = variantElementMap[
    variant as keyof typeof variantElementMap
  ] as React.ElementType

  return (
    <Comp
      className={cn(TypographyVariants({ variant, className }))}
      ref={ref}
      id={id}
      {...props}
    >
      {props.children}
    </Comp>
  )
})

Typography.displayName = 'Typography'

export { Typography, TypographyVariants }
