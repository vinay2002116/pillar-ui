import React from 'react'
import { useRanger, Ranger } from '@tanstack/react-ranger'
import { cn } from '@/lib/utils'
import { RangeSliderProps } from './range-slider.types'

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value = [0, 100], // Default min & max values
  min = 0,
  max = 100,
  stepSize = 5,
  onChange,
  id,
}) => {
  const rangerRef = React.useRef<HTMLDivElement>(null)

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values: value,
    min,
    max,
    stepSize,
    onChange: (instance: Ranger<HTMLDivElement>) => {
      onChange?.(instance.sortedValues as [number, number])
    },
    onDrag: (instance: Ranger<HTMLDivElement>) => {
      const newValues = instance.sortedValues as [number, number]

      // fn. call being made on every single value drag, hence limited to only first value
      if (newValues[0] !== value[0] || newValues[1] !== value[1]) {
        onChange?.(newValues)
      }
    },
  })

  return (
    <div className="relative w-full">
      <div
        ref={rangerRef}
        className="relative flex w-full h-2 rounded bg-light-4"
        id={id}
      >
        {/* Active Track */}
        <div
          className={cn('absolute h-full rounded bg-rest-p1')}
          style={{
            left: `${rangerInstance.getPercentageForValue(value[0])}%`,
            width: `${Math.max(
              0,
              rangerInstance.getPercentageForValue(value[1]) -
                rangerInstance.getPercentageForValue(value[0])
            )}%`,
          }}
        />

        {/* Handles */}
        {rangerInstance
          .handles()
          .map(
            (
              { value, onKeyDownHandler, onMouseDownHandler, onTouchStart },
              i
            ) => (
              <button
                key={i}
                onKeyDown={onKeyDownHandler}
                onMouseDown={onMouseDownHandler}
                onTouchStart={onTouchStart}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                className="flex absolute justify-center items-center cursor-pointer top-1/2 w-[20px] h-[20px] outline-none bg-white"
                style={{
                  left: `${rangerInstance.getPercentageForValue(value)}%`,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '100%',
                  boxShadow:
                    '0px 0px 15px 0px #0000000D, 0px 4px 4px 0px #0000000D',
                }}
              >
                {/* Inner colored indicator */}
                <div className="w-2 h-2 rounded-full bg-rest-p1" />
              </button>
            )
          )}
      </div>
    </div>
  )
}
