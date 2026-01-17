import * as AccordionPrimitive from '@radix-ui/react-accordion'

export type AccordionProps = {
  id?: string
  trigger: React.ReactNode
  content: React.ReactNode
  triggerProps?: AccordionPrimitive.AccordionTriggerProps
  contentProps?: AccordionPrimitive.AccordionContentProps
  rootProps?: AccordionPrimitive.AccordionSingleProps
  itemProps?: AccordionPrimitive.AccordionItemProps
}
