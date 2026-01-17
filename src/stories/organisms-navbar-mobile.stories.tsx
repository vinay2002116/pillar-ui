import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { NavbarMobile } from '..'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'organisms/Navbar Mobile',
  component: NavbarMobile,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof NavbarMobile>

export default meta

type Story = StoryObj<typeof meta>

const Button: React.FC<React.PropsWithChildren> = ({ children }) => (
  <button className="bg-red">{children}</button>
)

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NavbarMobileVariant: Story = {
  args: {
    credits: 108,

    logo: {
      src: 'https://frontend-static-files.geoiq.io/strapi/geoiq_logo_logo_a2abf034f4.svg',
      alt: 'GeoIQ Logo',
      text: 'RetailIQ',
    },

    logoutPanel: {
      bottomItems: [
        {
          label: 'Terms of Service',
          onClick: () => alert('you clicked terms of service'),
        },
        {
          label: 'Privacy Policy',
          onClick: () => alert('you clicked privacy policy'),
        },
      ],
      handleLogout: () => alert('you clicked logout'),
    },

    profile: {
      src: '',
      email: 'abc@xyz.com',
      name: 'John Doe',
      popoverOptions: [
        [
          {
            label: 'Terms of Service',
            disabled: false,
            onClick: () => alert('you clicked terms of service'),
          },
          {
            label: 'Privacy Policy',
            disabled: false,
            onClick: () => alert('you clicked privacy policy'),
          },
        ],
        [
          {
            label: 'Logout',
            disabled: false,
            icon: (
              <img
                src="https://frontend-static-files.geoiq.io/strapi/logout_9276906fc9.svg"
                alt="logout"
                className="mr-2 h-4 w-4"
              />
            ),
            onClick: () => alert('you clicked logout'),
          },
        ],
      ],
    },

    icons: [
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_discover_b48733ae00.svg',
        alt: 'navbar discover',
        tooltipText: 'Navbar Discover',
        onClick: () => alert('you clicked icon 2'),
        isNew: true,
        isActive: true,
        wrapper: (children) => <Button children={children} />,
      },
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_demand_map_c28c78238c.svg',
        alt: 'demand map',
        tooltipText: 'Demand Map',
        onClick: () => alert('you clicked icon 2'),
      },
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_site_report_builder_071776cefd.svg',
        alt: 'site report builder',
        tooltipText: 'Site Report Builder',
        onClick: () => alert('you clicked icon 3'),
      },
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_my_locations_cb2b04bcdb.svg',
        alt: 'my locations',
        tooltipText: 'My Locations',
        onClick: () => alert('you clicked icon 1'),
      },
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_property_management_c3670eabae.svg',
        alt: 'property management',
        tooltipText: 'Property Management',
        onClick: () => alert('you clicked icon 3'),
      },
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_configuration_dea1631fd5.svg',
        alt: 'configuration',
        tooltipText: 'Configuration',
        onClick: () => alert('you clicked icon 3'),
      },
      {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_help_f76515d0b1.svg',
        alt: 'help',
        onClick: () => alert('you clicked help'),
        tooltipText: 'Support',
      },
    ],
  },

  // PLACEHOLDER
  // src: 'https://via.assets.so/img.jpg?w=20&h=20&tc=black&bg=yellow&t=P',

  render: (args) => {
    return (
      <div className="w-[450px] h-[630px] bg-slate-500 relative flex flex-col">
        <NavbarMobile {...args} />
        <div className="flex-grow overflow-auto relative z-0">
          <div className="h-96 w-full bg-green-500 grid place-items-center">
            Try Scrolling screen to see
          </div>
          <div className="h-96 w-full bg-yellow-500" />
        </div>
      </div>
    )
  },
}
