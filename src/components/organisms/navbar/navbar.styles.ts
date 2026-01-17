import { cva } from 'class-variance-authority'

export const NavbarIconVariants = cva(
  'h-10 w-10 p-2 grid place-items-center rounded-md hover:bg-hover-s3 hover:cursor-pointer relative',
  {
    variants: {
      isActive: {
        true: 'bg-click-s3',
        false: 'bg-inherit',
      },
    },
  }
)
