import React from 'react'
import { Accordion } from '@/components/atoms/accordion'
import { Typography } from '@/components/atoms/typography'

export const TypeSection: React.FC<{
  types?: string[]
}> = ({ types }) =>
  types && types.length > 0 ? (
    <Accordion
      trigger={
        <Typography variant="body1" className="text-light-2">
          Types
        </Typography>
      }
      content={
        <div className="flex flex-wrap gap-1">
          {types.map((type, idx) => (
            <Typography
              key={type + idx}
              variant="body4"
              className="rounded bg-primary-1 px-2 py-0.5 text-xs text-light-3"
            >
              {type}
            </Typography>
          ))}
        </div>
      }
      triggerProps={{ className: 'cursor-pointer my-2' }}
    />
  ) : null
