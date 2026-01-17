import { cva } from 'class-variance-authority'

export const BadgeVariants = cva(
  'inline-flex items-center rounded-md border  text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase gap-2',
  {
    variants: {
      variant: {
        gradient: 'brand-primary-secondary-gradient  border-0 text-white',
        default: 'border-neutral-1 bg-light-2 text-light-2 ',
        success: 'border-success-1 bg-success-1 text-success-1',
        warning: 'border-warning-1 bg-warning-1 text-warning-1',
        danger: 'border-danger-1 bg-danger-1 text-danger-1',
        neutral: 'border-info-1 bg-info-1 text-info-1',
        select: 'border-primary-1 bg-primary-1  text-light-2',
      },
      size: {
        sm: 'px-1.5 py-0.5 h-5 text-[10px]',
        md: 'px-2 py-1 h-6 text-[10px]',
        lg: 'px-2.5 py-1.5 h-8 text-[12px]',
      },
      showBorder: {
        true: '',
        false: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      showBorder: false,
    },
  }
)
