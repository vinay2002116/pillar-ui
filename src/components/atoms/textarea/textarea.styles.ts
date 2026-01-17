import { cva } from 'class-variance-authority'

export const TextAreaVariants = cva(
  ` border flex items-center justify-between gap-1.5 relative mt-1.5 rounded-lg 
    text-light-1 px-3 py-2
    file:border-0 file:bg-transparent
    placeholder:font-normal placeholder:text-light-4`,
  {
    variants: {
      isFocused: {
        true: 'border-primary-2 ring-4 ring-primary-1',
        false: 'border-light-2',
      },
      disabled: {
        true: 'bg-light-3 border-neutral-2 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {},
    compoundVariants: [],
  }
)
