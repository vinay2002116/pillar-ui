import { StepperProvider, StepGroup } from './stepper-components'
import { StepperProps } from './stepper.type'
import { useStepper } from './use-stepper'
import * as React from 'react'

const Stepper = ({ value, id }: StepperProps) => {
  return (
    <>
      <StepperProvider steps={value} id={id}>
        <StepGroup />
      </StepperProvider>
    </>
  )
}

Stepper.displayName = 'Stepper'

export { Stepper, useStepper }
