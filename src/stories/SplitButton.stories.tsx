import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { SplitButton } from '@/index'
import { ArrowRight, Mail } from 'lucide-react'
import React from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/Split Button',
  component: SplitButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    variant: {
      options: ['primary', 'secondary'],
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
    size: 'md',
  },
} satisfies Meta<typeof SplitButton>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Primary Button',
    size: 'md',
    optionGroups: [
      [
        {
          label: 'Option 1',
          onClick: fn(),
        },
        {
          label: 'Option 2',
          onClick: fn(),
        },
      ],
    ],
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Secondary Button',
    size: 'sm',
    optionGroups: [
      [
        {
          label: 'Option 1',
          onClick: fn(),
        },
      ],
      [
        {
          label: 'Option 2',
          onClick: fn(),
        },
        {
          label: 'Option 3',
          onClick: fn(),
        },
      ],
    ],
  },
}

export const Prefix: Story = {
  args: {
    variant: 'secondary',
    title: 'Secondary Button',
    size: 'lg',
    prefixIcon: <ArrowRight width={18} height={18} />,
    optionGroups: [
      [
        {
          label: 'Option 1',
          onClick: fn(),
        },
        {
          label: 'Option 2',
          onClick: fn(),
        },
      ],
      [
        {
          label: 'Option 3',
          disabled: true,
        },
        {
          label: 'Option 4',
          onClick: () => {},
          subItems: [
            {
              icon: <Mail className="mr-2 h-4 w-4" />,
              label: 'Sub Option 1',
              // onClick: fn() // Doesn't work
              // eslint-disable-next-line no-console
              onClick: () => console.log('Sub Option 1 clicked'),
            },
          ],
        },
      ],
    ],
  },
}
