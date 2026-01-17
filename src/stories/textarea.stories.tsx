import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@/index'
import React from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atom/Textarea',
  component: Textarea,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  argTypes: {
    value: {
      control: {
        type: 'text',
      },
      description: 'The current value of the text area',
    },
    onChange: {
      description: 'The function to call when the text area value changes',
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (
  props: Omit<React.ComponentProps<typeof Textarea>, 'value' | 'onChange'>
) => {
  const [value, setValue] = React.useState('')
  return (
    <Textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      {...props}
    />
  )
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: 'Enter text here',
    disabled: false,
    inputLabel: 'Label',
    showTextCount: true,
    maximumTextCount: 100,
  },
  render: (args) => <StoryRender {...args} />,
}
