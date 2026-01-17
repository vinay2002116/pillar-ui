// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './popover-components'
import { PopoverProps } from './popover.types'
import React from 'react'

//https://www.radix-ui.com/primitives/docs/components/popover#api-reference
// refer for docs

export function PopoverDemo({
  trigger,
  content,
  triggerProps,
  contentProps,
}: PopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild {...triggerProps}>
        {trigger}
        {/* <Button variant="outline">Open popover</Button> */}
      </PopoverTrigger>
      <PopoverContent className="bg-light-1" {...contentProps}>
        {content}
      </PopoverContent>
    </Popover>
  )
}
