import { cva } from 'class-variance-authority'

export const ProgressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded bg-primary-2 min-w-64 ',
  {
    variants: {
      variant: {},
    },
    defaultVariants: {},
  }
)
