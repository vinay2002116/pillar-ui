import * as React from 'react'

import {
  SplitButtonDropdownVariants,
  SplitButtonVariants,
  TitleVariants,
} from './split-button.styles'
import { SplitButtonProps } from './split-button.types'
import { ChevronDown, Loader2 } from 'lucide-react'
import { Typography } from '../../atoms/typography'
import { cn } from '@/lib/utils'
import { Dropdown } from '../dropdown-menu/dropdown-menu'

const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    {
      variant,
      size,
      title,
      prefixIcon,
      loading,
      id,
      disabled,
      optionGroups = [],
      ...props
    },
    ref
  ) => {
    const trigger = (
      <button
        aria-haspopup="true"
        disabled={disabled || loading}
        className={cn(SplitButtonDropdownVariants({ variant, size }), 'group')}
      >
        <ChevronDown className="group-data-[state=open]:rotate-180 duration-300" />
      </button>
    )

    return (
      <div className="flex items-center justify-center select-none">
        <button
          className={cn(SplitButtonVariants({ variant, size }))}
          id={id}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait...
            </>
          ) : title ? (
            <div className="flex items-center">
              {prefixIcon}
              <Typography
                className={cn(TitleVariants({ titleSize: size }))}
                variant={'body1'}
              >
                {title}
              </Typography>
            </div>
          ) : (
            props.children
          )}
        </button>
        <Dropdown header="" trigger={trigger} optionGroups={optionGroups} />
      </div>
    )
  }
)

SplitButton.displayName = 'SplitButton'

export { SplitButton, SplitButtonVariants }
