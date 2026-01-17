import React, { useState } from 'react'
import {
  AssetValue,
  FormField,
  FormFieldValue,
  FormStep,
  FormValues,
  RadioGroupWithInputFieldValue,
  TaggableAssetValue,
  onToggleImageEditor,
} from '../../form.types'
import { FormValuesContext } from './form-values.context'
import { FormFieldType } from '../../form.enums'

export const FormValuesProvider: React.FC<{
  children: React.ReactNode
  initialValues?: FormValues
  onSubmit?: (values: FormValues) => void
  onAssetUpload?: (file: File) => Promise<AssetValue>
  onToggleImageEditor?: onToggleImageEditor
}> = ({
  children,
  initialValues = {},
  onSubmit,
  onAssetUpload,
  onToggleImageEditor,
}) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // to update field value
  const setValue = (fieldId: string, value: FormFieldValue) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }))
    // Clear error when value changes
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  // to update state all at once
  const setFormValues = (newValues: FormValues) => {
    setValues(() => newValues)
  }

  /**
   * Validates a field based on its type
   * @param field - The field object with all properties
   * @returns Object containing validation status and error message
   */
  const validateField = (
    field: FormField
  ): { isValid: boolean; errorMessage: string } => {
    // Special handling for repeatable groups, Since values[field.id] wont exist for repeatable groups
    if (field.type === FormFieldType.REPEATABLE_GROUP_FIELD) {
      const prefix = `${field.id}||`
      // find all the keys that start with the prefix inside values
      const keys = Object.keys(values).filter((key) => key.startsWith(prefix))

      // if there are no keys, return invalid, since the field is required
      if (keys.length === 0) {
        return { isValid: false, errorMessage: 'This field is required' }
      }

      // loop through all the keys and validate each field if it is required using the same function validation field
      for (const key of keys) {
        const subField = field.options.find(
          (option) => option.id === key.split('||')[2]
        )

        const modifiedSubField = { ...subField, id: key }
        const { isValid, errorMessage } = validateField(
          modifiedSubField as FormField
        )
        if (!isValid) {
          return { isValid: false, errorMessage }
        }
      }

      // if all the fields are valid, return valid
      return { isValid: true, errorMessage: '' }
    }

    // For normal fields, proceed with regular validation
    const value = values[field.id]

    // Common check for undefined/null values for all required fields
    if (field.required && (value === undefined || value === null)) {
      return { isValid: false, errorMessage: 'This field is required' }
    }

    // If not required and no value, it's valid
    if (
      !field.required &&
      (value === undefined || value === null || value === '')
    ) {
      return { isValid: true, errorMessage: '' }
    }

    // Type-specific validation
    switch (field.type) {
      // Text fields
      case FormFieldType.SHORT_TEXT:
      case FormFieldType.LONG_TEXT:
      case FormFieldType.SINGLE_VIDEO_PICKER_WITH_INPUT:
        if (value === '') {
          return { isValid: false, errorMessage: 'This field cannot be empty' }
        }
        break

      case FormFieldType.EMAIL:
        if (value === '') {
          return { isValid: false, errorMessage: 'Email is required' }
        }
        // Basic email validation regex
        if (!/^\S+@\S+\.\S+$/.test(value as string)) {
          return {
            isValid: false,
            errorMessage: 'Please enter a valid email address',
          }
        }
        break

      // Number fields
      case FormFieldType.NUMBER:
        if (value === '') {
          return { isValid: false, errorMessage: 'Number is required' }
        }
        // Check if it's actually a number
        if (isNaN(Number(value))) {
          return { isValid: false, errorMessage: 'Please enter a valid number' }
        }
        break

      case FormFieldType.MOBILE_NUMBER:
        if (value === '') {
          return { isValid: false, errorMessage: 'Mobile number is required' }
        }
        // Mobile number validation
        if (!/^\d{10,15}$/.test((value as string).replace(/\D/g, ''))) {
          return {
            isValid: false,
            errorMessage: 'Please enter a valid mobile number',
          }
        }
        break

      case FormFieldType.DATE_PICKER:
        if (!value || value === '') {
          return { isValid: false, errorMessage: 'Date is required' }
        }
        break

      // Selection fields
      case FormFieldType.SINGLE_COMBOBOX:
        if (!value || value === '') {
          return { isValid: false, errorMessage: 'Please select an option' }
        }
        break

      case FormFieldType.MULTI_COMBOBOX:
        // Could be array or comma-separated string depending on implementation
        if (Array.isArray(value)) {
          if (value.length === 0) {
            return {
              isValid: false,
              errorMessage: 'Please select at least one option',
            }
          }
        } else if (typeof value === 'string') {
          if (!value || value.split(',').filter(Boolean).length === 0) {
            return {
              isValid: false,
              errorMessage: 'Please select at least one option',
            }
          }
        }
        break

      case FormFieldType.CHECKBOX_GROUP:
      case FormFieldType.RADIO_GROUP:
        if (!value || value === '') {
          return { isValid: false, errorMessage: 'Please select an option' }
        }
        break

      case FormFieldType.RADIO_GROUP_WITH_OPTIONAL_INPUT: {
        const radioValue = value as RadioGroupWithInputFieldValue
        if (!radioValue || !radioValue.radio_value) {
          return { isValid: false, errorMessage: 'Please select an option' }
        }

        // If "Other" option is selected, check if input is provided
        if (
          radioValue.radio_value === field.inputTriggerOptionValue &&
          !radioValue.input_value
        ) {
          return {
            isValid: false,
            errorMessage:
              'Please provide additional information for your selection',
          }
        }
        break
      }

      // Media upload fields
      case FormFieldType.SINGLE_IMAGE_PICKER:
        if (!value || !(value as AssetValue).public_url) {
          return { isValid: false, errorMessage: 'Please upload an image' }
        }
        break

      case FormFieldType.SINGLE_VIDEO_PICKER:
        if (!value || !(value as AssetValue).public_url) {
          return { isValid: false, errorMessage: 'Please upload a video' }
        }
        break

      case FormFieldType.MULTI_IMAGE_PICKER:
        if (!Array.isArray(value) || value.length === 0) {
          return {
            isValid: false,
            errorMessage: 'Please upload at least one image',
          }
        }
        break

      case FormFieldType.MULTI_VIDEO_PICKER:
        if (!Array.isArray(value) || value.length === 0) {
          return {
            isValid: false,
            errorMessage: 'Please upload at least one video',
          }
        }
        break

      case FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER:
      case FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER_WITH_INPUT: {
        if (!Array.isArray(value) || value.length === 0) {
          return {
            isValid: false,
            errorMessage: 'Please upload at least one image',
          }
        }

        // Check if all uploaded images have tags assigned
        const taggedAssets = value as TaggableAssetValue[]
        const missingTags = taggedAssets.some((asset) => !asset.tag)
        if (missingTags) {
          return {
            isValid: false,
            errorMessage: 'Please add tags to all uploaded images',
          }
        }
        break
      }
    }

    // If we reach here, validation passed
    return { isValid: true, errorMessage: '' }
  }
  // New function to validate an entire step
  const validateStep = (
    step: FormStep
  ): { isStepValid: boolean; errors: Record<string, string> } => {
    let isStepValid = true
    const errors = {} as Record<string, string>
    const fieldIdTypeMap = {} as Record<string, FormField>

    // Collect all required field IDs from this step
    step.sections.forEach((section) => {
      section.fields.forEach((field) => {
        fieldIdTypeMap[field.id] = field
      })
    })

    // Validate each required field
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(fieldIdTypeMap).forEach(([_fieldId, field]) => {
      // Only validate required fields
      if (field.required) {
        // We can now pass the field type to a more specialized validation function
        const { isValid, errorMessage } = validateField(field)
        if (!isValid) {
          errors[field.id] = errorMessage
          isStepValid = false
        }
      }
    })

    return { isStepValid, errors }
  }

  const submitForm = () => {
    if (onSubmit) {
      onSubmit(values)
    }
  }

  const value = {
    values,
    errors,
    setValue,
    setFormValues,
    submitForm,
    onAssetUpload,
    validateField,
    validateStep,
    onToggleImageEditor,
  }

  return (
    <FormValuesContext.Provider value={value}>
      {children}
    </FormValuesContext.Provider>
  )
}
