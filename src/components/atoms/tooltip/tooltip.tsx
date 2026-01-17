import {
  TooltipWrapper,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from './tooltip-components'
import * as React from 'react'
import { TooltipProps } from './tooltip.types'

export default function Tooltip({
  headerText,
  content,
  className,
  // id,
  ...props
}: TooltipProps) {
  return (
    // <div id={id}>
    <TooltipProvider>
      <TooltipWrapper {...props}>
        <TooltipTrigger>{props?.triggerElement}</TooltipTrigger>
        <TooltipContent
          side={props?.side ?? 'top'}
          headerText={headerText ?? ''}
          content={content ?? ''}
          className={className}
          {...props}
        />
      </TooltipWrapper>
    </TooltipProvider>
    // </div>
  )
}
