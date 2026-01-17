import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export type DropdownMenuOptions = {
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  subItems?: DropdownMenuOptions[]
  className?: string
  onClick?: () => void
}

export type DropdownContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>

export type DropdownMenuProps = {
  trigger: React.ReactNode
  optionGroups: DropdownMenuOptions[][]
  header?: React.ReactNode
  dropdownContentProps?: DropdownContentProps
  id?: string
  container?: Element | null | undefined
}
