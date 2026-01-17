import { FC } from 'react'
import { NotificationCardProps } from './notification-card.types'
import * as React from 'react'
import { Clock4 } from 'lucide-react'
import { convertEpochTime } from './notification.utils'
import { Avatar } from '@/components/atoms/avatar'
import { Typography } from '@/components/atoms/typography'

const NotificationCard: FC<NotificationCardProps> = (notification) => {
  const getInitials = (name: string): string => {
    if (!name) {
      return ''
    }
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  const onCardClick = () => {
    if (typeof window !== 'undefined' && notification?.action?.redirect_url)
      window.location.href = notification?.action?.redirect_url
  }

  return (
    <div
      className="flex flex-row items-start justify-start gap-2 p-3 border-b border-neutral-1 bg-light-1 hover:cursor-pointer"
      onClick={() => {
        onCardClick()
      }}
      role="button"
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          onCardClick()
        }
      }}
      tabIndex={0}
    >
      <Avatar
        fallback={getInitials(notification.user.first_name)}
        imageSrc={notification.user.profile_url}
        alt={getInitials(notification.user.first_name)}
        size="md"
      />
      <div className="flex flex-col gap-1">
        <Typography variant="body3" className="text-light-2 hover:underline">
          {notification.title}
        </Typography>
        <Typography variant="body4" className="text-light-3">
          {notification.description}
        </Typography>

        <div className="flex flex-row gap-[6px]">
          <Clock4 size={16} className="stroke-light-2" />
          <Typography variant="body6" className="text-light-3">
            {convertEpochTime(Number(notification.timestamp))}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
