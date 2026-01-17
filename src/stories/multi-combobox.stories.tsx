import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import React from 'react'
import { Button, MultiCombobox } from '..'
import { User } from 'lucide-react'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/MultiCombobox',
  component: MultiCombobox,
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
} satisfies Meta<typeof MultiCombobox>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const StoryRender = (args: Omit<Story['args'], 'value' | 'onValueChange'>) => {
  const [value, setValue] = useState<string[]>([])
  return (
    <div className="w-[440px]">
      <MultiCombobox
        {...args}
        options={args.options ?? []}
        selected={value}
        onChange={(val) => {
          setValue(val)
        }}
        placeholder={args.placeholder ?? ''}
        // popoverContentProps={{
        //   side: 'bottom',
        // }}
      />
    </div>
  )
}

export const Primary: Story = {
  args: {
    options: [
      {
        label:
          'alksnlsaasdasdasdasdasdas alksnlsaasdasdasdasdasdas alksnlsaasdasdasdasdasdas alksnlsaasdasdasdasdasdas alksnlsaasdasdasdasdasdas  ',
        value: '1',
      },
      { label: 'as', value: '2', icon: <User size={16} /> },
      { label: 'aasfs', value: '3' },
      { label: 'qasfs', value: '4' },
      { label: '1', value: '5' },
      { label: '2', value: '6' },
      { label: '3', value: '7' },
      { label: '4', value: '8' },
    ],
    selected: [],
    onChange: () => {},
    placeholder: 'Select an item',
    // value: '2',
    // onValueChange: () => {},
  },
  render: StoryRender,
}

export const DynamicOptions: Story = {
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
    selected: [],
    placeholder: 'Enter',
    onChange: () => {},
    searchPlaceholder: 'Search',
    onSearchChange: (searchVal) => {
      // eslint-disable-next-line no-console
      console.log(searchVal, 'searchVal')
    },
    onChangePopoverOpen: (open) => {
      // eslint-disable-next-line no-console
      console.log(open, 'open')
    },
  },
  render: StoryRender,
}

export const CustomEmptyPlaceholder: Story = {
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
    selected: [],
    onChange: () => {},
    // value: '2',
    // onValueChange: () => {},
    listEmptyComponent: (
      <div>
        Its Empty here
        <Button
          variant="link-primary"
          size="sm"
          onClick={() => alert('clicked')}
        >
          Add new item
        </Button>
      </div>
    ),
  },
  render: StoryRender,
}
