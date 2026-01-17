import { cva } from 'class-variance-authority'

export const TabsVariants = cva(
  'inline-flex items-center justify-evenly p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        primary: 'bg-light-3 border rounded-xl  border-neutral-1',
        secondary: 'bg-background ',
      },
      size: {
        sm: 'h-10 rounded-xl ',
        md: 'h-12 rounded-xl ',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export const TabTriggerVariants = cva(
  'inline-flex w-full items-center justify-center whitespace-nowrap text-sm text-light-2 font-medium  disabled:pointer-events-none disabled:opacity-50  ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ',
  {
    variants: {
      size: {
        sm: 'h-8 text-[14px] p-1.5 ',
        md: 'h-10 text-[16px] p-2 ',
      },
      variant: {
        primary:
          'rounded-lg data-[state=active]:bg-rest-s1 data-[state=active]:text-primary-1 data-[state=active]:border data-[state=active]:border-neutral-1 data-[state=active]:font-semibold data-[state=active]:shadow-sm ',
        secondary:
          'data-[state=active]:bg-background data-[state=active]:text-primary-1 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-primary-2 ',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
