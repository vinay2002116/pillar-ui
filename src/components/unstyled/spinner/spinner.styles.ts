import { cva } from 'class-variance-authority'

export const SpinnerVariants = cva('animate-spin', {
  variants: {
    variant: {},
    size: {
      default: 'h-4 w-4',
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
