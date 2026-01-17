// components/FormSection.tsx
import React from 'react'
import { FormSection as FormSectionType } from '../form.types'
import { FormField } from './form-fields'
import { Typography } from '@/components/atoms/typography'
interface FormSectionProps {
  section: FormSectionType
}

export const FormSection: React.FC<FormSectionProps> = ({ section }) => {
  return (
    <div className="form-section">
      <section className="flex flex-col gap-3">
        <Typography variant="h3" className="text-light-2">
          {section.name}
        </Typography>
        {section.fields.map((field) => (
          <FormField key={field.id} field={field} />
        ))}
      </section>
    </div>
  )
}
