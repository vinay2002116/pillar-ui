import { cva } from 'class-variance-authority'

export const CheckboxVariants = cva(
  'peer  rounded border  hover:ring-1 ring-slate-100 hover:border hover:border-neutral-3 hover:bg-hover-s1  disabled:cursor-not-allowed disabled:opacity-70 disabled:border-neutral-1 data-[state=checked]:bg-rest-p1  data-[state=checked]:hover:bg-hover-p1  data-[state=checked]:text-white  data-[state=checked]:font-black data-[state=checked]:border-0 data-[state=checked]:hover:border-0',
  {
    variants: {
      variant: {},
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export const CheckVariants = cva('', {
  variants: {
    variant: {},
    size: {
      sm: 'w-3.5 h-2.5',
      md: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
