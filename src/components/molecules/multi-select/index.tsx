import * as React from 'react'
import { cn } from '@/lib/utils'

import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
} from '@/components/unstyled/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/unstyled/popover/popover-components'
import { Badge } from '@/components/atoms/badge'
import { Typography } from '../../atoms/typography'
import { MultiSelectProps } from './multi-select.types'

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  container,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const popoverRef = React.useRef<HTMLButtonElement>(null)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger
        className={`min-h-[40px] h-fit px-3 py-2
        ${open ? 'border-primary-2 ring-4 ring-primary-1' : 'border-neutral-2'}
        focus:border-primary-2 focus:ring-0 focus:ring-primary-1`}
        ref={popoverRef}
        asChild
      >
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between focus:ring-0 `}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((item) => {
                const selectedItem = options.find(
                  (option) => option.value === item
                )
                return (
                  <Badge
                    variant="default"
                    key={item}
                    size={'sm'}
                    //   className="mb-1 mr-1"
                    showBorder
                    onClick={() => handleUnselect(item)}
                  >
                    <div className="flex items-center gap-1">
                      {selectedItem?.icon}
                      {selectedItem?.label}
                    </div>
                    <button
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUnselect(item)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUnselect(item)
                      }}
                    >
                      <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                )
              })
            ) : (
              <Typography variant="body2" className="text-light-4">
                Select option
              </Typography>
            )}
          </div>
          {!open ? (
            <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
          ) : (
            <ChevronUp className="w-4 h-4 opacity-50 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          width: popoverRef.current?.clientWidth,
        }}
        className="w-full p-0 bg-light-1"
        onEscapeKeyDown={() => setOpen(false)}
        container={container}
      >
        <Command className={className}>
          {/* <CommandInput
            showIcon={false}
            inputMode={'none'}
            className={'caret-transparent opacity-0 h-0 w-0 p-0 m-0'}
            placeholder="Search ..."
          /> */}

          <CommandList>
            <CommandEmpty>
              <Typography variant={'body3'}>No items found</Typography>
            </CommandEmpty>
            <CommandGroup className="px-0 my-1 overflow-y-auto max-h-64 custom-scrollbar">
              {options.map((option) => (
                <div className="py-0.5 px-1.5 bg-white" key={option.value}>
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

export { MultiSelect }
