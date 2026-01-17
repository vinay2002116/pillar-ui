import { MapMarkerHoverCard, Button } from '@/index'
import { StoryObj } from '@storybook/react/*'
import React from 'react'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ui/Map Marker Hover Card',
  component: MapMarkerHoverCard,
  tags: ['!dev', '!autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PointCard: Story = {
  args: {
    isLoading: false,
    title: 'Geoiq',
    icon: '',
    variant: 'POINT', // Default is POINT
    score: { value: 4.5, isLoading: false },
    badge: 'Store code: AB123',
    description:
      'Urbanvault, 762, 19th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
    tags: [
      {
        icon_url:
          'https://frontend-static-files.geoiq.io/strapi/j8877zbtgwdm2uykhb3_8b4d258ac3.svg',
        name: 'Active stores',
      },
      {
        icon_url:
          'https://frontend-static-files.geoiq.io/strapi/solid_icon_list_4307bb64c8.svg',
        name: 'New arrival',
      },
    ],
    actions: (
      <Button variant="link-primary">
        View Details
        <img
          src="https://frontend-static-files.geoiq.io/strapi/arrow_right_primary_540b1bc12e.svg"
          alt="icon"
          className="w-5 h-5"
        />
      </Button>
    ),
  },
  render: (props) => {
    if (props.variant === 'CLUSTER') {
      return <MapMarkerHoverCard {...props} />
    }
    return <MapMarkerHoverCard {...props} />
  },
}

export const PointCardFooterLess: Story = {
  args: {
    isLoading: false,
    title:
      'Geoiq Urbanvault, 762, 19th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102 ',
    icon: '',
    description:
      'Urbanvault, 762, 19th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
    tags: [
      {
        icon_url:
          'https://frontend-static-files.geoiq.io/strapi/j8877zbtgwdm2uykhb3_8b4d258ac3.svg',
        name: 'Active stores',
      },
      {
        icon_url:
          'https://frontend-static-files.geoiq.io/strapi/solid_icon_list_4307bb64c8.svg',
        name: 'New arrival',
      },
    ],
    variant: 'POINT',
  },
}

const clusterData = {
  feature_type: 'CLUSTER',
  bbox: '',
  list: [
    {
      name: 'Competitor Brands',
      icon_url:
        'https://frontend-static-files.geoiq.io/strapi/Competitor_d959670dd2.svg',
      count: 10,
      color: '#F93232',
    },
    {
      name: 'Complementary Brands',
      icon_url:
        'https://frontend-static-files.geoiq.io/strapi/4t522giumb3m2uyputr_a4ad5a3c6b.svg',
      count: 8,
      color: '#7bbc99',
    },
    {
      name: 'Active stores',
      icon_url:
        'https://frontend-static-files.geoiq.io/strapi/j8877zbtgwdm2uykhb3_8b4d258ac3.svg',
      count: 2,
      color: '#6D48EF',
    },
  ],
}

export const ClusterCard: Story = {
  args: {
    isLoading: false,
    variant: 'CLUSTER',
    ...clusterData,
  },
}
