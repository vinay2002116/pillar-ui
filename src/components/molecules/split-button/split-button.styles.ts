import { cva } from 'class-variance-authority'

const buttonStyle = `flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1
disabled:pointer-events-none disabled:curstor-not-allowed disabled:opacity-70`

export const SplitButtonVariants = cva(buttonStyle, {
  variants: {
    variant: {
      primary: 'bg-rest-p1  hover:bg-hover-p1 active:bg-click-p1 text-white',
      secondary:
        'bg-rest-s1 hover:bg-hover-s1 active:bg-click-s1 border border-neutral-2 text-light-2',
    },
    size: {
      sm: 'h-8 p-1.5 text-sm rounded-s-md',
      md: 'h-10 p-2 text-base rounded-s-lg',
      lg: 'h-12 p-3 text-lg rounded-s-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export const SplitButtonDropdownVariants = cva(buttonStyle, {
  variants: {
    variant: {
      primary:
        'bg-rest-p1 hover:bg-hover-p1 active:bg-click-p1 text-white border-l-2 border-rest-s2',
      secondary:
        'bg-rest-s1 hover:bg-hover-s1 active:bg-click-s1 border border-neutral-2 text-light-2',
    },
    size: {
      sm: 'h-8 p-1.5 text-sm rounded-e-md',
      md: 'h-10 p-2 text-base rounded-e-lg',
      lg: 'h-12 p-3 text-lg rounded-e-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export const TitleVariants = cva('font-medium', {
  variants: {
    titleSize: {
      md: 'p-2 text-base',
      lg: 'p-3 text-lg',
      sm: 'p-1.5 text-sm',
    },
  },
})
