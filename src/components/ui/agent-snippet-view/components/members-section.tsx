import React from 'react'
import { Accordion } from '@/components/atoms/accordion'
import { Avatar } from '@/components/atoms/avatar'
import { Typography } from '@/components/atoms/typography'
import type { Member } from '../agent-snippet-view.types'

export const MembersSection: React.FC<{
  members: Member[]
}> = ({ members }) =>
  members.length > 0 ? (
    <Accordion
      trigger={
        <div className="flex items-center gap-1">
          <Typography variant="body1" className="text-light-2">
            Members ({members.length})
          </Typography>
        </div>
      }
      content={
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl bg-light-2 px-4 py-3"
            >
              <Avatar
                size="md"
                imageSrc={member.imageSrc || ''}
                alt={member.alt || member.name}
                fallback={
                  member.fallback || member.name?.[0].toUpperCase() || ''
                }
                avatarProps={{
                  className: 'border border-neutral-1 h-8 w-8 bg-light-1',
                }}
                {...member}
              />
              <Typography variant="body2">{member.name}</Typography>
            </div>
          ))}
        </div>
      }
      contentProps={{ className: 'max-h-[400px] overflow-y-auto' }}
      triggerProps={{ className: 'cursor-pointer my-2' }}
    />
  ) : null
