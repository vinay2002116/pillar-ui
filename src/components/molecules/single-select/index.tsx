import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { SelectProps } from './single-select.types'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './single-select-components'
import { Typography } from '../../atoms/typography'
import { SelectStates } from './single-select-styles'
import { cn } from '@/lib/utils'

const SingleSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectProps
>(
  ({
    // className,
    // children,
    placeholder,
    onValueChange,
    items,
    value,

    // defaultValue,
    ...props
  }) => {
    const selectedItem = items.find((item) => {
      return item.value === value
    })
    const [isOpen, setIsOpen] = React.useState(false)
    return (
      <SelectPrimitive.Root
        onValueChange={onValueChange}
        value={value}
        onOpenChange={setIsOpen}
        {...props}
      >
        <SelectTrigger
          className={cn(SelectStates({ isOpen, isValue: !!value }))}
          {...props.triggerProps}
        >
          <SelectValue placeholder={placeholder}>
            <div className="flex items-center gap-2">
              {selectedItem?.icon}
              <Typography
                variant={'body2'}
                className={value ? 'text-light-2' : 'text-light-4'}
              >
                {selectedItem?.label}
              </Typography>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-light-1">
          <SelectGroup>
            {items.map((item, index) => {
              return (
                <SelectItem
                  value={item.value}
                  disabled={item.disabled ?? false}
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <Typography variant={'body2'} className="capitalize">
                      {item.label}
                    </Typography>
                  </div>
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </SelectPrimitive.Root>
    )
  }
)

export { SingleSelect }
