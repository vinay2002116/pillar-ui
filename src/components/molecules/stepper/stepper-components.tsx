import React, {
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { StepItemStatus, StepperItemProps, StepperValue } from './stepper.type'
import { Typography } from '../../atoms/typography'
import { cn } from '@/lib/utils'
import { StepItemVariants } from './stepper.styles'

interface StepperProviderProps extends PropsWithChildren {
  steps: StepperValue[] // Add a steps prop to pass the steps array
  id?: string
}

const StepperContext = createContext<StepperValue[] | null>(null) // Context will hold an array of strings

const StepperProvider = forwardRef<HTMLDivElement, StepperProviderProps>(
  ({ children, steps, id }, ref) => {
    return (
      <StepperContext.Provider value={steps}>
        <div className={'w-[100%]'} ref={ref} id={id}>
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)

const StepGroup = () => {
  const steps = useContext(StepperContext) // Accessing the steps array from context

  return (
    <div className="flex justify-between items-center w-[100%]">
      {steps?.map((step, index) => (
        <>
          <StepItem
            key={index}
            value={step}
            variant={step?.status ?? StepItemStatus.PENDING}
          />
          {index !== steps.length - 1 && (
            <div
              className={` w-5 grow border-b-2 ${step?.status == StepItemStatus.COMPLETED ? 'border-primary-2' : 'border-neutral-2'}`}
            />
          )}
        </>
      ))}
    </div>
  )
}

// individual step item and styles
const StepItem = ({ value, ...props }: StepperItemProps) => {
  const { variant } = props
  return (
    <div className={cn(StepItemVariants({ variant }))}>
      {variant !== StepItemStatus.COMPLETED ? (
        <Typography
          variant={'body4'}
          style={{ textAlign: 'center', height: 'max-content' }}
        >
          {value?.label}
        </Typography>
      ) : (
        <>
          <div>
            <img
              src="https://frontend-static-files.geoiq.io/strapi/check_white_e0c342eeb9.svg"
              alt="check-mark-icon"
            />
          </div>
        </>
      )}
    </div>
  )
}

export { StepperProvider, StepperContext, StepGroup }
