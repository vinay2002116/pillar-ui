import { type VariantProps } from 'class-variance-authority'
import { RadioGroupVariants } from './radio-group-style'
import { ReactNode } from 'react'

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof RadioGroupVariants> {
  disabled?: boolean
  children?: ReactNode | ReactNode[]
  id?: string
}
export type RadioGroupOptions = {
  options: Options[]
}

export type Options = { value: string; label: string }
