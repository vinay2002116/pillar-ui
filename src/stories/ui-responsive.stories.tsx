import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import {
  Breakpoints,
  Responsive,
  useResponsive,
  type ResponsiveTypesNS,
} from '..'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Responsive',
  component: Responsive,
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
} satisfies Meta<typeof Responsive>

export default meta

type Story = StoryObj<typeof meta>

// ======================== almost tailwindcss Breakpoints =====================

// Wrapper component to render the Responsive component with Tailwind's default Breakpoints
const TailwindRender = (
  props: ResponsiveTypesNS<typeof Breakpoints>['ResponsiveProps']
) => {
  return <Responsive<typeof Breakpoints> breakpoints={Breakpoints} {...props} />
}

export const TailwindBreakpoints: Story = {
  args: {
    children: <div>Default Child</div>,
  },

  render: () => {
    return (
      <TailwindRender
        sm={<div>SM</div>}
        md={<div>MD</div>}
        lg={<div>LG</div>}
        xl={<div>XL</div>}
        xl2={<div>XL2</div>}
      >
        <div>Default Child</div>
      </TailwindRender>
    )
  },
}

// ======================== custom breakpoints =================================

const CustomBreakpointsObj = {
  small: '500px',
  medium: '1000px',
  large: '1500px',
} satisfies ResponsiveTypesNS<unknown>['BreakpointsType']

// Wrapper component to render the custom Breakpoints
const CustomRender = (
  props: ResponsiveTypesNS<typeof CustomBreakpointsObj>['ResponsiveProps']
) => <Responsive breakpoints={CustomBreakpointsObj} {...props} />

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const CustomBreakpoints: Story = {
  args: {
    children: <div>Default Child</div>,
  },

  render: () => (
    <CustomRender
      small={<div>Small</div>}
      medium={<div>Medium</div>}
      large={<div>Large</div>}
    >
      I am the default Render Child from 0px to specified breakpoint
    </CustomRender>
  ),
}

// ======================== Hook for getting breakpoint ========================
export const HookUseReponsive: Story = {
  args: {
    children: null,
  },

  render: () => {
    const customBreakpoint = useResponsive({
      s3: '300px',
      s4: '400px',
      s5: '500px',
    })
    const tailwindBreakpoint = useResponsive()

    return (
      <>
        <div>
          Resize me and click on the scale above in storybook to see change in
          values
        </div>

        <div>
          {'window.innerWidth'} {window.innerWidth}
        </div>

        <div>
          {'tailwindBreakpoint'} {tailwindBreakpoint}
        </div>

        <div>
          {'customBreakpoint'} {customBreakpoint}
        </div>
      </>
    )
  },
}
