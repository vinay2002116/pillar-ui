import { cva } from 'class-variance-authority'

export const AlertVariants = cva(
  'relative rounded-xl flex flex-row h-full items-start gap-2 border px-4 py-4 text-sm ',
  {
    variants: {
      variant: {
        info: ' text-text4 dark:border-danger [&>svg]:text-danger bg-info-1',
        success:
          'text-text4  dark:border-danger [&>svg]:text-danger bg-success-1',
        warning:
          'text-text4  dark:border-danger [&>svg]:text-danger bg-warning-1 ',
        error:
          ' text-text4  dark:border-danger [&>svg]:text-danger bg-danger-1',
        default: 'text-text4  bg-background text-foreground',
      },
      shortContent: {
        true: 'items-center flex flex-row gap-3',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export const AlertContentVariants = cva('', {
  variants: {
    shortContent: {
      true: 'justify-between w-full items-center flex flex-row gap-3',
      false: 'flex flex-col gap-2  justify-start items-start',
    },
  },
  defaultVariants: {
    shortContent: false,
  },
})

export const AlertButtonVariants = cva(' max-w-[fit-content] ', {
  variants: {
    shortContent: {
      true: 'bg-rest-s1',
      false: 'bg-rest-s1',
    },
  },
  defaultVariants: {
    shortContent: false,
  },
})
