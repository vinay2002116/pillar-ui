// components/FormStep.tsx
import React from 'react'
import { FormSection } from './form-section'
import { useFormStructure } from '../context/form-structure'
import { Typography } from '@/components/atoms/typography'

export const FormStep: React.FC = () => {
  const { currentStep, totalSteps, currentStepIndex } = useFormStructure()

  return (
    <section className="flex flex-col gap-4 flex-1 overflow-scroll pb-16  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="flex flex-col gap-1">
        <Typography variant="h2">{currentStep.name}</Typography>
        <Typography variant="h3" className="text-light-3">
          Step {currentStepIndex + 1} of {totalSteps}
        </Typography>
      </div>
      <div className="border-b border-light-1" />
      {currentStep.sections.map((section) => (
        <FormSection key={section.id} section={section} />
      ))}
    </section>
  )
}
