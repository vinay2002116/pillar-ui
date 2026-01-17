import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/index'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atom/Typography',
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      options: [
        'display1',
        'display2',
        'display3',
        'h1',
        'h2',
        'h3',
        'body1',
        'body2',
        'body3',
        'body4',
        'body5',
        'body6',
      ],
      control: {
        type: 'select',
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Display1: Story = {
  args: {
    variant: 'display1',
    children: 'Display1 Typography',
  },
}
export const Display2: Story = {
  args: {
    variant: 'display2',
    children: 'Display2Typography',
  },
}
export const Display3: Story = {
  args: {
    variant: 'display3',
    children: 'Display3 Typography',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'H1 Typography',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'H2 Typography',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'H3 Typography',
  },
}

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body1 Typography',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body2 Typography',
  },
}

export const Body3: Story = {
  args: {
    variant: 'body3',
    children: 'Body3 Typography',
  },
}
export const Body4: Story = {
  args: {
    variant: 'body4',
    children: 'Body4 Typography',
  },
}
export const Body5: Story = {
  args: {
    variant: 'body5',
    children: 'Body5 Typography',
  },
}

export const Body6: Story = {
  args: {
    variant: 'body6',
    children: 'Body6 Typography',
  },
}

export const Default: Story = {
  args: {
    children: 'Default Typography (Body1)',
  },
}
