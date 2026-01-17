import { cva } from 'class-variance-authority'
import { StepItemStatus } from './stepper.type'
export const StepItemVariants = cva(
  'h-8 w-8 border-2 flex items-center justify-center rounded-full cursor-pointer trasnition-all',
  {
    variants: {
      variant: {
        pending: 'border-neutral-2 ',
        current:
          'bg-primary-1 border-primary-2 hover:bg-hover-t1 active:bg-click-t1',
        completed:
          'bg-rest-p1 hover:bg-hover-p1 active:bg-click-p1 border-none',
      },
    },
    defaultVariants: { variant: StepItemStatus.PENDING },
  }
)
