import * as React from 'react'

import { cn } from '@/lib/utils'
import { InputProps } from './input.types'
import { InputVariants } from './input.styles'
import { Typography } from '../typography'
import { XCircle } from 'lucide-react'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, isError, message, prefix, suffix, id, ...props },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || innerRef
    const [isFocused, setIsFocused] = React.useState(false)

    React.useEffect(() => {
      if (isFocused) {
        inputRef.current?.focus()
      }
    }, [isFocused])
    return (
      <>
        <div
          className={cn(
            InputVariants({
              isError,
              isFocused,
              disabled: props.disabled,
              className,
            })
          )}
          id={id}
        >
          {prefix && (
            <div
              onClick={() => {
                setIsFocused(true)
              }}
            >
              {prefix}
            </div>
          )}

          <input
            type={type}
            className={`outline-0 w-full h-full disabled:bg-transparent disabled:cursor-not-allowed outline-none`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            {...props}
          ></input>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              if (suffix) {
                setIsFocused(true)
                return
              }
            }}
          >
            {suffix ?? (
              <div
                className={`${!isFocused ? 'opacity-0' : ''} hover:opacity-100`}
                onClick={() => {
                  if (props.onChange)
                    props.onChange({
                      target: { value: '' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  inputRef.current?.focus()
                }}
              >
                <XCircle size={16} className="stroke-light-2" />
              </div>
            )}
          </div>
        </div>

        {message && (
          <Typography
            variant={'body2'}
            className={`${isError ? 'text-danger-1' : 'text-light-3'} mt-1.5`}
          >
            {message}
          </Typography>
        )}
      </>
    )
  }
)
Input.displayName = 'Input'

export { Input }
