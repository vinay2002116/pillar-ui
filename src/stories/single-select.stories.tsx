import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import React from 'react'
import { SingleSelect } from '..'
import { User } from 'lucide-react'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/SingleSelect',
  component: SingleSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    disabled: {
      type: 'boolean',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    placeholder: 'select an item',
  },
} satisfies Meta<typeof SingleSelect>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const StoryRender = (args: Omit<Story['args'], 'value' | 'onValueChange'>) => {
  const [value, setValue] = useState('')
  return (
    // <Input
    //   {...args}
    //   value={value}
    //   onChange={(e) => {
    //     setValue(e.target.value)
    //   }}
    // />
    <div className="w-80">
      <SingleSelect
        {...args}
        items={args.items ?? []}
        value={value}
        onValueChange={(val) => {
          // console.log(val)

          setValue(val)
        }}
      />
    </div>
  )
}

export const Primary: Story = {
  args: {
    items: [
      { label: 'alksnlsa', value: '1', icon: <User size={16} /> },
      { label: 'as', value: '2', disabled: true },
      { label: 'aasfs', value: '3' },
      { label: 'qasfs', value: '4' },
      { label: 'alksnlsa', value: '5' },
      {
        label: 'asashbahkdfbjkabdfkjadbf akjbfjkasbfljas kajbskfjsbf',
        value: '6',
        disabled: false,
      },
      { label: 'aasfs', value: '7' },
      { label: 'qasfs', value: '8' },
      { label: 'alksnlsa', value: '9' },
      { label: 'as', value: '10', disabled: true },
      { label: 'aasfs', value: '11' },
      { label: 'qasfs', value: '12' },
    ],
    placeholder: 'Select an item',
    value: '2',
    onValueChange: () => {},
    id: 'single-select',
  },
  render: StoryRender,
}
