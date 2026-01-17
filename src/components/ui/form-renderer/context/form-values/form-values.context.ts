// contexts/FormValuesContext.tsx
import { createContext, useContext } from 'react'
import {
  AssetValue,
  FormField,
  FormFieldValue,
  FormStep,
  FormValues,
  onToggleImageEditor,
} from '../../form.types'

interface FormValuesContextType {
  values: FormValues
  errors: Record<string, string>
  setValue: (fieldId: string, value: FormFieldValue) => void
  setFormValues: (formValues: FormValues) => void
  validateField: (field: FormField) => {
    isValid: boolean
    errorMessage: string
  }
  validateStep: (step: FormStep) => {
    isStepValid: boolean
    errors: Record<string, string>
  }
  submitForm: () => void
  onAssetUpload?: (file: File) => Promise<AssetValue>
  onToggleImageEditor?: onToggleImageEditor
}

export const FormValuesContext = createContext<FormValuesContextType | null>(
  null
)

export const useFormValues = () => {
  const context = useContext(FormValuesContext)
  if (!context) {
    throw new Error('useFormValues must be used within a FormValuesProvider')
  }
  return context
}
