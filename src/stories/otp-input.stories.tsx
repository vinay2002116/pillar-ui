import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { OtpInput } from '../components/unstyled/otp-input'

const meta: Meta<typeof OtpInput> = {
  title: 'Unstyled/Otp Input',
  component: OtpInput,
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 }, defaultValue: 6 },
    disabled: { control: 'boolean' },
    isError: { control: 'boolean' },
    onChange: { action: 'changed' },
    message: { control: 'text' },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof OtpInput>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    const handleChange = (newValue: string) => {
      setValue(newValue)
    }
    return <OtpInput {...args} value={value} onChange={handleChange} />
  },
  args: {
    length: 6,
    disabled: false,
    isError: false,
    message: 'Hint: Enter a 6-character alphanumeric code',
  },
  tags: ['autodocs'],
}

export const WithErrorState: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    const handleChange = (newValue: string) => {
      setValue(newValue)
    }
    return <OtpInput {...args} value={value} onChange={handleChange} />
  },
  args: {
    length: 6,
    disabled: false,
    isError: true,
    message: 'Hint: Enter a 6-character alphanumeric code',
  },
  tags: ['autodocs'],
}

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('')
    const handleChange = (newValue: string) => {
      setValue(newValue)
    }
    return <OtpInput {...args} value={value} onChange={handleChange} />
  },
  args: {
    length: 6,
    disabled: true,
    message: 'Hint: Enter a 6-character alphanumeric code',
  },
  tags: ['autodocs'],
}
