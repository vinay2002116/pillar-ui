import * as React from 'react'

import { cn } from '@/lib/utils'
import { AnimatedInputProps } from './animated-input.types'
import {
  AnimatedInputContainerVariants,
  DynamicComponentStyles,
  AnimatedInputStyles,
} from './animated-input.styles'
import { Typography } from '../../atoms/typography'
import { XCircle } from 'lucide-react'

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    {
      className,
      type,
      isError,
      message,
      prefix,
      suffix,
      id,
      placeholder = '',
      placeholders = [],
      value = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const combinedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef
    const [isFocused, setIsFocused] = React.useState(false)
    const [index, setIndex] = React.useState(0)
    const [animate, setAnimate] = React.useState(false)

    React.useEffect(() => {
      if (placeholders.length === 0 || isFocused || value.toString().length > 0)
        return

      const interval = setInterval(() => {
        setAnimate(false)
        setIndex((prevIndex) => (prevIndex + 1) % placeholders.length)
        setAnimate(true)
      }, 2000)

      return () => clearInterval(interval)
    }, [placeholders.length, isFocused, value])

    const clearInput = () => {
      onChange?.({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
    }

    return (
      <>
        <div
          className={cn(
            AnimatedInputContainerVariants({
              isError,
              isFocused,
              disabled: props.disabled,
              className,
            })
          )}
          id={id}
          style={{ overflow: 'hidden' }}
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

          <div className="h-[38px] w-full relative ">
            <input
              type={type}
              className={cn(AnimatedInputStyles({ isError }))}
              placeholder={
                isFocused ? 'What are you searching for?' : placeholder
              }
              onFocus={() => {
                setIsFocused(true)
                setAnimate(false)
              }}
              onBlur={() => setIsFocused(false)}
              ref={combinedRef}
              value={value}
              onChange={(e) => onChange?.(e)}
            />

            {/* Dynamic placeholder animation shown when input is not focused and empty */}
            {!isFocused && value.toString().length === 0 && (
              <>
                <div
                  key={`placeholder-${index}-${animate}`}
                  className={cn(DynamicComponentStyles({ animate }))}
                  style={{
                    left: `${placeholder.length * 0.92}ch`,
                    animation: animate
                      ? 'animatedInputMiddleToTop 0.6s forwards'
                      : 'none',
                    opacity: animate ? 1 : 0,
                  }}
                >
                  {placeholders[index]}
                </div>

                <div
                  key={`next-placeholder-${(index + 1) % placeholders.length}-${animate}`}
                  className={cn(DynamicComponentStyles({ animate }))}
                  style={{
                    left: `${placeholder.length * 0.92}ch`,
                    animation: animate
                      ? 'animatedInputFadeInBottom 1.5s forwards 0.2s'
                      : 'none',
                    opacity: animate ? 0 : 1,
                  }}
                >
                  {placeholders[(index + 1) % placeholders.length]}
                </div>
              </>
            )}
          </div>

          {/* Optional suffix element (or clear button) displayed after input */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => suffix && setIsFocused(true)}
          >
            {suffix ? (
              <div className="flex items-center">{suffix}</div>
            ) : (
              <div
                className={!isFocused ? 'opacity-0' : ''}
                onClick={clearInput}
              >
                <XCircle size={16} className="stroke-light-2" />
              </div>
            )}
          </div>
        </div>

        {/* Optional message displayed below the input */}
        {message && (
          <Typography
            variant="body2"
            className={`${isError ? 'text-danger-1' : 'text-light-3'} mt-1.5`}
          >
            {message}
          </Typography>
        )}
      </>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

export { AnimatedInput }
