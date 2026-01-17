import React, { useState } from 'react'
import { FormStructureContext } from './form-structure.context'
import { FormStructure } from '../../form.types'

export const FormStructureProvider: React.FC<{
  children: React.ReactNode
  structure: FormStructure
}> = ({ children, structure }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const goToNextStep = () => {
    if (currentStepIndex < structure.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < structure.steps.length) {
      setCurrentStepIndex(stepIndex)
    }
  }

  const value = {
    structure,
    currentStepIndex,
    currentStep: structure.steps[currentStepIndex],
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === structure.steps.length - 1,
    totalSteps: structure.steps.length,
  }

  return (
    <FormStructureContext.Provider value={value}>
      {children}
    </FormStructureContext.Provider>
  )
}
