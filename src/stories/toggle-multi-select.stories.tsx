import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import React from 'react'
import { ToggleMultiSelect } from '..'
import { Layers, User } from 'lucide-react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/Toggle (Multi-Select)',
  component: ToggleMultiSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ToggleMultiSelect>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const StoryRender = (args: Omit<Story['args'], 'value' | 'onValueChange'>) => {
  const [value, setValue] = useState<string[]>([])
  return (
    <ToggleMultiSelect
      {...args}
      options={args.options ?? []}
      selected={value}
      onChange={(val) => {
        setValue(val)
      }}
    />
  )
}

export const Primary: Story = {
  args: {
    options: [
      { label: 'alksnlsa', value: '1' },
      { label: 'as', value: '2', icon: <User size={16} /> },
      { label: 'aasfs', value: '3' },
      { label: 'qasfs', value: '4' },
      { label: '1', value: '5' },
      { label: '2', value: '6' },
      { label: '3', value: '7' },
      { label: '4', value: '8' },
    ],
    icon: <Layers width={18} height={18} />,
    selected: [],
    onChange: () => {},
    // placeholder: 'Select an item',
    // value: '2',
    // onValueChange: () => {},
  },
  render: StoryRender,
}

export const SearchablePrimary: Story = {
  name: 'Searchable Primary',
  args: {
    options: [
      { label: 'alksnlsa', value: '1' },
      { label: 'as', value: '2', icon: <User size={16} /> },
      { label: 'aasfs', value: '3' },
      { label: 'qasfs', value: '4' },
      { label: '1', value: '5' },
      { label: '2', value: '6' },
      { label: '3', value: '7' },
      { label: '4', value: '8' },
    ],
    icon: <Layers width={18} height={18} />,
    selected: [],
    isSearchable: true,
    onChange: () => {},
    // placeholder: 'Select an item',
    // value: '2',
    // onValueChange: () => {},
  },
  render: StoryRender,
}
