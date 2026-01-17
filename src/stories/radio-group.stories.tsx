// radio-group.stories.tsx
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '@/index'
import { RadioGroupVariants } from '../components/atoms/radio-group/radio-group-style'

const meta: Meta<typeof RadioGroup> = {
  title: 'atom/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <label htmlFor="option2">Option 2</label>
      </div>
    </RadioGroup>
  ),
}

export const CheckedState: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem checked value="checked" id="checked" />
        <label htmlFor="checked">Checked State</label>
      </div>
    </RadioGroup>
  ),
}

export const DisabledState: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem disabled value="disabled" id="disabled" />
        <label htmlFor="disabled">Disabled Radio</label>
      </div>
    </RadioGroup>
  ),
}

export const StylingExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            className={RadioGroupVariants({ className: 'border-red-500' })}
            value="styled"
            id="styled"
          />
          <label htmlFor="styled">Custom Styled Radio</label>
        </div>
      </RadioGroup>
    </div>
  ),
}
