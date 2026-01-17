import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '..'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'atom/Skeleton',
  component: Skeleton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  argTypes: {
    className: {
      description: 'The class name of the skeleton',
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    className: 'h-[100px] w-[250px] bg-light-4 rounded-xl',
    id: 'primary',
  },
}

export const FullRound: Story = {
  args: {
    className: 'h-20 w-20 bg-light-4 rounded-full',
    id: 'full-round',
  },
}
