import { cn } from '@/lib/utils'
import { Ranger, useRanger } from '@tanstack/react-ranger'
import React from 'react'
import { SliderBgColorVariants } from './polar-slider.styles'
import { PolarSliderProps } from './polar-slider.types'

const SegmentCaseNormal = ({ left = 0, width = 0, index = -1 }) => (
  <div
    className={cn(
      'absolute h-full rounded',
      SliderBgColorVariants({ bgColor: index === 0 ? 'success' : 'stroke' })
    )}
    style={{
      left: `${left}%`,
      width: `${width}%`,
    }}
    key={index}
  />
)

const SegmentCaseNegative = ({ width = 0, index = -1 }) => {
  if (index === 0) {
    const reducedWidth = width >= 50 ? 50 : width
    const width1 = reducedWidth
    const width2 = 50 - reducedWidth

    return (
      <>
        <div
          className={cn(
            'absolute h-full rounded-l',
            SliderBgColorVariants({ bgColor: 'stroke' })
          )}
          style={{
            left: `${0}%`,
            width: `${width1}%`,
          }}
        />
        <div
          className={cn(
            'absolute h-full',
            SliderBgColorVariants({ bgColor: 'danger' })
          )}
          style={{
            left: `${width1}%`,
            width: `${width2}%`,
          }}
        />
      </>
    )
  } else if (index === 1) {
    const reducedWidth = width >= 50 ? 0 : 50 - width
    const width1 = reducedWidth
    const width2 = 50 - reducedWidth
    return (
      <>
        <div
          className={cn(
            'absolute h-full',
            SliderBgColorVariants({ bgColor: 'success' })
          )}
          style={{
            left: `${50}%`,
            width: `${width1}%`,
          }}
        />
        <div
          className={cn(
            'absolute h-full rounded-r',
            SliderBgColorVariants({ bgColor: 'stroke' })
          )}
          style={{
            left: `${50 + width1}%`,
            width: `${width2}%`,
          }}
        />
      </>
    )
  } else return null
}

const SegmentZeroDecorate = ({ show = false }) =>
  show ? (
    <div
      className={cn(
        'absolute h-full flex justify-center items-center w-1 left-1/2 right-1/2',
        SliderBgColorVariants({ bgColor: 'stroke' })
      )}
    >
      <div
        className={cn(
          'h-3/4 w-1/2',
          SliderBgColorVariants({ bgColor: 'stroke' })
        )}
      />
    </div>
  ) : null

export const PolarSlider: React.FC<PolarSliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  stepSize = 10,
  onChange,
  id,
}) => {
  const rangerRef = React.useRef<HTMLDivElement>(null)
  // const [values, setValues] = useState<ReadonlyArray<number>>([value])

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values: [value],
    min,
    max,
    stepSize,
    onDrag: (instance: Ranger<HTMLDivElement>) => {
      // fn. call being made on every single value drag, hence limited to only first value
      if (value !== instance.sortedValues[0]) {
        onChange?.(instance.sortedValues[0])
      }
    },
  })

  /*
   * The slider has different design for negative range values.
   */
  const negativeValueCase = min < 0

  /**
   * Ranger instance methods and properties:
   *    rangerInstance.activeHandleIndex
   */

  return (
    <div
      ref={rangerRef}
      className="relative flex w-full h-2"
      style={{
        // userSelect: 'none',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
      }}
      id={id}
    >
      {/* bar */}
      {rangerInstance
        .getSteps()
        .map(({ left, width }, index) =>
          negativeValueCase ? (
            <SegmentCaseNegative {...{ width, index }} key={index} />
          ) : (
            <SegmentCaseNormal {...{ left, width, index }} key={index} />
          )
        )}

      <SegmentZeroDecorate show={negativeValueCase} />

      {/* button */}
      {rangerInstance
        .handles()
        .map(
          (
            {
              value,
              onKeyDownHandler,
              onMouseDownHandler,
              onTouchStart,
              isActive,
            },
            i
          ) => (
            <div
              key={i}
              onKeyDown={onKeyDownHandler}
              onMouseDown={onMouseDownHandler}
              onTouchStart={onTouchStart}
              role="slider"
              aria-valuemin={rangerInstance.options.min}
              aria-valuemax={rangerInstance.options.max}
              aria-valuenow={value}
              className="flex absolute justify-center items-center cursor-pointer top-1/2 w-[18px] h-[18px] outline-none bg-white"
              style={{
                left: `${rangerInstance.getPercentageForValue(value)}%`,
                zIndex: isActive ? '1' : '0',
                transform: 'translate(-50%, -50%)',
                borderRadius: '100%',
                //   background: 'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
                //   border: 'solid 1px #888',
                boxShadow:
                  '0px 0px 15px 0px #0000000D, 0px 4px 4px 0px #0000000D',
              }}
            >
              <div
                className={cn(
                  'h-2 w-2 rounded-[50%]',
                  SliderBgColorVariants({
                    bgColor: value >= 0 ? 'success' : 'danger',
                  })
                )}
              />
            </div>
          )
        )}
    </div>
  )
}
