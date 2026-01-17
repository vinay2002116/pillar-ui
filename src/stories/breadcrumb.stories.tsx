import { Meta, StoryObj } from '@storybook/react/*'
import React from 'react'
import { Breadcrumb } from '@/components/molecules/breadcrumb'
import { HomeIcon } from 'lucide-react'

const meta = {
  title: 'molecule/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    fields: [
      { id: '1', href: '/', icon: <HomeIcon size={20} /> },
      { id: '2', name: 'Products', href: '/products' },
      { id: '3', name: 'Product 1', href: '/products/1' },
      { id: '4', name: 'Home', href: '/' },
      { id: '5', name: 'Products', href: '/products' },
      { id: '6', name: 'Product 1', href: '/products/1' },
    ],
    numberOfFieldsToShow: 2,
    selectedFieldId: '5',
  },
}
