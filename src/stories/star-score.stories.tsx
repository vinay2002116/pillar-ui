import { StarScore } from '../components/ui/star-score'
import { Meta, StoryObj } from '@storybook/react/*'
// import React from 'react'

const meta = {
  title: 'ui/Star-Score',
  component: StarScore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof StarScore>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: 50,
    starGap: 1,
    starSize: 24,
    isLoading: false,
    showScore: true,
    showScorePercentage: false,
  },
}
