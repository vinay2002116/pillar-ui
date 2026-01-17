import * as React from 'react'

import { Button } from '@/components/atoms/button'
import { useStepper } from './use-stepper'
import { Stepper } from './stepper'
import { StepperProps } from './stepper.type'

export const StepperContainer = ({ value, id }: StepperProps) => {
  const { steps, nextStep, previousStep, resetSteps } = useStepper(value)

  return (
    <div className="w-[30rem] flex flex-col gap-4">
      <Stepper value={steps} id={id}></Stepper>
      <div className="flex gap-2">
        <Button
          variant={'secondary'}
          onClick={previousStep}
          style={{ minWidth: '3rem' }}
        >
          Prev
        </Button>
        <Button
          variant={'secondary'}
          onClick={nextStep}
          style={{ minWidth: '3rem' }}
        >
          Next
        </Button>

        <Button
          variant={'secondary'}
          onClick={resetSteps}
          style={{ minWidth: '3rem' }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
