import * as SelectPrimitive from '@radix-ui/react-select'

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  items: {
    label: string
    value: string
    disabled?: boolean
    icon?: React.ReactElement
  }[]
  placeholder?: string
  onValueChange: (value: string) => void
  value: string
  triggerProps?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
  id?: string
}
