import { PopoverContent } from '@/components/unstyled/popover/popover-components'

export type Option = {
  id: string
  name: string
  disabled?: boolean
  icon?: React.ReactElement
}

export type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverContent
>

export type SingleComboboxPropsType = {
  options: Array<Option>
  value: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  onChange: (value: string, selectedOption: Option) => void
  onSearchChange?: (value: string) => void
  onChangePopoverOpen?: (open: boolean) => void
  popoverContentProps?: PopoverContentProps
  listEmptyComponent?: React.ReactNode

  /**
   * The container element for the multi-select component.
   * The popover will be appended to this element.
   */
  container?: Element | null | undefined
}
