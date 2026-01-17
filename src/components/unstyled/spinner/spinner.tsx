import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SpinnerVariants } from './spinner.styles'
import { SpinnerProps } from './spinner.types'

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, variant, size, id, ...props }, ref) => {
    return (
      <Loader2
        className={cn(SpinnerVariants({ variant, size, className }))}
        id={id}
        ref={ref}
        {...props}
      />
    )
  }
)

Spinner.displayName = 'Spinner'

export { Spinner, SpinnerVariants }
