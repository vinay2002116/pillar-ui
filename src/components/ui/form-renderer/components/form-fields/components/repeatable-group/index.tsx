// components/form-fields/RepeatableGroup.tsx
import React from 'react'
import { Typography } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/button'

import { FormField } from '../../index' // Import your existing FormField component
import { useFormValues } from '../../../../context/form-values'
import { FormValues, RepeatableGroupField } from '../../../../form.types'
import { Plus } from 'lucide-react'

interface FormFieldProps {
  field: RepeatableGroupField
}

export const RepeatableGroup: React.FC<FormFieldProps> = ({ field }) => {
  const { values, setValue, setFormValues } = useFormValues()

  // Get all entries for this repeatable group
  const getEntries = () => {
    const entries: FormValues[] = []
    const prefix = `${field.id}||`

    // Find all entry indices in one pass
    const entryIndices = new Set<number>()
    Object.keys(values).forEach((key) => {
      if (key.startsWith(prefix)) {
        const match = key.match(new RegExp(`^${field.id}\\|\\|(\\d+)\\|\\|`))
        if (match && match[1]) {
          entryIndices.add(parseInt(match[1]))
        }
      }
    })

    // Sort indices numerically
    const sortedIndices = Array.from(entryIndices).sort((a, b) => a - b)

    // Build entry objects
    for (const index of sortedIndices) {
      const entryObject: FormValues = {}

      // Collect all subfields for this entry
      for (const subField of field.options) {
        const key = `${field.id}||${index}||${subField.id}`
        if (key in values) {
          entryObject[subField.id] = values[key]
        }
      }

      entries.push(entryObject)
    }

    return entries
  }

  const entries = getEntries()

  const handleAddEntry = () => {
    const newIndex = entries.length
    // Initialize new entry by setting values for each subfield
    field.options.forEach((subField) => {
      setValue(`${field.id}||${newIndex}||${subField.id}`, undefined)
    })
  }

  const handleRemoveEntry = (indexToRemove: number) => {
    const newValues = { ...values }

    // Step 1: Find all keys associated with all entries of this repeatable group
    const groupPrefix = `${field.id}||`
    const allGroupKeys = Object.keys(values).filter((key) =>
      key.startsWith(groupPrefix)
    )

    // Step 2: Process each key - either remove it or reindex it
    allGroupKeys.forEach((key) => {
      // Extract entry index from the key
      const match = key.match(new RegExp(`^${field.id}\\|\\|(\\d+)\\|\\|`))
      if (match && match[1]) {
        const entryIndex = parseInt(match[1])

        if (entryIndex === indexToRemove) {
          // Delete keys for the entry being removed
          delete newValues[key]
        } else if (entryIndex > indexToRemove) {
          // Reindex entries that come after the removed one
          const remainingPart = key.substring(
            key.indexOf('||', groupPrefix.length)
          )

          const newKey = `${field.id}||${entryIndex - 1}${remainingPart}`

          // Copy the value to the new index
          newValues[newKey] = values[key]

          // Remove the old key
          delete newValues[key]
        }
      }
    })

    // Update form values with a single call
    setFormValues(newValues)
  }

  // Rest of your component remains largely the same
  return (
    <div className="flex flex-col gap-4">
      {entries.length === 0 && (
        <div className="flex items-center justify-between">
          <Typography variant={'body1'} className="text-light-4">
            No entry added yet.
          </Typography>
          <Button
            size="sm"
            prefixIcon={<Plus size={20} />}
            variant="secondary"
            onClick={handleAddEntry}
            className="capitalize w-fit"
            title={`Add `}
          />
        </div>
      )}

      {entries.map((_, entryIndex) => (
        <div key={`${field.id}-entry-${entryIndex}`}>
          <div className="flex items-center justify-between mb-3">
            <Typography variant="body2" className="text-light-4">
              Entry {entryIndex + 1}
            </Typography>
            <Button
              size="sm"
              variant="link-secondary"
              onClick={() => handleRemoveEntry(entryIndex)}
              className="w-fit text-danger-1"
            >
              Remove
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {field.options.map((subField) => {
              const uniqueId = `${field.id}||${entryIndex}||${subField.id}`
              const modifiedField = {
                ...subField,
                id: uniqueId,
              }
              return <FormField key={uniqueId} field={modifiedField} />
            })}
          </div>
        </div>
      ))}
      {entries.length ? (
        <div className="flex justify-end">
          <Button
            size="sm"
            prefixIcon={<Plus size={20} />}
            variant="secondary"
            onClick={handleAddEntry}
            className="mt-2 capitalize w-fit"
            title={`Add more ${field.name}`}
          />
        </div>
      ) : null}
    </div>
  )
}
