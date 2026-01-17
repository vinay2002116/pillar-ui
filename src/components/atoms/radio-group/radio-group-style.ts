import { cva } from 'class-variance-authority'

export const RadioGroupVariants = cva(
  'aspect-square data-[state=unchecked]:hover:bg-hover-s1 h-4 w-4 rounded-full border border-stroke1 text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center  border-neutral-2',
  {
    variants: {
      variant: {},
    },
    defaultVariants: {},
  }
)
