import * as React from 'react'
import { cn } from '@/lib/utils'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/unstyled/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/unstyled/popover/popover-components'
import { Typography } from '../../atoms/typography'
import { ToggleMultiSelectProps } from './toggle-multi-select.types'

function ToggleMultiSelect({
  options,
  selected,
  onChange,
  className,
  isSearchable = false,
  icon,
  container,
  ...props
}: ToggleMultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger
        className={`min-h-[42px] h-fit bg-rest-s1 flex gap-1 hover:bg-hover-t1 
        ${open || selected.length > 0 ? 'border-primary-1 border-click-p1 bg-click-t1' : 'border-0 bg-rest-s1'}
        ${selected.length === 0 && 'px-3'}
       `}
        asChild
      >
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {selected.length > 0 && (
            <span className="w-4"> {selected.length}</span>
          )}
          {icon}
          <>
            {!open ? (
              <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
            ) : (
              <ChevronUp className="w-4 h-4 opacity-50 shrink-0" />
            )}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 bg-light-1"
        onEscapeKeyDown={() => setOpen(false)}
        container={container}
      >
        <Command className={className}>
          {isSearchable && (
            <CommandInput showIcon={true} placeholder="Search ..." />
          )}

          <CommandList className="">
            <CommandEmpty>
              <Typography variant={'body3'}>No items found</Typography>
            </CommandEmpty>
            <CommandGroup className="px-0 my-1 overflow-y-auto max-h-64 custom-scrollbar">
              {options.map((option) => (
                <div key={option.value} className="py-0.5 px-1.5 bg-light-1 ">
                  <CommandItem
                    key={option.value}
                    className={`justify-between p-2 rounded-md text-light-2 ${selected.indexOf(option.value) !== -1 ? 'bg-light-2' : ''}`}
                    onSelect={() => {
                      onChange(
                        selected.includes(option.value)
                          ? selected.filter((item) => item !== option.value)
                          : [...selected, option.value]
                      )
                      setOpen(true)
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {option.icon}
                      <Typography variant={'body2'}>{option.label}</Typography>
                    </div>
                    <Check
                      className={cn(
                        'h-5 w-5 stroke-brand',
                        selected.includes(option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { ToggleMultiSelect }
