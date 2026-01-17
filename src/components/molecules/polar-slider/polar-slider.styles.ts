import { cva } from 'class-variance-authority'

export const SliderBgColorVariants = cva('', {
  variants: {
    bgColor: {
      success: 'bg-success-2',
      danger: 'bg-danger-2',
      stroke: 'bg-light-4',
    },
  },
  defaultVariants: {
    bgColor: 'success',
  },
})
