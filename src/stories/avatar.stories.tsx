import { Meta, StoryObj } from '@storybook/react/*'
import React from 'react'
import { Avatar } from '@/components/atoms/avatar'
import { User } from 'lucide-react'

const meta = {
  title: 'atom/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    imageSrc: 'https://avatars.githubusercontent.com/u/1024025-1',
    alt: 'avatar',
    // size: 'md',
    fallback: <User />,
  },
}
