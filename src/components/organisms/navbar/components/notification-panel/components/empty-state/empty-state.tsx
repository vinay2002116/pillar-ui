import { Typography } from '@/components/atoms/typography'
import { FC } from 'react'
import * as React from 'react'

const EmptyNotificationState: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-80">
      <img
        src="https://frontend-static-files.geoiq.io/strapi/notification_empty_state_d1614ba3d3/notification_empty_state_d1614ba3d3.svg"
        alt="empty-state"
        className="h-[150px] w-[150px]"
      />
      <div className="flex flex-col items-center justify-center gap-1">
        <Typography variant="body1" className="text-light-1">
          No new notifications for now!
        </Typography>
        <Typography variant="body4" className="text-center text-light-4">
          Stay tuned for updates, and we&apos;ll keep you posted when something
          comes up!
        </Typography>
      </div>
    </div>
  )
}

export default EmptyNotificationState
