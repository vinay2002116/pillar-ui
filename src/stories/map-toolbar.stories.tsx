/* eslint-disable no-console */
import { Meta, StoryObj } from '@storybook/react'
import { MapToolbar } from '..'

const meta: Meta<typeof MapToolbar> = {
  title: 'ui/MapToolbar',
  component: MapToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDropActive: { control: 'boolean' },
    hideDropPin: { control: 'boolean' },
    hideCTA: { control: 'boolean' },
    isFullScreen: { control: 'boolean' },
    disableDropPin: { control: 'boolean' },
    setFullScreen: { action: 'setFullScreen' }, // Handles function in Storybook UI
    onToggleIsDropAPin: { action: 'onToggleIsDropAPin' },
    ctaConfig: { control: 'object' },
    mapId: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isDropActive: true,
    onToggleIsDropAPin: () => console.log('Toggled Drop Pin'),
    ctaConfig: {
      ctaLabel: 'Explore Whitespace',
      ctaCallback: () => console.log('CTA Clicked'),
    },
    map: null, // Should be replaced with actual map instance
    mapRef: undefined, // Should be a ref to the map
    hideCTA: true,
    hideDropPin: false,
    isFullScreen: true,
    setFullScreen: () => console.log('Fullscreen toggled'),
    disableDropPin: false,
    mapId: 'mapId',
  },
}
