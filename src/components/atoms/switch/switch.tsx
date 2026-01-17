'use client'
import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'
import { SwitchThumbVariants, SwitchVariants } from './switch.styles'
import { SwitchProps } from './switch.types'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SwitchProps
>((props, ref) => {
  const { className, size, ...rest } = props

  return (
    <SwitchPrimitives.Root
      className={cn(SwitchVariants({ size }), className)}
      {...rest}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(SwitchThumbVariants({ size }))} />
    </SwitchPrimitives.Root>
  )
})

Switch.displayName = 'Switch'

export { Switch, SwitchVariants }
