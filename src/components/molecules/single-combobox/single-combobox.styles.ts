import { cva } from 'class-variance-authority'

export const ComboBoxStates = cva('w-full', {
  variants: {
    isOpen: {
      true: 'ring-4 ring-primary-1 border-primary-2 text-light-1',
    },
    isValue: {
      true: 'text-light-1',
      false: 'text-light-4',
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
