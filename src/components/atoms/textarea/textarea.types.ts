// export interface TextareaProps
//   extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

import { type VariantProps } from 'class-variance-authority'
import { TextAreaVariants } from './textarea.styles'

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'>,
    VariantProps<typeof TextAreaVariants> {
  disabled?: boolean
  inputLabel?: string
  showTextCount?: boolean
  maximumTextCount?: number
  id?: string
}
