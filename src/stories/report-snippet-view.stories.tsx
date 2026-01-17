import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ReportSnippetView } from '../components/ui/report-snippet-view'
// import { Settings } from 'lucide-react'
// import { Typography } from '..'

const meta = {
  title: 'ui/Report-Snippet-View',
  component: ReportSnippetView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ReportSnippetView>

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (props: Story['args']) => (
  <div className="justify-center w-screen h-screen px-20 py-3 border border-neutral-1">
    <div className="border border-neutral-1 w-[420px]">
      <ReportSnippetView {...props} />
    </div>
  </div>
)

export const Default: Story = {
  args: {
    // Basic Information
    title:
      'Urbanvault, 762, 19th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
    subTitle:
      'Sector 3, HSR Layout / Bangalore hello test testing djhasgdjkhagsdhkgaksdgkagsdkhaskdhgkhasgdkhgaksgdkg',
    tag: '15 mins driving',
    searched_on: '1631011200',
    score: {
      value: 50,
      isLoading: false,
    },
    isLoading: false,

    // Map
    map: (
      <div className="h-[200px] flex bg-neutral-1 border justify-center items-center">
        Map
      </div>
    ),

    // Highlights
    highlights: [
      { name: 'Medium footfall', variant: 'warning' },
      { name: 'High Spend Quotient', variant: 'success' },
      { name: 'Medium Growth', variant: 'warning' },
      { name: 'High Competitor presence', variant: 'success' },
      { name: 'Low Complimentary presence', variant: 'danger' },
      { name: 'High Total addressable market', variant: 'success' },
    ],

    // Store Insights
    catchmentInsights: [
      {
        type: 'competitor',
        count: 5,
        iconUrl:
          'https://frontend-static-files.geoiq.io/strapi/solid_icon_list_05d0d218cd.svg',
      },
      {
        type: 'complementary',
        count: 3,
        iconUrl:
          'https://frontend-static-files.geoiq.io/strapi/solid_icon_list_4ccd38a8c8.svg',
      },
    ],
    // customButton: (
    //   <button
    //     className="flex items-center gap-1"
    //     onClick={() => {
    //       // Your onClick logic here
    //       console.log('Configure button clicked')
    //     }}
    //   >
    //     <Settings className="h-4 w-4 stroke-brand" />
    //     <Typography variant={'body4'} className="text-primary-2">
    //       Configure
    //     </Typography>
    //   </button>
    // ),

    // Store Highlights
    storeHighlights: [
      { name: 'Footfall growth', trend: 1, value: '10.88' },
      { name: 'Store Popularity', trend: -1, value: '88.8' },
      { name: 'Category Popularity', trend: 1, value: '1' },
      { name: 'TAM coverage', trend: null, value: '-' },
    ],

    // Footfall Data
    footfallChartData: [
      { month: 'September', footfall: 2000, year: '2024' },
      { month: 'October', footfall: 500, year: '2024' },
      { month: 'November', footfall: 1500, year: '2025' },
    ],

    // Cannibalisation Data
    cannibalisationChartData: [
      {
        cannibalisation: 50,
        store_name: 'Raymond - Made to Measure',
        distance: 4,
      },
      {
        cannibalisation: 50,
        store_name: 'ColorPlus',
        distance: 4,
      },
      {
        cannibalisation: 50,
        store_name: 'Ethnix by Raymond',
        distance: 4,
      },
      {
        cannibalisation: 50,
        store_name: 'Park Avenue',
        distance: 4,
      },
      {
        cannibalisation: 49,
        store_name: 'Raymond - Ready to Wear',
        distance: 4,
      },
      {
        cannibalisation: 26,
        store_name: 'The Raymond Shop',
        distance: 4,
      },
    ],

    // Street View Data
    streetViewData: [
      { direction: 'Front', image_url: 'https://picsum.photos/id/231/200/300' },
      { direction: 'Back', image_url: 'https://picsum.photos/id/232/200/300' },
      { direction: 'Left', image_url: 'https://picsum.photos/id/233/200/300' },
      { direction: 'Right', image_url: 'https://picsum.photos/id/234/200/300' },
      {
        direction: 'Inside',
        image_url: 'https://picsum.photos/id/235/200/300',
      },
    ],
    handleStreetViewClick: () => {},
    isStreetViewDataLoading: false,
  },
  render: StoryRender,
}
