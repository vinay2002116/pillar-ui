import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'
import { ProgressVariants } from './progress.styles'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const completionPercentage = ((value || 0) / (props.max || 100)) * 100
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(ProgressVariants({ className }))}
      max={props.max || 100}
      {...props}
      id={props.id}
    >
      <ProgressPrimitive.Indicator
        className="flex-1 h-full transition-all rounded bg-hover-p1 "
        style={{
          transform: `translateX(-${100 - completionPercentage}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
