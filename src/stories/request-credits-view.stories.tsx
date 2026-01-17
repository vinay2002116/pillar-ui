import { RequestCreditsView } from '../components/ui/request-credits-view'
import { Meta, StoryObj } from '@storybook/react/*'

const meta = {
  title: 'ui/Request-Credits-View',
  component: RequestCreditsView,
  parameters: {
    layout: 'centered',
  },
  tags: ['!dev', '!autodocs'],
  argTypes: {},
} satisfies Meta<typeof RequestCreditsView>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    onRequestCredits: (credit, phoneNumber) => {
      // eslint-disable-next-line no-console
      console.log(
        'Requesting credits:',
        credit,
        'for phone number:',
        phoneNumber
      )
    },
  },
}
