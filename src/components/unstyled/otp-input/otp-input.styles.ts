import { cva } from 'class-variance-authority'

export const OTPInputVariants = cva(
  `relative flex h-12 w-11 items-center justify-center border-y border-r border-input text-light-1 transition-all
   first:rounded-l-md first:border-l last:rounded-r-md`,
  {
    variants: {
      isError: {
        true: '',
        false: '',
      },
      isFocused: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      isError: false,
      isFocused: false,
    },
    compoundVariants: [
      {
        isError: true,
        isFocused: true,
        className: 'border-danger-2 ring-4 ring-danger-1',
      },
      {
        isError: false,
        isFocused: true,
        className: 'border-primary-2 ring-4 ring-primary-1',
      },
      {
        isError: true,
        isFocused: false,
        className: 'border-danger-2',
      },
      {
        isError: false,
        isFocused: false,
        className: 'border-neutral-2',
      },
    ],
  }
)
