import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '@/index'
import React from 'react'

const meta = {
  title: 'unstyled/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (args: Omit<Story['args'], 'selected' | 'onDayClick'>) => {
  const [value, setValue] = React.useState<Date | undefined>(undefined)

  return (
    <Calendar
      {...args}
      selected={value}
      onDayClick={(date: Date | undefined) => {
        if (date) setValue(date)
      }}
    />
  )
}

export const Primary: Story = {
  args: {
    selected: new Date(),
    onDayClick: () => {},
  },
  render: StoryRender,
}
