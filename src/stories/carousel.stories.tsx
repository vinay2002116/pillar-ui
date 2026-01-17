import React from 'react'
import { Carousel } from '../components/unstyled/carousel'
import { Meta, StoryObj } from '@storybook/react/*'

const meta = {
  title: 'unstyled/Carousel',
  component: Carousel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        {/* <img src="https://via.placeholder.com/150" /> */}
        item1
      </div>,
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        <img src="https://picsum.photos/200/300" />
      </div>,
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        <img src="https://picsum.photos/500" />
      </div>,
      // <div className="w-full h-full bg-brand-primary">Item1</div>,
      // <div className="w-full h-full bg-brand-primary">Item2</div>,
      // <div className="w-full h-fulll bg-brand-primary">Item3</div>,
    ],
    contentClassName: 'w-full h-[200px]',
  },
}

export const AutoPlay: Story = {
  args: {
    items: [
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        {/* <img src="https://via.placeholder.com/150" /> */}
        item1
      </div>,
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        <img src="https://picsum.photos/200/300" />
      </div>,
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        <img src="https://picsum.photos/500" />
      </div>,
      <div className="w-full h-full bg-brand-primary">Item3</div>,
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        Item4
      </div>,
      <div className="flex items-center justify-center bg-bg2 rounded-xl">
        Item5
      </div>,
    ],
    contentClassName: 'w-full h-[200px]',
    autoplay: true,
    autoplayInterval: 3000,
    loop: true,
    hideArrows: true,
  },
}
