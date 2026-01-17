import { cva } from 'class-variance-authority'

export const SwitchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer  outline-[#4A4A4A]/20 data-[state=checked]:active:outline-[#5327DA]/10  items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-rest-p1    data-[state=checked]:hover:bg-hover-p1 data-[state=unchecked]:bg-rest-s2 data-[state=unchecked]:hover:bg-hover-s2 data-[state=checked]:active:bg-click-p1 data-[state=unchecked]:active:bg-click-s2',
  {
    variants: {
      size: {
        sm: 'h-5 w-10   ',
        md: 'h-6 w-12  ',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
)

export const SwitchThumbVariants = cva(
  'pointer-events-none block h-4 w-4 rounded-full bg-light-1 shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-4 w-4  bg-light-1 data-[state=checked]:translate-x-5  data-[state=unchecked]:translate-x-0 ',
        md: 'h-5 w-5  data-[state=checked]:translate-x-6  data-[state=unchecked]:translate-x-0 ',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
)
