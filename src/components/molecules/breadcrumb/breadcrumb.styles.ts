import { cva } from 'class-variance-authority'

export const CrumbVariants = cva(
  'rounded hover:text-light-2 hover:stroke-light-1 hover:bg-light-3 ',
  {
    variants: {
      type: {
        icon: 'p-1',
        text: 'px-2 py-1',
      },
      isSelected: {
        true: 'text-light-2 stroke-light-1 bg-light-3',
        false: 'text-light-3 stroke-light-2',
      },
    },
  }
)
