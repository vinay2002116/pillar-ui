import { Meta, StoryObj } from '@storybook/react/*'
import { Button } from '@/components/atoms/button'
import React from 'react'
import { AlertDialog, AlertDialogCancel } from '..'

const meta = {
  title: 'organisms/AlertDialog',
  component: AlertDialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    trigger: <Button variant="secondary">@nextjs</Button>,
    // content: (
    //   <div className="flex justify-between space-x-4 ">
    //     <div className="space-y-1">
    //       <h4 className="text-sm font-semibold">@nextjs</h4>
    //       <p className="text-sm">
    //         The React Framework – created and maintained by @vercel.
    //       </p>
    //       <div className="flex items-center pt-2">
    //         <CalendarDays className="w-4 h-4 mr-2 opacity-70 " />{' '}
    //         <span className="text-xs text-muted-foreground">
    //           Joined December 2021
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // ),
    //
    headerText: 'Archive market?',
    descriptionText:
      'If you choose to proceed, this market will be hidden from this list. And you cna access it from the archived markets.',
    footer: (
      <>
        <AlertDialogCancel>
          <Button variant={'secondary'}>Cancel</Button>
        </AlertDialogCancel>
        <Button variant={'primary'}>Yes, Proceed</Button>
      </>
    ),
  },
}
