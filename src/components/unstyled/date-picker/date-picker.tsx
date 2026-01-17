'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/unstyled/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/unstyled/popover/popover-components'
import { Button } from '@/components/atoms/button'
import { Typography } from '@/components/atoms/typography'
import { DatePickerProps } from './date-picker.types'

function DatePicker({
  variant = 'range',
  date: controlledDate,
  range: controlledRange,
  onDateChange,
  onRangeChange,
  className,
  buttonClassName,
  placeholder = 'Pick a date',
  rangePlaceholder = 'Pick a date range',
  container,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    undefined
  )
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  // Use controlled state if provided, otherwise internal state
  const date = controlledDate ?? internalDate
  const range = controlledRange ?? internalRange

  const handleDateChange = (date?: Date) => {
    onDateChange ? onDateChange(date) : setInternalDate(date)
  }

  const handleRangeChange = (range?: DateRange) => {
    onRangeChange ? onRangeChange(range) : setInternalRange(range)
  }

  //   focus-visible:border-primary-2 focus-visible:ring-4 ring-primary-1
  return (
    <div className={cn('h-[5rem] w-full p-0', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              'w-full justify-start text-left font-normal px-3 h-[2.375] focus-visible:border-primary-2 focus-visible:ring-4 border border-light-2 ring-primary-1   !ring-offset-0  ',
              (variant === 'single' ? !date : !range?.from) &&
                'text-muted-foreground',
              buttonClassName
            )}
          >
            <CalendarIcon className="w-5 h-5 mr-2 text-light-4" />
            <Typography variant={'body4'}>
              {
                <>
                  {variant === 'range' ? (
                    range?.from ? (
                      range.to ? (
                        <>
                          {format(range.from, 'MMM dd, y')} /{' '}
                          {format(range.to, 'MMM dd, y')}
                        </>
                      ) : (
                        format(range.from, 'MMM dd, y')
                      )
                    ) : (
                      rangePlaceholder
                    )
                  ) : date ? (
                    format(date, 'MMM dd, y')
                  ) : (
                    <span className="text-light-4">{placeholder}</span>
                  )}
                </>
              }
            </Typography>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          container={container}
        >
          {variant === 'range' ? (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={range?.from}
              selected={range}
              onSelect={handleRangeChange}
              numberOfMonths={2}
            />
          ) : (
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={handleDateChange}
              classNames={{
                day: 'h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-1 rounded-lg',
                day_today:
                  'bg-primary-1 rounded-lg aria-selected:text-white aria-selected:bg-rest-p1 aria-selected:hover:bg-rest-p1 aria-selected:w-10',
                day_selected: 'text-white bg-rest-p1 hover:bg-rest-p1 w-10',
                day_range_start: 'day-range-start text-light-2 rounded-l-lg',
                day_range_end: 'bg-primary-2 rounded-r-lg !bg-red-500',
                day_range_middle:
                  'aria-selected:bg-primary-2 text-light-1 aria-selected:text-foreground [&:not(.day-range-start):not(.day-range-end)]',
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export type { DateRange }
export { DatePicker }
