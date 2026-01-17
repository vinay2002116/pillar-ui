/* eslint-disable no-console */
import { Meta, StoryObj } from '@storybook/react/*'
import { Button } from '@/components/atoms/button'
import React from 'react'
import { Sheet, SheetProps } from '@/components/organisms/sheet'
import { CalendarDays } from 'lucide-react'

const meta = {
  title: 'organisms/Sheet',
  component: Sheet,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

function StoryRender(
  props: Omit<
    SheetProps,
    'open' | ' onOpenChange' | 'onInteractOutside' | 'trigger'
  >
) {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet
      {...props}
      open={open}
      onOpenChange={(open) => {
        console.log('open', open)
        setOpen(open)
      }}
      onInteractOutside={() => setOpen(false)}
      trigger={
        <Button
          variant="secondary"
          onClick={() => {
            console.log('clicked')
            setOpen(true)
          }}
        >
          Vinay
        </Button>
      }
    />
  )
}

export const Primary: Story = {
  args: {
    trigger: <>Not Vinay </>,
    content: (
      <div>
        {/* <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar> */}
        <div className="flex flex-col gap-10 space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="w-4 h-4 mr-2 opacity-70 " />{' '}
            <span className="text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </div>
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="w-4 h-4 mr-2 opacity-70 " />{' '}
            <span className="text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </div>
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="w-4 h-4 mr-2 opacity-70 " />{' '}
            <span className="text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </div>
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
        </div>
      </div>
    ),
    footer: (
      <div className="flex w-full gap-2 justify-evenly">
        <Button variant="secondary">@nextjs</Button>
        <Button variant="primary">Save</Button>
      </div>
    ),
    contentProps: { className: 'bg-light-1' },
    title: 'Profile',
    description: 'View profile information',
  },
  render: (args) => <StoryRender {...args} />,
}
