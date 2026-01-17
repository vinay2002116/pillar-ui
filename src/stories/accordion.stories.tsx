import { Meta, StoryObj } from '@storybook/react/*'
// import { Button } from '@/components/core/button'
import React from 'react'
import { Accordion } from '@/components/atoms/accordion'
// import { CalendarDays } from 'lucide-react'
import { Typography } from '@/components/atoms/typography'

const meta = {
  title: 'atom/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (props: Story['args']) => {
  return (
    <div className="w-[400px]">
      <Accordion {...props} />
    </div>
  )
}

export const Primary: Story = {
  args: {
    trigger: <Typography variant={'body1'}>Is it accessible?</Typography>,
    content: (
      <Typography variant={'body4'} className="text-light-4">
        Yes. It adheres to the WAI-ARIA design pattern.
      </Typography>
    ),
  },
  render: StoryRender,
}
