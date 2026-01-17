import { cva } from 'class-variance-authority'

export const SelectStates = cva('w-full', {
  variants: {
    isOpen: {
      true: 'ring-4 ring-primary-1 border-primary-2',
    },
    isValue: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // {
    //   isOpen: true,
    //   isValue: true,
    //   className: 'border-primary-2',
    // },
    {
      isOpen: false,
      isValue: true,
      className: 'border-neutral-2',
    },
  ],
})
