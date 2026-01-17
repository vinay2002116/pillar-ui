import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
// import { CallHistoryItem } from '@/components/ui/agent-snippet-view/agent-snippet-view.types'
import { AgentSnippetView } from '@/components/ui/agent-snippet-view'

const meta: Meta<typeof AgentSnippetView> = {
  title: 'Ui/AgentSnippetView',
  component: AgentSnippetView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AgentSnippetView>

const mockMembers = {
  list: [
    {
      id: '1',
      name: 'mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
    {
      id: '1',
      name: 'Mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
    {
      id: '1',
      name: 'Mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
    {
      id: '1',
      name: 'Mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
    {
      id: '1',
      name: 'Mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
    {
      id: '1',
      name: 'Mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
    {
      id: '1',
      name: 'Mayank',
      imageSrc: '',
      alt: 'Mayank',
      fallback: 'M',
    },
    {
      id: '2',
      name: 'Naveen',
      imageSrc: '',
      alt: 'Naveen',
      fallback: 'N',
    },
  ],
}

const mockServingStates = ['Delhi', 'Haryana', 'UP']
const mockNotes = {
  list: [
    {
      user: { first_name: 'Mayank', last_name: 'Agarwal', image_url: '' },
      note: 'Call initiated by BD_name',
      call_duration: '2 mins',
      timestamp: 1747791300000,
    },
    {
      user: { first_name: 'Naveen', last_name: 'Singh', image_url: '' },
      note: 'Sent property details.',
      call_duration: '',
      timestamp: 1747794300000,
    },
    {
      user: { first_name: 'Mayank', last_name: 'Agarwal', image_url: '' },
      note: 'Called client, discussed requirements.',
      timestamp: 1747791300000,
    },
    {
      user: { first_name: 'Naveen', last_name: 'Singh', image_url: '' },
      note: 'Sent property details.',
      timestamp: 1747794300000,
    },
    {
      user: { first_name: 'Mayank', last_name: 'Agarwal', image_url: '' },
      note: 'Called client, discussed requirements.',
      timestamp: 1747791300000,
    },
    {
      user: { first_name: 'Naveen', last_name: 'Singh', image_url: '' },
      note: 'Sent property details.',
      timestamp: 1747794300000,
    },
    {
      user: { first_name: 'Mayank', last_name: 'Agarwal', image_url: '' },
      note: 'Called client, discussed requirements.',
      timestamp: 1747791300000,
    },
    {
      user: { first_name: 'Naveen', last_name: 'Singh', image_url: '' },
      note: 'Sent property details.',
      timestamp: 1747794300000,
    },
    {
      user: { first_name: 'Mayank', last_name: 'Agarwal', image_url: '' },
      note: 'Called client, discussed requirements.',
      timestamp: 1747791300000,
    },
    {
      user: { first_name: 'Naveen', last_name: 'Singh', image_url: '' },
      note: 'Sent property details.',
      timestamp: 1747794300000,
    },
  ],
}
const mockPropertiesAdded = [
  {
    id: 1,
    name: '208, 21st main, HSR layout, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 75,000/month' },
      { name: 'Added On', value: '24 Jan 2024' },
      { name: 'Status', value: 'Rejected (Not visited)' },
    ],
  },
  {
    id: 2,
    name: '102, 5th cross, Koramangala, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 60,000/month' },
      { name: 'Added On', value: '10 Feb 2024' },
      { name: 'Status', value: 'Approved (Visited)' },
    ],
  },
  {
    id: 1,
    name: '208, 21st main, HSR layout, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 75,000/month' },
      { name: 'Added On', value: '24 Jan 2024' },
      { name: 'Status', value: 'Rejected (Not visited)' },
    ],
  },
  {
    id: 2,
    name: '102, 5th cross, Koramangala, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 60,000/month' },
      { name: 'Added On', value: '10 Feb 2024' },
      { name: 'Status', value: 'Approved (Visited)' },
    ],
  },
  {
    id: 1,
    name: '208, 21st main, HSR layout, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 75,000/month' },
      { name: 'Added On', value: '24 Jan 2024' },
      { name: 'Status', value: 'Rejected (Not visited)' },
    ],
  },
  {
    id: 2,
    name: '102, 5th cross, Koramangala, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 60,000/month' },
      { name: 'Added On', value: '10 Feb 2024' },
      { name: 'Status', value: 'Approved (Visited)' },
    ],
  },
  {
    id: 1,
    name: '208, 21st main, HSR layout, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 75,000/month' },
      { name: 'Added On', value: '24 Jan 2024' },
      { name: 'Status', value: 'Rejected (Not visited)' },
    ],
  },
  {
    id: 2,
    name: '102, 5th cross, Koramangala, Bangalore',
    property_details: [
      { name: 'Rent', value: '₹ 60,000/month' },
      { name: 'Added On', value: '10 Feb 2024' },
      { name: 'Status', value: 'Approved (Visited)' },
    ],
  },
]

export const Default: Story = {
  args: {
    members: mockMembers,
    servingStates: mockServingStates,
    types: ['Internal'],
    sharedMarkets: <div>5</div>,
    propertiesAdded: mockPropertiesAdded,
    property_count: 5,
    // callHistory: mockCallHistory,
    notes: mockNotes,
    notesLoading: true,
    loading: true,
    onNoteSubmit: (note) => alert('Note submitted: ' + note),
    // onCallNoteSubmit: (idx, note) => alert(`Call note for #${idx}: ${note}`),
  },
}
