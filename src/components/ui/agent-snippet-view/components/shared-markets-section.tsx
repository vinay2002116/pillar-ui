import React from 'react'
import { Accordion } from '@/components/atoms/accordion'
import { Typography } from '@/components/atoms/typography'

export const SharedMarketsSection: React.FC<{
  sharedMarkets?: React.ReactNode
}> = ({ sharedMarkets }) =>
  sharedMarkets ? (
    <Accordion
      trigger={
        <Typography variant="body1" className="text-light-2">
          Shared markets
        </Typography>
      }
      content={<div>{sharedMarkets}</div>}
      triggerProps={{ className: 'cursor-pointer my-2' }}
    />
  ) : null
