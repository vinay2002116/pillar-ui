/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { NavbarDesktop, NotificationPanel } from '..'
import { NotificationPanelProps } from '@/components/organisms/navbar/components/notification-panel/notification-panel.types'
// import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'organisms/Navbar Desktop',
  component: NavbarDesktop,
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
} satisfies Meta<typeof NavbarDesktop>

export default meta

type Story = StoryObj<typeof meta> & {
  args: {
    notificationPanel: NotificationPanelProps
  }
}

const Button: React.FC<React.PropsWithChildren> = ({ children }) => (
  <button className="bg-red">{children}</button>
)

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NavbarDesktopVariant: Story = {
  args: {
    credits: 108,

    logo: {
      src: 'https://frontend-static-files.geoiq.io/strapi/geoiq_logo_logo_a2abf034f4.svg',
      alt: 'GeoIQ Logo',
    },

    login: {
      isLoggedIn: true,
      onClick: () => alert('you clicked login'),
    },

    profile: {
      src: '',
      email: 'abc@xyz@mno.com',
      // name: 'John Doe',
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
                className="w-4 h-4 mr-2"
              />
            ),
            onClick: () => alert('you clicked logout'),
          },
        ],
      ],
    },

    icons: {
      list: [
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
      ],
      help: {
        src: 'https://frontend-static-files.geoiq.io/strapi/navbar_help_f76515d0b1.svg',
        alt: 'help',
        onClick: () => alert('you clicked help'),
        tooltipText: 'Support',
      },
      notification: {
        src: 'https://frontend-static-files.geoiq.io/strapi/icons_v5_7a02b6aa9f.svg',
        alt: 'help',
        onClick: () => alert('you clicked Notifications'),
        // tooltipText: 'Support',
      },
      chat: {
        alt: 'chat',
        src: 'https://frontend-static-files.geoiq.io/strapi/icons_v5_e611f73f9b/icons_v5_e611f73f9b.svg',
        onClick: () => alert('chat clicked'),
        tooltipText: 'chat',
      },
    },
    notificationPanel: {
      isOpen: false,
      onOpenChange: () => {},
      containerId: 'container',
      onReachScrollTop: () => {},
      notifications: [
        {
          action: {
            redirect_url:
              'https://retailiq.staging.geoiq.ai/in//site-report/42311',
            type: 'redirect',
          },
          description:
            'Test on 24 March @Om Prakashh #Market Landscape message @ 02.34 pm',
          id: 10634774,
          timestamp: '1742807341',
          title:
            'You were mentioned in report Raymond@12.9821469, 77.6378941 by Om ',
          user: {
            first_name: 'Om ',
            id: 63,
            last_name: 'Prakashh',
            profile_url:
              'gs://geoiq-retail-app-stg-v2/bdapp/62/7c09204f-1662-4a73-a872-6d12a0d5d3b3.png',
          },
        },
        {
          action: {
            redirect_url:
              'https://retailiq.staging.geoiq.ai/in//site-report/42311',
            type: 'redirect',
          },
          description:
            'Test on 24 March @Om Prakashh #Market Landscape message @ 02.34 pm',
          id: 10634773,
          timestamp: '1742807141',
          title:
            'You were mentioned in report Raymond@12.9821469, 77.6378941 by Om ',
          user: {
            first_name: 'Om ',
            id: 63,
            last_name: 'Prakashh',
            profile_url:
              'gs://geoiq-retail-app-stg-v2/bdapp/62/7c09204f-1662-4a73-a872-6d12a0d5d3b3.png',
          },
        },
        {
          action: {
            redirect_url:
              'https://retailiq.staging.geoiq.ai/in//site-report/42311',
            type: 'redirect',
          },
          description:
            '#Catchment Potential there is some data issue @Om Prakashh',
          id: 10634772,
          timestamp: '1742804936',
          title:
            'You were mentioned in report Raymond@12.9821469, 77.6378941 by Om ',
          user: {
            first_name: 'Om ',
            id: 63,
            last_name: 'Prakashh',
            profile_url:
              'gs://geoiq-retail-app-stg-v2/bdapp/62/7c09204f-1662-4a73-a872-6d12a0d5d3b3.png',
          },
        },
      ],
      isLoading: false,
      hasMore: false,
      nextPage: () => {},
    },
  },

  // PLACEHOLDER
  // src: 'https://via.assets.so/img.jpg?w=20&h=20&tc=black&bg=yellow&t=P',

  render: (args) => {
    const [isNotificationPanelOpen, setIsNotificationPanelOpen] =
      React.useState(false)
    return (
      <div className="h-[650px]">
        <NavbarDesktop
          logo={args.logo}
          login={args.login}
          profile={args.profile}
          credits={args.credits}
          icons={{
            list: args.icons.list,
            chat: args.icons.chat,
            help: args.icons.help,
            notification: {
              src: args.icons.notification?.src || '',
              alt: args.icons.notification?.alt || '',
              onClick: () => {
                setIsNotificationPanelOpen(!isNotificationPanelOpen)
              },
              wrapper: (children: any) => {
                return (
                  <>
                    <NotificationPanel
                      isOpen={isNotificationPanelOpen}
                      onOpenChange={() =>
                        setIsNotificationPanelOpen(!isNotificationPanelOpen)
                      }
                      containerId={
                        (args as any)?.notificationPanel?.containerId
                      }
                      notifications={
                        (args as any)?.notificationPanel?.notifications
                      }
                      isLoading={(args as any)?.notificationPanel?.isLoading}
                      hasMore={(args as any)?.notificationPanel?.hasMore}
                      nextPage={(args as any)?.notificationPanel?.nextPage}
                      onReachScrollTop={() => {}}
                    />
                    {children}
                  </>
                )
              },
            },
          }}
        />
      </div>
    )
  },
}
