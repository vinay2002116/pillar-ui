import { cva } from 'class-variance-authority'

export const AnimatedInputContainerVariants = cva(
  ` h-[38px] w-full border flex items-center justify-between gap-1.5 relative mt-1.5 rounded-lg  
    text-light-2 px-3 py-2
    file:border-0 file:bg-transparent
    placeholder:font-normal placeholder:text-light-4`,
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
      disabled: {
        true: 'bg-light-3 border-neutral-2 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      isError: false,
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
        className: 'border-light-2',
      },
    ],
  }
)

export const AnimatedInputStyles = cva(
  `outline-none w-full h-full bg-transparent disabled:cursor-not-allowed placeholder:font-normal placeholder:text-light-4`,
  {
    variants: {
      isError: {
        true: 'text-danger-1',
        false: 'text-light-2',
      },
    },
  }
)

export const DynamicComponentStyles = cva(
  `absolute top-[7px] text-top transition-transform duration-500 text-light-4 pointer-events-none `,
  {
    variants: {
      animate: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      animate: false,
    },
  }
)
