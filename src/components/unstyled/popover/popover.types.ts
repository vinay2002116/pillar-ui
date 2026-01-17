import * as PopoverPrimitive from '@radix-ui/react-popover'

export type PopoverProps = {
  trigger: React.ReactNode
  content: React.ReactNode
  triggerProps?: PopoverPrimitive.PopoverTriggerProps
  contentProps?: PopoverPrimitive.PopoverContentProps &
    Pick<
      React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>,
      'container'
    >
  id?: string
}
