import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { TabsProps } from './tabs.types'
import { TabsVariants, TabTriggerVariants } from './tabs.styles'

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof TabsVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(TabsVariants({ variant, size, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof TabsVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TabTriggerVariants({ variant, size, className }))}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  ({
    className,
    defaultValue,
    tabList,
    onTabChange,
    variant,
    size,
    value,
    id,
    disabled,
    ...props
  }) => (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={onTabChange}
      className={cn(className, disabled ? 'cursor-not-allowed' : '')}
      value={value}
      id={id}
    >
      <TabsList style={props.style} variant={variant} size={size}>
        {tabList.map((tab, index) => {
          return (
            <TabsTrigger
              key={index}
              value={tab.value}
              variant={variant}
              size={size}
              className="flex gap-1.5 items-center justify-center"
              disabled={disabled}
            >
              <React.Fragment>
                {tab?.icon && typeof tab?.icon == 'string' && (
                  <img
                    src={tab.icon as string}
                    alt="icon"
                    className="w-4 h-4 filter hue-rotate-45"
                    style={{ display: tab.icon ? 'block' : 'none' }}
                  />
                )}
                {tab.icon && typeof tab.icon !== 'string' && tab.icon && (
                  <tab.icon size={16} />
                )}
                {tab.label}
              </React.Fragment>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </TabsPrimitive.Root>
  )
)

export { Tabs, TabsContent }
