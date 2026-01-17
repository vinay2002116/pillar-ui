import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

export type HoverCardProps = {
  trigger: React.ReactNode
  content: React.ReactNode
  triggerProps?: HoverCardPrimitive.HoverCardTriggerProps
  contentProps?: HoverCardPrimitive.HoverCardContentProps
  id?: string
}
