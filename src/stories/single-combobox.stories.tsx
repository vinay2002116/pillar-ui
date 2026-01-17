import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react/*'

import { SingleCombobox, SingleComboboxPropsType } from '@/index'
import { User2 } from 'lucide-react'
import { Button } from '..'

const meta = {
  title: 'molecule/SingleCombobox',
  component: SingleCombobox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SingleCombobox>

export default meta

type Story = StoryObj<typeof meta>

function StoryRender(
  props: Omit<SingleComboboxPropsType, 'value' | 'onChange'>
) {
  const [value, setValue] = useState('')
  return (
    <div className="w-[440px]">
      <SingleCombobox
        options={props.options}
        placeholder={props.placeholder}
        value={value}
        onChange={setValue}
        searchPlaceholder={props.searchPlaceholder}
        emptyMessage={props.emptyMessage}
        onSearchChange={props.onSearchChange}
        onChangePopoverOpen={props.onChangePopoverOpen}
        listEmptyComponent={props.listEmptyComponent}
        // popoverContentProps={{
        //   side: 'bottom',
        // }}
      />
    </div>
  )
}

export const Primary: Story = {
  args: {
    options: [
      {
        id: 'next.js',
        name: 'Next.js',
      },
      {
        id: 'sveltekit',
        name: 'SvelteKit',
        icon: <User2 className="w-4 h-4" />,
      },
      {
        id: 'nuxt.js',
        name: 'Nuxt.js',
        disabled: true,
      },
      {
        id: 'remix',
        name: 'Remix alfhaldf adofhsaoi sf ajsfoia jsopfja psfjaopsf jaosfjos  jsbfajksfbaljsfbjlksfjlsfbls ',
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
    ],
    value: '',
    placeholder: 'Enter',
    onChange: () => {},
    emptyMessage: 'No results',
    searchPlaceholder: 'Search',
    onChangePopoverOpen: (open) => {
      // eslint-disable-next-line no-console
      console.log(open, 'open')
    },
  },
  render: (args) => {
    return (
      <StoryRender
        options={args.options}
        placeholder={args.placeholder}
        searchPlaceholder={args.searchPlaceholder}
        emptyMessage={args.emptyMessage}
        onSearchChange={args.onSearchChange}
        onChangePopoverOpen={args.onChangePopoverOpen}
      />
    )
  },
}

export const DynamicOptions: Story = {
  args: {
    options: [
      {
        id: 'next.js',
        name: 'Next.js',
      },
      {
        id: 'sveltekit',
        name: 'SvelteKit',
        icon: <User2 className="w-4 h-4" />,
      },
      {
        id: 'nuxt.js',
        name: 'Nuxt.js',
        disabled: true,
      },
      {
        id: 'remix',
        name: 'Remix alfhaldf adofhsaoi sf ajsfoia jsopfja psfjaopsf jaosfjos  jsbfajksfbaljsfbjlksfjlsfbls ',
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
    ],
    value: '',
    placeholder: 'Enter',
    onChange: () => {},
    emptyMessage: 'No results',
    searchPlaceholder: 'Search',
    onSearchChange: (searchVal) => {
      // eslint-disable-next-line no-console
      console.log(searchVal, 'searchVal')
    },
    onChangePopoverOpen: (open) => {
      // eslint-disable-next-line no-console
      console.log(open, 'open')
    },
  },
  render: (args) => {
    return (
      <StoryRender
        options={args.options}
        placeholder={args.placeholder}
        searchPlaceholder={args.searchPlaceholder}
        emptyMessage={args.emptyMessage}
        onSearchChange={args.onSearchChange}
        onChangePopoverOpen={args.onChangePopoverOpen}
      />
    )
  },
}

export const CustomEmptyPlaceholder: Story = {
  args: {
    options: [
      // {
      //   id: '2',
      //   name: '2',
      // },
    ],
    value: '',
    placeholder: 'Enter',
    onChange: () => {},
    emptyMessage: 'No results',
    searchPlaceholder: 'Search',
    listEmptyComponent: (
      <div>
        Its Empty here
        <Button
          variant="link-primary"
          size="sm"
          onClick={() => alert('clicked')}
        >
          Add new item
        </Button>
      </div>
    ),
  },
  render: (args) => {
    return (
      <StoryRender
        options={args.options}
        placeholder={args.placeholder}
        searchPlaceholder={args.searchPlaceholder}
        emptyMessage={args.emptyMessage}
        listEmptyComponent={args.listEmptyComponent}
      />
    )
  },
}
