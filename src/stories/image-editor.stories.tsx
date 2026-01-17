import { Meta, StoryObj } from '@storybook/react'
import { ImageEditor } from '@/components/ui/image-editor'

const meta = {
  title: 'Ui/Image Editor',
  component: ImageEditor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!dev', '!autodocs'],
  argTypes: {
    stickers: {
      control: 'object',
      description: 'Array of sticker image URLs',
    },
    backgroundImage: {
      control: 'text',
      description: 'URL of the background image',
    },
  },
} satisfies Meta<typeof ImageEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    stickers: [
      'https://frontend-static-files.geoiq.io/strapi/Ellipse_2803_eb823536ae/Ellipse_2803_eb823536ae.png',
      'https://frontend-static-files.geoiq.io/strapi/Rectangle_5829_aa47e31c68/Rectangle_5829_aa47e31c68.png',
      'https://frontend-static-files.geoiq.io/strapi/Arrow_Double_Staight_0caa722046/Arrow_Double_Staight_0caa722046.png',
    ],
    backgroundImage: 'https://picsum.photos/800/600',
    onSave: () => {},
  },
}
