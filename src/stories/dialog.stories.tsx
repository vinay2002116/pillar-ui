import { Meta, StoryObj } from '@storybook/react/*'
import { Dialog } from '@/components/organisms/dialog'
import { Button, SingleCombobox } from '..'
import { Input } from '@/components/atoms/input'
import { DialogClose } from '@radix-ui/react-dialog'
import React from 'react'
import { Copy } from 'lucide-react'

const meta = {
  title: 'organisms/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Generic dialog component',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Share',
    description: 'Copy the link below to share',
    body: (
      <div className="flex items-center px-4 pb-3 space-x-2">
        <div className="grid flex-1 gap-2">
          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />

          <SingleCombobox
            options={[
              {
                id: 'next.js',
                name: 'Next.js',
              },
              {
                id: 'sveltekit',
                name: 'SvelteKit',
              },
              {
                id: 'nuxt.js',
                name: 'Nuxt.js',
                disabled: true,
              },
              {
                id: 'remix',
                name: 'Remix',
              },
              {
                id: 'astro',
                name: 'Astro',
              },
              {
                id: 'astro1',
                name: '1 Astro',
              },
              {
                id: 'astro2',
                name: '2 Astro',
              },
              {
                id: '2',
                name: '2',
              },
              {
                id: '4',
                name: '4',
              },
              {
                id: '5',
                name: '5',
              },
              {
                id: '6',
                name: '6',
              },
              {
                id: '7',
                name: '7',
              },
            ]}
            placeholder={'dasd'}
            value={''}
            onChange={() => {}}
            searchPlaceholder={'dasd'}
            emptyMessage={'asdas'}
            onSearchChange={() => {}}
            onChangePopoverOpen={() => {}}
          />
        </div>
        <Button type="submit" size="sm" variant={'secondary'} className="px-3">
          <span className="sr-only">Copy</span>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    ),
    trigger: <Button variant={'secondary'}>Share</Button>,
    footer: (
      <div className="w-full flex items-center gap-4 justify-between">
        <DialogClose asChild>
          <Button size={'sm'} type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button size={'sm'} type="button" variant="primary">
          Close
        </Button>
      </div>
    ),
    footerClassName: 'sm:justify-start',
    open: true,
    onOpenChange: (open: boolean) => {
      // eslint-disable-next-line no-console
      console.log(open)
    },
    contentClassName: '',
    onInteractOutside: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Width of the dialog can be controlled by `contentClassName`. Default width is `max-w-full`. It takes max-width classes from Tailwind CSS. `https://github.com/shadcn-ui/ui/issues/1870`',
      },
    },
  },
}
