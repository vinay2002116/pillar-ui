import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { PolarSlider } from '..'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/Polar Slider',
  component: PolarSlider,
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
} satisfies Meta<typeof PolarSlider>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// ========================================= RANGE SLIDER - POSITIVE ===========

export const PolarSliderPositive: Story = {
  args: {
    value: 50,
    max: 100,
    min: 0,
    stepSize: 10,
  },

  render: (args) => {
    const [valueState, setValue] = React.useState(args.value)

    return (
      <div className="w-[400px] p-10 bg-black">
        <PolarSlider
          {...args}
          value={valueState as number}
          onChange={(value: number) => {
            setValue(value)
          }}
        />
      </div>
    )
  },
}
PolarSliderPositive.storyName = 'Polar Slider - Positive'

// ========================================= RANGE SLIDER - NEGATIVE ===========

export const PolarSliderNegative: Story = {
  args: {
    value: 50,
    max: 100,
    min: -100,
    stepSize: 10,
  },

  render: (args) => {
    const [valueState, setValue] = React.useState(args.value)

    return (
      <div className="w-[400px] p-10 bg-black">
        <PolarSlider
          {...args}
          value={valueState as number}
          onChange={(value: number) => {
            setValue(value)
          }}
        />
      </div>
    )
  },
}
PolarSliderNegative.storyName = 'Polar Slider - Negative'
