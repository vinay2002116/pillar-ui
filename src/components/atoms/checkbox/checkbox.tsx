'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { CheckboxVariants, CheckVariants } from './checkbox.styles'

import { cn } from '@/lib/utils'
import { CheckboxProps } from './checkbox.types'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & CheckboxProps
>(({ className, size, id, ...props }, ref) => (
  <CheckboxPrimitive.Root
    id={id}
    ref={ref}
    className={cn(CheckboxVariants({ className, size }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'flex items-center justify-center text-current h-full w-full'
      )}
    >
      <Check
        height={14}
        width={16}
        className={cn(CheckVariants({ size }))}
        strokeWidth={3}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, CheckboxVariants, CheckVariants }
