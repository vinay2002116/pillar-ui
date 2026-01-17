import * as React from 'react'

import { cn } from '@/lib/utils'
import { BadgeVariants } from './badge.styles'
import { BadgeProps } from './badge.types'

function Badge({
  className,
  variant,
  size,
  showBorder,
  children,
  prefixIcon,
  suffixIcon,
  id,
  ...props
}: BadgeProps) {
  return (
    <div
      id={id}
      className={cn(BadgeVariants({ variant, size, showBorder }), className)}
      {...props}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </div>
  )
}

export { Badge, BadgeVariants }
