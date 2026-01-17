// contexts/FormStructureContext.tsx
import { createContext, useContext } from 'react'
import { FormStructure, FormStep } from '../../form.types'

interface FormStructureContextType {
  structure: FormStructure
  currentStepIndex: number
  currentStep: FormStep
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (stepIndex: number) => void
  isFirstStep: boolean
  isLastStep: boolean
  totalSteps: number
}

export const FormStructureContext =
  createContext<FormStructureContextType | null>(null)

export const useFormStructure = () => {
  const context = useContext(FormStructureContext)
  if (!context) {
    throw new Error(
      'useFormStructure must be used within a FormStructureProvider'
    )
  }
  return context
}
