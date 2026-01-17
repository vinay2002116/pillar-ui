import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/components/unstyled/date-picker'

const meta = {
  title: 'unstyled/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['single', 'range'],
      description: 'Selection mode for dates',
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

/** Single date selection variant */
export const Single: Story = {
  args: {
    variant: 'single',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Calendar picker for selecting individual dates with single month view',
      },
    },
  },
}

/** Date range selection variant */
export const Range: Story = {
  args: {
    variant: 'range',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dual-month calendar for selecting date ranges with from/to dates',
      },
    },
  },
}

/** Interactive example with dynamic state management */
export const InteractiveExample = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Single Date Picker</h3>
        <DatePicker variant="single" />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Range Date Picker</h3>
        <DatePicker variant="range" />
      </div>
    </div>
  )
}
