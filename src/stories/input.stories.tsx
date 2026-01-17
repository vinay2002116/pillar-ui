import { Input } from '@/components/atoms/input'
import { Meta, StoryObj } from '@storybook/react'
import { Mail } from 'lucide-react'
import React, { useState } from 'react'
import { InputProps } from '@/components/atoms/input/input.types'

const meta: Meta<InputProps> = {
  title: 'atom/Input',
  component: Input,

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: {
    placeholder: 'Enter Something',
    message: '',
    disabled: false,
    prefix: null,
    suffix: null,
  },

  argTypes: {
    placeholder: {
      type: 'string',
      description: 'The placeholder text for the input field',
      control: { type: 'text' },
    },
    message: {
      type: 'string',
      description: 'The message to display below the input',
      control: { type: 'text' },
    },
    isError: {
      type: 'boolean',
      description: 'If true, the input will be styled as an error',
      control: { type: 'boolean' },
    },
    disabled: {
      type: 'boolean',
      description: 'If true, the input will be disabled',
      control: { type: 'boolean' },
    },
    prefix: {
      description: 'An element to display before the input (e.g., an icon)',
      control: { type: 'object' },
    },
    suffix: {
      description: 'An element to display after the input (e.g., an icon)',
      control: { type: 'object' },
    },
    onChange: {
      action: 'onChange',
      description: 'Callback when the input value changes',
    },
  },
}

export default meta

type Story = StoryObj<InputProps>

const StoryRender = (args: InputProps) => {
  const [value, setValue] = useState('')
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        args.onChange?.(e) // Trigger the onChange action in Storybook
      }}
    />
  )
}

export const Primary: Story = {
  render: StoryRender,
}

export const Error: Story = {
  args: {
    isError: true,
    message: 'This is an error message',
  },
  render: StoryRender,
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: StoryRender,
}

export const Prefix: Story = {
  args: {
    prefix: <Mail size={20} className="stroke-gray-400" />,
  },
  render: StoryRender,
}

export const Suffix: Story = {
  args: {
    suffix: <Mail size={20} className="stroke-gray-400" />,
  },
  render: StoryRender,
}
