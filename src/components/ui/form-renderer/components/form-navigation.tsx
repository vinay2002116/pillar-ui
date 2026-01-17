// components/FormNavigation.tsx
import React from 'react'
import { useFormValues } from '../context/form-values'
import { useFormStructure } from '../context/form-structure'
import { Button } from '@/components/atoms/button'
import { OnNavigate } from '../form.types'

interface FormNavigationProps {
  onGoToNextStep?: OnNavigate
  onGoToPreviousStep?: OnNavigate
  isSubmitting: boolean
  testMode?: boolean
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  onGoToNextStep,
  onGoToPreviousStep,
  isSubmitting,
  testMode = false,
}) => {
  const {
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    currentStep,
    currentStepIndex,
    totalSteps,
  } = useFormStructure()

  const { submitForm, validateStep, values } = useFormValues()

  const { isStepValid } = validateStep(currentStep)
  // const isStepValid = true

  const handleNextStep = () => {
    if (onGoToNextStep)
      onGoToNextStep({
        currentStepIndex,
        totalSteps,
        isFirstStep,
        isLastStep,
        values,
      })
    goToNextStep()
  }

  const handlePreviousStep = () => {
    if (onGoToPreviousStep)
      onGoToPreviousStep({
        currentStepIndex,
        totalSteps,
        isFirstStep,
        isLastStep,
        values,
      })
    goToPreviousStep()
  }

  return (
    <div className="w-full flex h-[5rem] items-center justify-center gap-3 border-t border-neutral-1 bg-light-2 px-3">
      <Button variant="secondary" onClick={handlePreviousStep}>
        {isFirstStep ? 'Cancel' : 'Back'}
      </Button>

      {isLastStep ? (
        <Button
          variant="primary"
          onClick={submitForm}
          disabled={!(isStepValid || testMode)}
          loading={isSubmitting}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={handleNextStep}
          disabled={!(isStepValid || testMode)}
        >
          Save & Next
        </Button>
      )}
    </div>
  )
}
