import { Tooltip } from '@/index'
import { Meta, StoryObj } from '@storybook/react/*'

const meta = {
  title: 'atom/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content:
      'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.',
    headerText: 'This is a tooltip',
    triggerElement: 'Hover',
    side: 'left',
    delayDuration: 200,
    children: 'Hover me',
    className: 'bg-primary-1 text-light-1 p-2 rounded-lg',
  },
}
