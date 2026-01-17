export interface ToggleMultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  id?: string
  isSearchable?: boolean
  icon: React.ReactElement

  /**
   * The container element for the multi-select component.
   * The popover will be appended to this element.
   */
  container?: Element | null | undefined
}
export type OptionType = {
  label: string
  value: string
  icon?: React.ReactElement
}
