import type { Meta, StoryObj } from '@storybook/react'
import { StepperContainer } from '@/components/molecules/stepper/stepper.mock'
import { StepItemStatus } from '@/components/molecules/stepper'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/Stepper',
  component: StepperContainer,
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
} satisfies Meta<typeof StepperContainer>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: [
      { id: '1', label: '1', status: StepItemStatus.COMPLETED },
      { id: '2', label: '2', status: StepItemStatus.CURRENT },
      { id: '3', label: '3', status: StepItemStatus.PENDING },
      { id: '4', label: '4', status: StepItemStatus.PENDING },
      { id: '5', label: '5', status: StepItemStatus.PENDING },
    ],
    id: 'stepper',
  },
}
