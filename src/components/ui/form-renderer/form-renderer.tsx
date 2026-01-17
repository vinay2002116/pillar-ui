// components/FormRenderer.tsx
import React from 'react'
import { FormStep } from './components/form-step'
import { FormNavigation } from './components/form-navigation'
import { FormValuesProvider } from './context/form-values'
import { FormStructureProvider } from './context/form-structure'
import {
  AssetValue,
  FormStructure,
  FormValues,
  onToggleImageEditor,
  OnNavigate,
} from './form.types'
import { FormReadOnlyView } from './components/form-read-only-view'

export interface FormRendererProps {
  structure: FormStructure
  initialValues?: FormValues
  onSubmit?: (values: FormValues) => void
  onAssetUpload?: (file: File) => Promise<AssetValue>
  readOnly?: boolean
  onGoToNextStep?: OnNavigate
  onGoToPreviousStep?: OnNavigate
  onToggleImageEditor?: onToggleImageEditor
  isSubmitting?: boolean
  testMode?: boolean
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  structure,
  initialValues = {},
  onSubmit,
  onAssetUpload,
  readOnly = false,
  onGoToNextStep,
  onGoToPreviousStep,
  onToggleImageEditor,
  isSubmitting = false,
  testMode = false,
}) => {
  if (readOnly) {
    return <FormReadOnlyView structure={structure} values={initialValues} />
  }

  return (
    <FormStructureProvider structure={structure}>
      <FormValuesProvider
        initialValues={initialValues}
        onSubmit={onSubmit}
        onAssetUpload={onAssetUpload}
        onToggleImageEditor={onToggleImageEditor}
      >
        <div id={'form-renderer'} className=" flex flex-col h-full ">
          <FormStep />
          <FormNavigation
            isSubmitting={isSubmitting}
            onGoToNextStep={onGoToNextStep}
            onGoToPreviousStep={onGoToPreviousStep}
            testMode={testMode}
          />
        </div>
      </FormValuesProvider>
    </FormStructureProvider>
  )
}
