import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/index'
import React from 'react'

const meta: Meta<typeof Badge> = {
  title: 'Atom/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    variant: {
      options: [
        'default',
        'gradient',
        'success',
        'warning',
        'danger',
        'neutral',
        'select',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
    variant: 'default',
    showBorder: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultBadge: Story = {
  args: {
    children: 'Badge',
  },
}

export const BadgeWithPrefixIcon: Story = {
  args: {
    children: 'Badge',
    prefixIcon: <div>{'<'}</div>,
  },
}

export const BadgeWithSuffixIcon: Story = {
  args: {
    children: 'Badge',
    suffixIcon: <div>{'>'}</div>,
  },
}
