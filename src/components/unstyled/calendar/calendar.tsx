import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { ButtonVariants } from '@/components/atoms/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn('p-3 bg-white rounded-lg', className)}
      showOutsideDays={showOutsideDays} // Hides extra days
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          ButtonVariants({ variant: 'secondary' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 '
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground test-md w-8 font-normal text-[0.8rem] w-full',
        // row: 'flex w-full mt-2 ',
        row: 'grid grid-cols-7 ',

        // cell: cn(
        //   ' relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:test-r-md',
        //   props.mode === 'range'
        //     ? '[&:has(>.day-range-end)]:test-r-md [&:has(>.day-range-start)]:test-l-md first:[&:has([aria-selected])]:test-l-md last:[&:has([aria-selected])]:test-r-md'
        //     : '[&:has([aria-selected])]:test-md'
        // ),
        // day: 'h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-1  hover:rounded-lg  ',
        // day_range_start: 'day-range-start !bg-rest-p1 rounded-l-lg rounded-r-none hover:rounded-r-none',
        // day_range_end: 'day-range-end rounded-r-lg hover:rounded-l-none',
        // day_selected: cn(
        //   ' text-white bg-rest-p1 hover:bg-rest-p1  w-10  '
        // ),
        day_today: 'bg-primary-1  rounded-lg',
        day_outside: 'text-light-4  ',
        day_disabled: 'text-light-4 opacity-50',
        day_range_middle:
          'aria-selected:bg-primary-2 aria-selected:text-light-2 hover:rounded-none',
        day_hidden: 'invisible',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          '[&:has([aria-selected])]:bg-accent',
          '[&:has([aria-selected].day-outside)]:bg-accent/50',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-lg'
        ),
        day: 'h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-1 hover:rounded-lg',
        day_range_start:
          'day-range-start !bg-rest-p1 rounded-l-lg hover:rounded-l-lg rounded-r-none [&:has([aria-selected].day-range-end)]::rounded-r-lg ',
        day_range_end:
          'day-range-end rounded-r-lg hover:rounded-r-lg hover:rounded-l-none',
        day_selected: cn('text-white bg-rest-p1 hover:bg-rest-p1 w-10'),
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-4 w-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
