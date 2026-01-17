import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@/components/molecules/pagination'

const meta: Meta<typeof Pagination> = {
  title: 'molecule/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    firstPage: { control: 'number' },
    lastPage: { control: 'number' },
    currPage: { control: 'number' },
    siblingCount: { control: 'number' },
    onPageChange: { action: 'changed' },
  },
  args: {
    firstPage: 1,
    lastPage: 10,
    currPage: 1,
    siblingCount: 1,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultRangeSlider1: Story = {
  args: {
    firstPage: 1,
    lastPage: 10,
    currPage: 1,
    siblingCount: 1,
  },

  render: (args) => {
    const [currPageState, setCurrPage] = React.useState<number>(
      args.currPage ?? 1
    )

    return (
      <Pagination
        firstPage={args.firstPage}
        lastPage={args.lastPage}
        currPage={currPageState}
        siblingCount={args.siblingCount}
        onPageChange={(newPage: number) => setCurrPage(newPage)}
      />
    )
  },
}
DefaultRangeSlider1.storyName = 'Pagination'
