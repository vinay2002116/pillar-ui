import { PopoverContent } from '@/components/unstyled/popover/popover-components'

export interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  popoverContentProps?: PopoverContentProps
  listEmptyComponent?: React.ReactNode
  placeholder?: string
  onSearchChange?: (value: string) => void
  onChangePopoverOpen?: (open: boolean) => void
  searchPlaceholder?: string

  /**
   * The container element for the multi-select component.
   * The popover will be appended to this element.
   */
  container?: Element | null | undefined
}

export type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverContent
>

export type OptionType = {
  label: string
  value: string
  icon?: React.ReactElement
}
