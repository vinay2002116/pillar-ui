'use client'

import * as React from 'react'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../unstyled/command'
import { Option, SingleComboboxPropsType } from './single-combobox.types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../unstyled/popover/popover-components'

import { Button } from '../../atoms/button'
import { ComboBoxStates } from './single-combobox.styles'
import { Typography } from '../../atoms/typography'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

export function SingleCombobox({
  options,
  value,
  placeholder = 'Empty',
  searchPlaceholder = 'Search',
  emptyMessage = 'No results',
  onChange,
  onSearchChange,
  onChangePopoverOpen,
  popoverContentProps,
  listEmptyComponent,
  container,
}: SingleComboboxPropsType) {
  const [open, setOpen] = React.useState(false)
  const popoverRef = useRef<HTMLButtonElement>(null)

  const handleChange = (newValue: string, value: Option) => {
    onChange(newValue, value)
    setOpen(false)
  }
  const handlePopoverOpen = (newOpen: boolean) => {
    setOpen(newOpen)
    onChangePopoverOpen && onChangePopoverOpen(newOpen)
  }
  const selectedOption = options.find((option) => option.id === value)

  return (
    <Popover open={open} onOpenChange={handlePopoverOpen}>
      <PopoverTrigger ref={popoverRef} asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          //   className="w-[200px] justify-between"
          className={cn(
            ComboBoxStates({ isOpen: open, isValue: !!value }),
            'w-full justify-between px-3 py-2'
          )}
        >
          {selectedOption ? (
            <div className="flex items-center gap-2 overflow-hidden">
              {selectedOption.icon}
              <Typography
                variant={'body2'}
                className={value ? 'text-light-2' : 'text-light-4'}
              >
                {selectedOption?.name}
              </Typography>
            </div>
          ) : (
            <Typography variant={'body2'} className="text-light-4">
              {placeholder}
            </Typography>
          )}
          {open ? (
            <ChevronUp className="w-4 h-4 ml-2 stroke-light-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2 stroke-light-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        style={{
          width: popoverRef.current?.clientWidth,
        }}
        className="p-0 mt-1 rounded-lg bg-light-1"
        container={container}
        {...popoverContentProps}
      >
        <Command shouldFilter={onSearchChange ? false : true}>
          <CommandInput
            placeholder={searchPlaceholder}
            className=""
            onValueChange={onSearchChange}
          />
          <CommandEmpty>
            {listEmptyComponent ? (
              listEmptyComponent
            ) : (
              <Typography variant={'body3'} className="text-light-4">
                {emptyMessage}
              </Typography>
            )}
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => {
                return (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    disabled={option.disabled}
                    className={cn(
                      'justify-between gap-2 text-light-2 hover:bg-light-2 hover:text-light-1 focus:bg-light-2 focus:text-accent-foreground',
                      option.disabled ? 'text-light-4' : 'text-light-2',
                      value === option.id ? 'bg-light-2' : ''
                    )}
                    onSelect={() => {
                      handleChange(option.id, option)
                    }}
                  >
                    <div className="flex flex-row gap-2 ">
                      {option.icon}
                      {option.name}
                    </div>
                    {value === option.id ? (
                      <Check className={cn('h-4 w-4 stroke-brand')} />
                    ) : (
                      <div />
                    )}
                  </CommandItem>
                )
              })}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
