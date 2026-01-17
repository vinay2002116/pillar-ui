import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '@/index'
import { ArrowRight } from 'lucide-react'
import React from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atom/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['md', 'sm', 'lg'],
      control: {
        type: 'select',
      },
    },
    variant: {
      options: [
        'primary',
        'secondary',
        'teritiary',
        'link-primary',
        'link-secondary',
      ],
      control: {
        type: 'select',
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    disabled: false,
    loading: false,
    asChild: false,
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    // children: 'Primary Button',
    title: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    // children: 'Secondary Button',
    title: 'Secondary Button',
  },
}

export const Teritiary: Story = {
  args: {
    variant: 'teritiary',
    // children: 'Teritiary Button',
    title: 'Teritiary Button',
  },
}

export const LinkPrimary: Story = {
  args: {
    variant: 'link-primary',
    // children: 'Teritiary Button',
    title: 'Link Primary',
  },
}

export const LinkSecondary: Story = {
  args: {
    variant: 'link-secondary',
    // children: 'Teritiary Button',
    title: 'Link Secondary',
  },
}

export const Icon: Story = {
  args: {
    variant: 'secondary',
    children: <ArrowRight width={18} height={18} />,
  },
}

export const Suffix: Story = {
  args: {
    variant: 'primary',
    title: 'Primary Button',
    suffixIcon: <ArrowRight width={18} height={18} />,
  },
}

export const Prefix: Story = {
  args: {
    variant: 'secondary',
    title: 'Secondary Button',
    prefixIcon: <ArrowRight width={18} height={18} />,
  },
}
