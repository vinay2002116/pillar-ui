import { cva } from 'class-variance-authority'

export const hoverDetailCardStyles = {
  img: cva('', {
    variants: {
      hasIcon: {
        true: 'w-12 h-12',
        false: 'h-5 w-5',
      },
    },
  }),
}
