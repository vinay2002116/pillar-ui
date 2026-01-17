import React from 'react'
import { Meta, StoryObj } from '@storybook/react/*'
import { DropdownMenu } from '@/components/molecules/dropdown-menu'
import { Button, Typography } from '..'
import { Mail, Settings, User } from 'lucide-react'

const meta = {
  title: 'molecule/Dropdown',
  component: DropdownMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    trigger: <Button variant="secondary">Open</Button>,
    optionGroups: [
      [
        {
          label: 'My Account',
          // className: 'bg-brand-primary text-white',
          disabled: true,
          onClick: () => {},
        },
        {
          label: 'User',
          onClick: () => {},

          subItems: [
            {
              icon: <Mail className="mr-2 h-4 w-4" />,
              label: 'User1',
              disabled: true,
              onClick: () => {},
            },
          ],
        },
        {
          label: 'Settings',
          icon: <Settings className="mr-2 h-4 w-4" />,
          onClick: () => {},
        },
      ],
      [
        {
          label: 'User',
          icon: <User className="mr-2 h-4 w-4" />,
          onClick: () => {},
        },
        {
          label: 'Settings',
          icon: <Settings className="mr-2 h-4 w-4" />,
          onClick: () => {},
        },
      ],
    ],
    header: <Typography variant="body2">My Account</Typography>,
  },
}
