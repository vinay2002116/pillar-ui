// types/form.types.ts

import { FormFieldType } from './form.enums'

// Base field properties shared by all variants
interface BaseFormField {
  id: string
  name: string
  required: boolean
  placeholder?: string
}

// Text input fields
interface StringField extends BaseFormField {
  type: FormFieldType.EMAIL | FormFieldType.SHORT_TEXT | FormFieldType.LONG_TEXT
}

// Number fields
interface NumberField extends BaseFormField {
  type:
    | FormFieldType.NUMBER
    | FormFieldType.MOBILE_NUMBER
    | FormFieldType.DATE_PICKER
}

// Single selection fields
interface SingleComboboxField extends BaseFormField {
  type: FormFieldType.SINGLE_COMBOBOX
  options: string[]
}

// Multi selection fields
interface MultiComboboxField extends BaseFormField {
  type: FormFieldType.MULTI_COMBOBOX
  options: string[]
}

// Radio group field
interface RadioGroupField extends BaseFormField {
  type: FormFieldType.RADIO_GROUP
  options: string[]
}

// Checkbox group field
interface CheckboxGroupField extends BaseFormField {
  type: FormFieldType.CHECKBOX_GROUP
  options: string[]
}

// Radio group with optional input
interface RadioGroupWithInputField extends BaseFormField {
  type: FormFieldType.RADIO_GROUP_WITH_OPTIONAL_INPUT
  options: string[]
  inputFieldPlaceholder: string
  inputTriggerOptionValue: string
}

// Image upload fields
interface ImageUploadField extends BaseFormField {
  type: FormFieldType.SINGLE_IMAGE_PICKER
  // acceptedFileTypes?: string[] // e.g. ['.jpg', '.png']
  // maxFileSize?: number // in bytes
}

// Multi image upload fields
interface MultiImageUploadField extends BaseFormField {
  type: FormFieldType.MULTI_IMAGE_PICKER
  max_items?: number
}

// Taggable Image upload fields
interface TaggableImageUploadField extends BaseFormField {
  type: FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER
  options: string[]
  max_items?: number
  // acceptedFileTypes?: string[] // e.g. ['.jpg', '.png']
  // maxFileSize?: number // in bytes
}

interface TaggableImageUploadFieldWithInput extends BaseFormField {
  type: FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER_WITH_INPUT
  max_items?: number
  // acceptedFileTypes?: string[] // e.g. ['.jpg', '.png']
  // maxFileSize?: number // in bytes
}

// Video upload fields
interface VideoUploadField extends BaseFormField {
  type: FormFieldType.SINGLE_VIDEO_PICKER
  // acceptedFileTypes?: string[] // e.g. ['.mp4', '.mov']
  // maxFileSize?: number // in bytes
}

// Multi video upload fields
interface MultiVideoUploadField extends BaseFormField {
  type: FormFieldType.MULTI_VIDEO_PICKER
  max_items?: number
  // acceptedFileTypes?: string[] // e.g. ['.mp4', '.mov']
  // maxFileSize?: number // in bytes
}
// Video link field
interface VideoLinkField extends BaseFormField {
  type: FormFieldType.SINGLE_VIDEO_PICKER_WITH_INPUT
  placeholder?: string
}

// Repeatable Group fields
export interface RepeatableGroupField extends BaseFormField {
  type: FormFieldType.REPEATABLE_GROUP_FIELD
  options: FormField[]
}

// Combined type using union
export type FormField =
  | StringField
  | NumberField
  | SingleComboboxField
  | MultiComboboxField
  | RadioGroupField
  | RadioGroupWithInputField
  | CheckboxGroupField
  | ImageUploadField
  | MultiImageUploadField
  | VideoUploadField
  | MultiVideoUploadField
  | RepeatableGroupField
  | TaggableImageUploadField
  | VideoLinkField
  | TaggableImageUploadFieldWithInput

// Keep your other interfaces as they were
export interface FormSection {
  id: string
  name: string
  fields: FormField[]
}

export interface FormStep {
  id: string
  // step: number
  name: string
  sections: FormSection[]
}

export interface FormStructure {
  steps: FormStep[]
  values?: FormValues
}

export interface AssetValue {
  private_url: string
  public_url: string
  original_private_url?: string
}

export interface RadioGroupWithInputFieldValue {
  radio_value: string
  input_value: string
}

export interface TaggableAssetValue extends AssetValue {
  tag: string
}

export type FormFieldValue =
  | string
  | number
  | AssetValue
  | AssetValue[]
  | TaggableAssetValue[]
  | RadioGroupWithInputFieldValue
  | undefined

export interface FormValues {
  [key: string]: FormFieldValue
}

export interface OnNavigate {
  (data: {
    currentStepIndex: number
    totalSteps: number
    isFirstStep: boolean
    isLastStep: boolean
    values: FormValues
  }): void
}

export type OnReplaceImage = (image: AssetValue, index: number) => void

export type onToggleImageEditor = (options: {
  imageUrl: string
  index: number
  onReplaceImage: OnReplaceImage
}) => void
