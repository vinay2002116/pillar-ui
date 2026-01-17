import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { SliderVariants } from './slider.styles'

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, id, ...props }, ref) => (
  // <div className='bg-light-3 h-[100px] w-full flex'>

  <SliderPrimitive.Root
    ref={ref}
    className={cn(SliderVariants({ className }))}
    id={id}
    {...props}
  >
    <SliderPrimitive.Track className="relative w-full h-2 overflow-hidden rounded-full grow bg-light-4">
      <SliderPrimitive.Range className="absolute h-full bg-click-p1" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="block h-5 w-5 bg-rest-p1 hover:bg-hover-p1 active:bg-click-p1  rounded-full border-[6px] border-neutral-0 hover:w-6 hover:h-6  shadow-lg bg-click-p1 outline-none transition-all focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 focus-visible:cursor-pointer " />
  </SliderPrimitive.Root>
  // </div>
))

Slider.displayName = SliderPrimitive.Root.displayName
