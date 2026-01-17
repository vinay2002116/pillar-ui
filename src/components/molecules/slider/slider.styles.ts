import { cva } from 'class-variance-authority'

export const SliderVariants = cva(
  'relative flex w-60  touch-none select-none items-center',
  {
    variants: {
      variant: {},
    },
    defaultVariants: {},
  }
)
