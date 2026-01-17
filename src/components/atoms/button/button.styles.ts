import { cva } from 'class-variance-authority'

export const ButtonVariants = cva(
  `inline-flex w-full items-center justify-center whitespace-nowrap  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50 disabled:curstor-not-allowed disabled:opacity-70`,
  {
    variants: {
      variant: {
        primary: 'bg-rest-p1 hover:bg-hover-p1 active:bg-click-p1 text-white',
        secondary:
          'bg-rest-s1 hover:bg-hover-s1 active:bg-click-s1 border border-neutral-2 text-light-2',
        teritiary: 'text-primary-2 hover:bg-hover-t1 active:bg-click-t1',
        'link-primary':
          'text-primary-2 active:text-primary-1 active:underline hover:underline',
        'link-secondary':
          'text-light-2 active:text-light-1 active:underline hover:underline',
      },
      size: {
        md: 'h-10 p-2 rounded-lg text-base',
        lg: 'h-12 p-3 rounded-lg text-lg',
        sm: 'h-8 p-1.5 rounded-md text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'link-primary',
        size: 'md',
        className: 'p-0',
      },
      {
        variant: 'link-primary',
        size: 'lg',
        className: 'p-0',
      },
      {
        variant: 'link-primary',
        size: 'sm',
        className: 'p-0',
      },
      {
        variant: 'link-secondary',
        size: 'md',
        className: 'p-0',
      },
      {
        variant: 'link-secondary',
        size: 'lg',
        className: 'p-0',
      },
      {
        variant: 'link-secondary',
        size: 'sm',
        className: 'p-0',
      },
    ],
  }
)

export const TitleVariants = cva('font-medium', {
  variants: {
    size: {
      md: 'p-2 text-base',
      lg: 'p-3 text-lg',
      sm: 'p-1.5 text-sm',
    },
  },
})
