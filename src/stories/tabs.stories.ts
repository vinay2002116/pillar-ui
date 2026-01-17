import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '@/index'
import { LucideAlbum } from 'lucide-react'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/Tabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['sm', 'md'],
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
  args: {},
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    tabList: [
      {
        label: 'Tab1',
        value: '1',
      },
      {
        label: 'Tab2',
        value: '2',
      },
      {
        label: 'Tab3',
        value: '3',
        icon: LucideAlbum,
      },
      {
        label: 'Tab4',
        value: '4',
        icon: LucideAlbum,
      },
    ],
    defaultValue: '1',
    value: '4',
    variant: 'primary',
    size: 'md',
    onTabChange: (value: string) => {
      // eslint-disable-next-line no-console
      console.log(value)
    },
    style: { width: '500px' },
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    tabList: [
      { label: 'Tab1', value: '1' },
      { label: 'Tab2', value: '2' },
      { label: 'Tab3', value: '3' },
      { label: 'Tab4', value: '4' },
    ],
    defaultValue: '2',
    value: '3',
    variant: 'secondary',
    size: 'md',
    onTabChange: (value: string) => {
      // eslint-disable-next-line no-console
      console.log(value)
    },
    style: { width: '300px' },
  },
}
