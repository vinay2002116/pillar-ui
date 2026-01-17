import React from 'react'
import { Button } from '@/components/atoms/button'
// import { ToastAction, ToastActionElement } from '..'
import { Toast } from '..'
import { useToast, ToasterToastProps } from '..'

import type { Meta, StoryObj } from '@storybook/react'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'molecule/Toast',
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  argTypes: {
    title: {
      description: 'The title of the toast. Optional',
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    description: {
      description: 'The description of the toast',
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    action: {
      description: 'The action of the toast',
      type: { name: 'object', required: false },
      control: {
        type: 'object',
      },
      table: {
        type: {
          summary: 'object',
          detail: `
          {
            title: string; // The title of the action
            method: VoidFunction; // The method to call when the action is triggered
            altText: string; // Alternative text for the action
          }
        `,
        },
      },
    },
    icon: {
      options: ['success', 'info', 'danger', 'warning'],
      control: {
        type: 'select',
      },
    },
  },

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

const StoryRender = (args: ToasterToastProps) => {
  const { toast } = useToast()

  return (
    <>
      <Toast />
      <div className="grid gap-1">
        <Button
          onClick={() =>
            toast({
              title: args.title,
              description: args.description,
              // variant: args.variant,
              action: args.action,
              icon: 'success',
            })
          }
        >
          Show Success Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              title: args.title,
              description: args.description,
              // variant: args.variant,
              action: args.action,
              icon: 'danger',
            })
          }
        >
          Show Danger Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              title: args.title,
              description: args.description,
              // variant: args.variant,
              action: args.action,
              icon: 'warning',
            })
          }
        >
          Show Warning Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              title: args.title,
              description: args.description,
              // variant: args.variant,
              action: args.action,
              icon: 'info',
            })
          }
        >
          Show Info Toast
        </Button>
      </div>
    </>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => (
    <StoryRender
      id={'This is my description'}
      title="This is my title"
      description="This is my description"
      icon={'success'}
    />
  ),
}

export const WithAction: Story = {
  render: () => (
    <StoryRender
      id={'This is my title'}
      title="This is my title"
      description="This is my description"
      action={{
        title: 'Action',
        altText: 'My action',
        // eslint-disable-next-line no-console
        method: () => console.log('action'),
      }}
      icon={'success'}
    />
  ),
}
