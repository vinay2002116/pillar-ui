import * as React from 'react'

import { cn } from '@/lib/utils'
import { Typography } from '@/index'
import { TextAreaVariants } from './textarea.styles'
import type { TextareaProps } from './textarea.types'

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, inputLabel, showTextCount, maximumTextCount, id, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useEffect(() => {
      if (isFocused) {
        inputRef.current?.focus()
      }
    }, [isFocused])
    return (
      <div id={id}>
        {inputLabel && (
          <Typography variant={'body4'} className={`text-light-3`}>
            {inputLabel}
          </Typography>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            TextAreaVariants({
              isFocused,
              disabled: props.disabled,
              className,
            })
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={ref}
          maxLength={maximumTextCount}
          {...props}
        />

        {showTextCount && (
          <Typography
            variant={'body4'}
            className={`text-light-4 mt-1.5 flex justify-end`}
          >
            {props.value?.toString().length}/{maximumTextCount}
          </Typography>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
