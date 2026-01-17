import * as React from 'react'

import { ButtonVariants, TitleVariants } from './button.styles'

import { ButtonProps } from './button.types'
import { Loader2 } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { Typography } from '../typography'
import { cn } from '@/lib/utils'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      title,
      suffixIcon,
      prefixIcon,
      asChild = false,
      loading,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(ButtonVariants({ variant, size, className }))}
        id={id}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait...
          </>
        ) : title ? (
          <div className="flex items-center">
            {prefixIcon}
            <Typography
              className={cn(TitleVariants({ size }))}
              variant={'body1'}
            >
              {title}
            </Typography>
            {suffixIcon}
          </div>
        ) : (
          props.children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, ButtonVariants }
