import { Meta, StoryObj } from '@storybook/react/*'
import { Button } from '@/components/atoms/button'
import React from 'react'
import { HoverCard } from '@/components/unstyled/hover-card'
import { CalendarDays } from 'lucide-react'

const meta = {
  title: 'unstyled/HoverCard',
  component: HoverCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    trigger: <Button variant="secondary">@nextjs</Button>,
    content: (
      <div className="flex justify-between space-x-4 ">
        {/* <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar> */}
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70 " />{' '}
            <span className="text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    ),
  },
}
