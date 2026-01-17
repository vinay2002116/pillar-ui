import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion-components'
import React from 'react'

import { AccordionProps } from './accordion.types'

export function AccordionDemo({
  trigger,
  content,
  triggerProps,
  contentProps,
  rootProps,
  itemProps,
  id,
}: AccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      {...rootProps}
      id={id}
    >
      <AccordionItem value="item-1" {...itemProps}>
        <AccordionTrigger {...triggerProps}>{trigger}</AccordionTrigger>
        <AccordionContent {...contentProps}>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
