import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './hover-card-components'
import { HoverCardProps } from './hover-card.types'
import React from 'react'

export function HoverCardDemo({
  trigger,
  content,
  triggerProps,
  contentProps,
}: HoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild {...triggerProps}>
        {trigger}
        {/* <Button variant="outline">Open popover</Button> */}
      </HoverCardTrigger>
      <HoverCardContent className="bg-white" {...contentProps}>
        {content}
      </HoverCardContent>
    </HoverCard>
  )
}
