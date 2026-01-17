import { useState } from 'react'
import { StepperValue } from './stepper.type'
import { StepItemStatus } from './stepper.type'
const useStepper = (initialSteps: StepperValue[]) => {
  //NOTE: initialSteps is the initial value of the steps
  const initialValue = JSON.parse(
    JSON.stringify(initialSteps)
  ) as StepperValue[]
  // State to manage the steps
  const [steps, setSteps] = useState(initialValue)

  // Function to move to the next step
  const nextStep = () => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps]
      const currentIndex = newSteps.findIndex(
        (step) => step.status === StepItemStatus.CURRENT
      )

      if (currentIndex !== -1) {
        newSteps[currentIndex].status = StepItemStatus.COMPLETED
        if (currentIndex < newSteps.length - 1) {
          newSteps[currentIndex + 1].status = StepItemStatus.CURRENT
        }
      }

      return newSteps
    })
  }

  // fucntion to move to the previous step
  const previousStep = () => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps]
      const currentIndex = newSteps.findIndex((step) => {
        return (
          step.status === StepItemStatus.CURRENT ||
          (prevSteps[prevSteps.length - 1].id == step?.id &&
            step.status == StepItemStatus.COMPLETED)
        )
      })

      if (currentIndex !== -1 && currentIndex > -1) {
        newSteps[currentIndex].status = StepItemStatus.PENDING
        if (currentIndex == 0) {
          newSteps[currentIndex].status = StepItemStatus.CURRENT
        } else {
          newSteps[currentIndex - 1].status = StepItemStatus.CURRENT
        }
      }

      return newSteps
    })
  }

  // Function to reset the steps
  const resetSteps = () => {
    setSteps(initialValue)
  }

  return {
    steps,
    nextStep,
    resetSteps,
    previousStep,
  }
}

export { useStepper }
