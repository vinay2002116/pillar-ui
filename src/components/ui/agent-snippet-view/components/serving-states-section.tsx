import React from 'react'
import { Accordion } from '@/components/atoms/accordion'
import { Typography } from '@/components/atoms/typography'

export const ServingStatesSection: React.FC<{
  servingStates?: string[]
}> = ({ servingStates }) =>
  servingStates && servingStates.length > 0 ? (
    <Accordion
      trigger={
        <Typography variant="body1" className="text-light-2">
          Serving states
        </Typography>
      }
      content={
        <div className="flex flex-wrap gap-1">
          {servingStates.map((state, idx) => (
            <Typography
              key={state + idx}
              variant="body4"
              className="rounded bg-primary-1 px-2 py-0.5 text-xs text-light-3"
            >
              {state}
            </Typography>
          ))}
        </div>
      }
      triggerProps={{ className: 'cursor-pointer my-2' }}
    />
  ) : null
