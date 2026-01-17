import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Alert } from '@/index'

// Meta configuration for the Alert component stories
const meta: Meta<typeof Alert> = {
  title: 'molecule/Alert',
  component: Alert,
  parameters: {
    layout: 'centered', // Centers the component in the Storybook Canvas
  },
  tags: ['autodocs'], // Enables automatic generation of documentation
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'info', 'success', 'warning', 'error'], // Dropdown options for variant prop
      description: 'Defines the type of alert.',
      table: {
        type: { summary: 'default | info | success | warning | error' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'The main content of the alert.',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonLabel: {
      control: { type: 'text' },
      description: 'Label for the action button within the alert.',
      table: {
        type: { summary: 'string' },
      },
    },
    showButton: {
      control: { type: 'boolean' },
      description: 'Controls whether the action button is displayed.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    shortContent: {
      control: { type: 'boolean' },
      description: 'Toggle to shorten the description content.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the alert element.',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title of the alert.',
      table: {
        type: { summary: 'string' },
      },
    },
    onButtonClick: {
      action: 'onButtonClick',
      description: 'Handler for button click events.',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    onClick: fn(),
    description: 'This is a description',
    buttonLabel: 'Label',
    showButton: true,
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

// Primary Story - Default Alert
export const Primary: Story = {
  args: {
    variant: 'info',
    description: 'This is a description for the info alert.',
    buttonLabel: 'Info Button',
    shortContent: true,
    id: 'primary-alert',
    title: 'Information',
  },
}

// Success Story - Success Variant Alert
export const Success: Story = {
  args: {
    variant: 'success',
    description: 'This is a success alert message.',
    buttonLabel: 'Success Button',
    shortContent: true,
    showButton: true,
    id: 'success-alert',
    title: 'Success',
  },
}

// Info Story - Information Variant Alert
export const Info: Story = {
  args: {
    variant: 'info',
    description:
      'This alert provides informational messages that are longer than usual. The content here is verbose to test how text wrapping works with longer descriptions in the info variant.',
    buttonLabel: 'More Info',
    shortContent: false,
    showButton: false,
    id: 'info-alert',
    title: 'Detailed Info',
  },
}

// Warning Story - Warning Variant Alert
export const Warning: Story = {
  args: {
    variant: 'warning',
    description:
      'This warning alert provides a lot of content to demonstrate how it behaves with longer text. Be cautious with the displayed information.',
    buttonLabel: 'Warning Button',
    shortContent: false,
    id: 'warning-alert',
    title: 'Warning',
  },
}

// Error Story - Error Variant Alert
export const Error: Story = {
  args: {
    variant: 'error',
    description: 'This is an error alert message.',
    buttonLabel: 'Retry',
    shortContent: true,
    showButton: true,
    id: 'error-alert',
    title: 'Error',
  },
}
