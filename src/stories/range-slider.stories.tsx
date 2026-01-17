import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from '@/components/molecules/range-slider'

const meta: Meta<typeof RangeSlider> = {
  title: 'molecule/Range Slider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'object' },
    min: { control: 'number' },
    max: { control: 'number' },
    stepSize: { control: 'number' },
    onChange: { action: 'changed' },
  },
  args: {
    value: [10, 90],
    min: 0,
    max: 100,
    stepSize: 5,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultRangeSlider1: Story = {
  args: {
    value: [0, 80],
    max: 100,
    min: 0,
    stepSize: 10,
  },

  render: (args) => {
    const [valueState, setValue] = React.useState<[number, number]>(
      args.value ?? [0, 0]
    )

    return (
      <div className="w-[400px] p-10 bg-black">
        <RangeSlider
          {...args}
          min={args.min}
          max={args.max}
          value={valueState}
          onChange={(newValue: [number, number]) => setValue(newValue)}
        />
      </div>
    )
  },
}
DefaultRangeSlider1.storyName = 'Range Slider'
