import * as React from 'react'
import { cn } from '@/lib/utils'

import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'
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
import { Badge } from '@/components/atoms/badge'
import { Typography } from '../../atoms/typography'
import { MultiSelectProps } from './multi-select-combobox.types'

function MultiCombobox({
  options,
  selected,
  onChange,
  className,
  popoverContentProps,
  listEmptyComponent,
  placeholder,
  searchPlaceholder = 'Search',
  onSearchChange,
  onChangePopoverOpen,

  container,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const popoverRef = React.useRef<HTMLButtonElement>(null)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handlePopoverOpen = (newOpen: boolean) => {
    setOpen(newOpen)
    onChangePopoverOpen && onChangePopoverOpen(newOpen)
  }

  return (
    <Popover open={open} onOpenChange={handlePopoverOpen} {...props}>
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
                    // onClick={() => handleUnselect(item)}
                  >
                    <div className="flex items-center gap-1 max-w-[180px] ">
                      {selectedItem?.icon}
                      <span className="truncate">{selectedItem?.label}</span>
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
                {placeholder ?? 'Select options'}
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
        className="w-full p-0 mt-1 bg-light-1"
        onEscapeKeyDown={() => setOpen(false)}
        container={container}
        {...popoverContentProps}
      >
        <Command
          className={className}
          shouldFilter={onSearchChange ? false : true}
        >
          <CommandInput
            placeholder={searchPlaceholder}
            showIcon={true}
            onValueChange={onSearchChange}
          />

          <CommandList className="">
            <CommandEmpty>
              {listEmptyComponent ? (
                listEmptyComponent
              ) : (
                <Typography variant={'body3'} className="text-light-4">
                  No items found
                </Typography>
              )}
            </CommandEmpty>
            <CommandGroup className="px-0 my-1 overflow-y-auto max-h-64 custom-scrollbar">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  className={`mx-1.5 my-1 justify-between rounded-md bg-light-1 p-2 text-light-2 ${selected.indexOf(option.value) !== -1 ? 'bg-light-2' : ''}`}
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
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiCombobox }
