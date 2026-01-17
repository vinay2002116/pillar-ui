// components/form-readonly-view.tsx
import React, { ReactNode } from 'react'
import {
  FormStructure,
  FormValues,
  FormField,
  FormFieldValue,
  AssetValue,
  TaggableAssetValue,
  RadioGroupWithInputFieldValue,
} from './../form.types'
import { Typography } from '@/components/atoms/typography'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Accordion } from '@/components/atoms/accordion'
import { Badge } from '@/components/atoms/badge'

import { FormFieldType } from '../form.enums'

interface FormReadOnlyViewProps {
  structure: FormStructure
  values: FormValues
}

export const FormReadOnlyView: React.FC<FormReadOnlyViewProps> = ({
  structure,
  values,
}) => {
  // Helper function to render field value based on type
  const renderFieldValue = (
    field: FormField,
    value: FormFieldValue
  ): ReactNode => {
    // Special handling for repeatable groups, Since values[field.id] wont exist for repeatable groups

    if (field.type === FormFieldType.REPEATABLE_GROUP_FIELD) {
      const prefix = `${field.id}||`
      const entryIndices = new Set<number>()

      // Extract unique entry indices from the keys present in `values`
      Object.keys(values).forEach((key) => {
        if (key.startsWith(prefix)) {
          // Regex to capture the index part: field.id||INDEX||subfield.id
          // Assuming field.id does not contain characters that need escaping for RegExp
          const match = key.match(new RegExp(`^${field.id}\\|\\|(\\d+)\\|\\|`))
          if (match && match[1]) {
            entryIndices.add(parseInt(match[1]))
          }
        }
      })

      // Sort indices numerically
      const sortedIndices = Array.from(entryIndices).sort((a, b) => a - b)

      if (sortedIndices.length === 0) {
        return [] // No entries to render
      }

      // Use flatMap to iterate through each entry index, then each sub-field template,
      // and flatten the results into a single array of React elements.
      return sortedIndices.flatMap((entryIndex) => {
        // For each entry, map over its defined sub-fields from the field's options
        return field.options.map((subFieldTemplate) => {
          // Construct the unique key for this specific instance of the sub-field
          const instanceKey = `${field.id}||${entryIndex}||${subFieldTemplate.id}`
          const value = values[instanceKey] // Get the value for this specific instance

          // Create a new field object for this instance,
          // using the subFieldTemplate and overriding its 'id' with the unique instanceKey.
          const instanceSpecificSubField: FormField = {
            ...subFieldTemplate,
            id: instanceKey,
          }

          return (
            <React.Fragment key={instanceKey}>
              {renderQuestionLabel(instanceSpecificSubField)}
              {renderFieldValue(instanceSpecificSubField, value)}
            </React.Fragment>
          )
        })
      })
    }

    if (value === undefined || value === null || value === '') {
      return (
        <Typography variant="body2" className="text-light-4">
          Not answered
        </Typography>
      )
    }

    switch (field.type) {
      case FormFieldType.SHORT_TEXT:
      case FormFieldType.LONG_TEXT:
      case FormFieldType.EMAIL:
      case FormFieldType.NUMBER:
      case FormFieldType.MOBILE_NUMBER:
      case FormFieldType.SINGLE_VIDEO_PICKER_WITH_INPUT:
        return (
          <Typography variant="body2" className="text-light-1">
            {value as string}
          </Typography>
        )

      case FormFieldType.DATE_PICKER:
        return (
          <Typography variant="body2" className="text-light-1">
            {new Date((value as number) * 1000).toLocaleDateString()}
          </Typography>
        )

      case FormFieldType.SINGLE_COMBOBOX:
      case FormFieldType.RADIO_GROUP:
        return (
          <Typography variant="body2" className="text-light-1">
            {value as string}
          </Typography>
        )

      case FormFieldType.CHECKBOX_GROUP: {
        const value = values[field.id] as string
        return (
          <div className="flex flex-col gap-2">
            {field.options.map((option) => {
              return (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    disabled
                    id={option}
                    checked={value?.split(',').includes(option)}
                  />
                  <Typography variant="body1" className="text-light-4">
                    {option}
                  </Typography>
                </div>
              )
            })}
          </div>
        )
      }
      case FormFieldType.MULTI_COMBOBOX:
        return (
          <Typography variant="body2" className="text-light-1">
            {typeof value === 'string' ? value.split(',').join(', ') : null}
          </Typography>
        )

      case FormFieldType.RADIO_GROUP_WITH_OPTIONAL_INPUT: {
        const radioValue = value as RadioGroupWithInputFieldValue
        return (
          <Typography variant="body2" className="text-light-1">
            {radioValue.radio_value}
            {radioValue.input_value &&
              radioValue.radio_value === field.inputTriggerOptionValue &&
              `: ${radioValue.input_value}`}
          </Typography>
        )
      }

      // For single image/video uploads
      case FormFieldType.SINGLE_IMAGE_PICKER: {
        const asset = value as AssetValue
        return (
          <div className="mt-1">
            <a
              href={asset.public_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={asset.public_url}
                alt={field.name}
                className="object-cover w-full h-32 rounded-md hover:opacity-90"
              />
            </a>
          </div>
        )
      }

      case FormFieldType.SINGLE_VIDEO_PICKER: {
        const asset = value as AssetValue
        return (
          <div className="mt-1">
            <video
              src={asset.public_url}
              controls
              className="w-full h-32 rounded-md"
            >
              <track
                kind="captions"
                label="English captions"
                srcLang="en"
                src=""
                default
              />
            </video>
          </div>
        )
      }

      case FormFieldType.MULTI_IMAGE_PICKER: {
        const assets = value as AssetValue[]
        return (
          <div className="grid grid-cols-1 gap-2 mt-1 sm:grid-cols-3 md:grid-cols-4">
            {assets.map((asset, index) => (
              <a
                key={index}
                href={asset.public_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={asset.public_url}
                  alt={field.name}
                  className="object-cover w-full h-32 rounded-md hover:opacity-90"
                />
              </a>
            ))}
          </div>
        )
      }

      case FormFieldType.MULTI_VIDEO_PICKER: {
        const assets = value as AssetValue[]
        return (
          <div className="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2">
            {assets.map((asset, index) => (
              <div key={index} className="flex flex-col">
                <video
                  src={asset.public_url}
                  controls
                  className="h-32 rounded-md"
                >
                  <track
                    kind="captions"
                    label="English captions"
                    srcLang="en"
                    src=""
                    default
                  />
                </video>
              </div>
            ))}
          </div>
        )
      }

      case FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER:
      case FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER_WITH_INPUT: {
        const taggedAssets = value as TaggableAssetValue[]
        return (
          <div className="grid grid-cols-1 gap-2 mt-1 sm:grid-cols-3 md:grid-cols-4">
            {taggedAssets.map((asset, index) => (
              <div key={index} className="relative">
                <a
                  key={index}
                  href={asset.public_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={asset.public_url}
                    alt={field.name}
                    className="object-cover w-full h-32 rounded-md hover:opacity-90"
                  />
                </a>
                <Badge
                  className="absolute bottom-2 right-2  "
                  variant={'select'}
                >
                  {asset.tag && asset.tag.length > 8
                    ? `${asset.tag.substring(0, 8)}...`
                    : asset.tag}
                </Badge>
              </div>
            ))}
          </div>
        )
      }

      default:
        return (
          <Typography variant="body2" className="text-light-4">
            Unsupported field type
          </Typography>
        )
    }
  }

  const renderQuestionLabel = (field: FormField): ReactNode => {
    return (
      <Typography variant="body1" className="mb-1 text-light-3">
        {field.name}
        {field.required && <span className="text-danger-1">*</span>}
      </Typography>
    )
  }

  return (
    <div className="">
      {structure.steps.map((step) => (
        <Accordion
          key={step.id}
          trigger={
            <div className="flex items-center gap-2">
              <Typography variant="h3" className="text-light-2">
                {step.name}
              </Typography>
            </div>
          }
          triggerProps={{ className: 'mt-4 ' }}
          contentProps={{ className: 'mt-4 p-2 bg-light-2 rounded' }}
          content={step.sections.map((section) => (
            <div key={section.id} className="mb-4">
              <Typography variant="h3" className="mb-2 text-light-2">
                {section.name}
              </Typography>

              <div className="flex flex-col gap-3">
                {section.fields.map((field) => (
                  <div key={field.id} className="last:border-b-0">
                    {renderQuestionLabel(field)}
                    {renderFieldValue(field, values[field.id])}
                  </div>
                ))}
              </div>
            </div>
          ))}
        />
      ))}
    </div>
  )
}
