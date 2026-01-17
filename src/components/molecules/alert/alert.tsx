import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  AlertVariants,
  AlertButtonVariants,
  AlertContentVariants,
} from './alert.styles'
import { AlertProps } from './alert.types'
import { Button } from '@/components/atoms/button'
import { Typography } from '@/components/atoms/typography'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <Typography
    variant={'body4'}
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
  >
    {props.children}
  </Typography>
))
AlertDescription.displayName = 'AlertDescription'

const getImage = (variant: string | null | undefined) => {
  switch (variant) {
    case 'success':
      return 'https://frontend-static-files.geoiq.io/strapi/icons_v5_cbb854431a.svg'
    case 'warning':
      return 'https://frontend-static-files.geoiq.io/strapi/icons_v5_1_ba9b25fd5c.svg'
    case 'error':
      return 'https://frontend-static-files.geoiq.io/strapi/Frame_427320353_64f8f337a6.svg'
    case 'info':
      return 'https://frontend-static-files.geoiq.io/strapi/icons_v5_139132dbe2.svg'
    default:
      return 'https://frontend-static-files.geoiq.io/strapi/icons_v5_139132dbe2.svg'
  }
}

// Main Alert Component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      description,
      shortContent,
      title,
      id,
      showButton,
      buttonLabel,
      onButtonClick,
      ...props
    },
    ref
  ) => (
    <div
      id={id}
      ref={ref}
      role="alert"
      {...props} // ✅ Spreading remaining props but no unknown props like `showButton`
      className={cn(AlertVariants({ variant, shortContent }), className)}
    >
      <div className="flex h-full w-[20px] flex-shrink-0 flex-col items-start py-0">
        <img src={getImage(variant)} className="w-5 h-5" alt="Alert Icon" />
      </div>
      <div className={cn(AlertContentVariants({ shortContent }))}>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription className="flex items-center text-light-3">
          {description}
        </AlertDescription>

        {/* Render Button Conditionally */}
        {showButton && (
          <Button
            variant={'secondary'}
            size={'sm'}
            onClick={onButtonClick}
            className={cn(AlertButtonVariants({ shortContent }))}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  )
)

Alert.displayName = 'Alert'

export { Alert, AlertVariants }
