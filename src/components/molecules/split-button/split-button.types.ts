import { type VariantProps } from 'class-variance-authority'
import {
  SplitButtonDropdownVariants,
  SplitButtonVariants,
} from './split-button.styles'
import { DropdownMenuOptions } from '../dropdown-menu/dropdown-menu.types'

export interface SplitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof SplitButtonVariants>,
    VariantProps<typeof SplitButtonDropdownVariants> {
  loading?: boolean
  prefixIcon?: React.ReactNode
  id?: string
  optionGroups: DropdownMenuOptions[][]
}
