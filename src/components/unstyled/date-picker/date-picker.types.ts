import type { DateRange } from 'react-day-picker'

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'single' | 'range'
  date?: Date
  range?: DateRange
  onDateChange?: (date?: Date) => void
  onRangeChange?: (range?: DateRange) => void
  className?: string
  buttonClassName?: string
  placeholder?: string
  rangePlaceholder?: string

  /**
   * The container element for the multi-select component.
   * The popover will be appended to this element.
   */
  container?: Element | null | undefined
}
