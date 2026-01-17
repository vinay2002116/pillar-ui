// components/FormField.tsx
import React from 'react'
import {
  AssetValue,
  FormField as FormFieldInterface,
  RadioGroupWithInputFieldValue,
  TaggableAssetValue,
} from '../../form.types'
import { useFormValues } from '../../context/form-values'
import { Input } from '@/components/atoms/input'
import { Checkbox } from '@/components/atoms/checkbox'
import { RadioGroup } from '@/components/atoms/radio-group'
import { RadioGroupItem } from '@/components/atoms/radio-group'
import { MultiCombobox } from '@/components/molecules/multi-combobox'
import { SingleCombobox } from '@/components/molecules/single-combobox'
import { Textarea } from '@/components/atoms/textarea'
import { Typography } from '@/components/atoms/typography'

import { Mail, Phone } from 'lucide-react'
import { SingleImagePicker } from './components/single-image-picker'
import { SingleVideoPicker } from './components/single-video-picker'
import { MultiImagePicker } from './components/multi-image-picker'
import { MultiVideoPicker } from './components/multi-video-picker'
import { RepeatableGroup } from './components/repeatable-group'
import { TaggableMultiImagePicker } from './components/taggable-multi-image-picker'
import { FormFieldType } from '../../form.enums'
import { DatePicker } from '@/components/unstyled/date-picker'
import { TaggableImageUploadFieldWithInput } from './components/taggable-multi-image-picker-with-input'

interface FormFieldProps {
  field: FormFieldInterface
}

export const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const { values, errors, setValue } = useFormValues()

  const renderField = () => {
    switch (field.type) {
      case FormFieldType.SINGLE_COMBOBOX:
        return (
          <SingleCombobox
            options={field.options.map((option) => ({
              id: option,
              name: option,
            }))}
            value={values[field.id] as string}
            onChange={(data) => setValue(field.id, data)}
            placeholder={field.placeholder}
          />
        )

      case FormFieldType.MULTI_COMBOBOX:
        return (
          <MultiCombobox
            options={field.options.map((option) => ({
              label: option,
              value: option,
            }))}
            selected={(values[field.id] as string)?.split(',') || []}
            onChange={(data) => {
              if (data.length === 0) {
                setValue(field.id, undefined)
              } else {
                setValue(field.id, (data as string[]).join(','))
              }
            }}
            placeholder={field.placeholder}
          />
        )

      case FormFieldType.RADIO_GROUP:
        return (
          <RadioGroup
            value={values[field.id] as string}
            onValueChange={(data) => setValue(field.id, data)}
          >
            {field.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Typography variant="body1" className="text-light-4">
                  {option}
                </Typography>
              </div>
            ))}
          </RadioGroup>
        )

      case FormFieldType.RADIO_GROUP_WITH_OPTIONAL_INPUT: {
        const value = values[field.id] as RadioGroupWithInputFieldValue
        return (
          <div>
            <RadioGroup
              value={value?.radio_value}
              onValueChange={(data) =>
                setValue(field.id, {
                  ...value,
                  radio_value: data,
                  input_value: '',
                })
              }
            >
              {field.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Typography variant="body1" className="text-light-4">
                    {option}
                  </Typography>
                </div>
              ))}
            </RadioGroup>
            {field.inputTriggerOptionValue === value?.radio_value ? (
              <Input
                id={field.id}
                type="text"
                placeholder={field.inputFieldPlaceholder}
                value={value?.input_value}
                onChange={(e) =>
                  setValue(field.id, {
                    ...value,
                    input_value: e.target.value,
                  })
                }
              />
            ) : null}
          </div>
        )
      }

      case FormFieldType.CHECKBOX_GROUP: {
        const value = values[field.id] as string
        return (
          <div className="flex flex-col gap-2">
            {field.options.map((option) => {
              return (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={value?.split(',').includes(option)}
                    onCheckedChange={(data) => {
                      if (data) {
                        setValue(
                          field.id,
                          value ? `${value},${option}` : option
                        )
                      } else {
                        setValue(
                          field.id,
                          value
                            ?.split(',')
                            .filter((item) => item !== option)
                            .join(',')
                        )
                      }
                    }}
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

      case FormFieldType.DATE_PICKER: {
        const epochValue = values[field.id] as number | undefined
        const dateValue = epochValue ? new Date(epochValue * 1000) : undefined
        return (
          <DatePicker
            variant="single"
            date={dateValue}
            onDateChange={(date) => {
              if (date) {
                setValue(field.id, Math.floor(date.valueOf() / 1000))
              }
            }}
          />
        )
      }

      case FormFieldType.LONG_TEXT:
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={values[field.id] as string}
            onChange={(e) => setValue(field.id, e.target.value)}
          />
        )

      case FormFieldType.EMAIL:
        return (
          <Input
            type="email"
            id={field.id}
            value={values[field.id] as string}
            onChange={(e) => setValue(field.id, e.target.value)}
            placeholder={field.placeholder}
            prefix={<Mail className="stroke-gray-400" size={20} />}
          />
        )

      case FormFieldType.SHORT_TEXT:
        // Default string input
        return (
          <Input
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            value={values[field.id] as string}
            onChange={(e) => setValue(field.id, e.target.value)}
          />
        )
      case FormFieldType.MOBILE_NUMBER:
        return (
          <Input
            prefix={<Phone className="stroke-gray-400" size={20} />}
            type="tel"
            id={field.id}
            placeholder={field.placeholder}
            value={values[field.id] as string}
            onChange={(e) => setValue(field.id, e.target.value)}
          />
        )
      case FormFieldType.NUMBER:
        return (
          <Input
            // type="number"
            type="number"
            inputMode="decimal"
            pattern="^\d*\.?\d*$"
            id={field.id}
            placeholder={field.placeholder}
            value={values[field.id] as string}
            onChange={(e) => setValue(field.id, e.target.value)}
          />
        )
      case FormFieldType.SINGLE_IMAGE_PICKER:
        return (
          <SingleImagePicker
            id={field.id}
            onChange={(data?: AssetValue) => setValue(field.id, data)}
            value={values[field.id] as AssetValue | undefined}
          />
        )

      case FormFieldType.MULTI_IMAGE_PICKER:
        return (
          <MultiImagePicker
            id={field.id}
            onChange={(data?: AssetValue[]) => setValue(field.id, data)}
            value={values[field.id] as AssetValue[] | undefined}
            maxImages={field.max_items}
          />
        )

      case FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER:
        return (
          <TaggableMultiImagePicker
            id={field.id}
            onChange={(data?: TaggableAssetValue[]) => setValue(field.id, data)}
            value={values[field.id] as TaggableAssetValue[] | undefined}
            options={field.options}
            maxImages={field.max_items}
          />
        )

      case FormFieldType.SINGLE_VIDEO_PICKER:
        return (
          <SingleVideoPicker
            id={field.id}
            onChange={(data?: AssetValue) => setValue(field.id, data)}
            value={values[field.id] as AssetValue | undefined}
          />
        )

      case FormFieldType.MULTI_VIDEO_PICKER:
        return (
          <MultiVideoPicker
            id={field.id}
            onChange={(data?: AssetValue[]) => setValue(field.id, data)}
            value={values[field.id] as AssetValue[] | undefined}
            maxVideos={field.max_items}
          />
        )

      case FormFieldType.REPEATABLE_GROUP_FIELD: {
        return <RepeatableGroup field={field} />
      }

      case FormFieldType.SINGLE_VIDEO_PICKER_WITH_INPUT: {
        return (
          <Input
            id={field.id}
            required={field.required}
            type="url"
            placeholder={field.placeholder}
            value={values[field.id] as string}
            onChange={(e) => setValue(field.id, e.target.value)}
          />
        )
      }

      case FormFieldType.TAGGABLE_MULTI_IMAGE_PICKER_WITH_INPUT: {
        return (
          <TaggableImageUploadFieldWithInput
            id={field.id}
            onChange={(data?: TaggableAssetValue[]) => setValue(field.id, data)}
            value={values[field.id] as TaggableAssetValue[] | undefined}
            maxImages={field.max_items}
            placeholder={field.placeholder}
          />
        )
      }

      default:
        return <div>Unknown Field</div>
    }
  }

  return (
    <aside className="flex flex-col gap-1">
      <Typography variant="body1" className="text-light-2">
        {field.name}
        {field.required && <span className="text-danger-1">*</span>}
      </Typography>
      {renderField()}
      {errors[field.id] && (
        <div className="error-message">{errors[field.id]}</div>
      )}
    </aside>
  )
}
