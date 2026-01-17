import React from 'react'
import { Accordion } from '@/components/atoms/accordion'
// import { Avatar } from '@/components/atoms/avatar'
import { Typography } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/button'
import { FileText } from 'lucide-react'
import type { Note } from '../agent-snippet-view.types'
import { Spinner } from '@/components/unstyled/spinner'
import { Avatar } from '@/index'

export const NotesSection: React.FC<{
  notes: Note[]
  onAddNote?: () => void
  notesLoading?: boolean
}> = ({ notes, onAddNote, notesLoading }) => (
  <Accordion
    trigger={
      <Typography variant="body1" className="my-2 text-light-2">
        Call history & notes
      </Typography>
    }
    content={
      <div>
        {onAddNote && (
          <div className="w-full sticky top-0 bg-light-1 z-50 pb-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex w-fit justify-start"
              onClick={onAddNote}
            >
              <FileText size={16} className="mr-1" />
              Add notes
            </Button>
          </div>
        )}
        {notesLoading && (
          <div className="flex justify-center items-center py-2">
            <Spinner />
          </div>
        )}
        {notes.length === 0 ? (
          <div className="py-4 text-start text-light-4">
            Nothing here yet. Add a note to begin.
          </div>
        ) : (
          notes.map((item, idx) => {
            const date = new Date(item.timestamp)
            const dateStr = date.toLocaleDateString('en-GB')
            const timeStr = date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
            // const fallback = item.user.first_name?.[0]?.toUpperCase() || ''
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 py-3 ${idx !== notes.length - 1 ? 'border-b border-neutral-2' : ''}`}
              >
                <Avatar
                  imageSrc={item.user.image_url || ''}
                  alt={item.user.first_name}
                  fallback={item.user.first_name?.[0]?.toUpperCase() || ''}
                  size="md"
                />
                <div className="mr-3 flex w-full justify-between">
                  <div>
                    <Typography
                      variant="body2"
                      className="mt-1 max-w-[250px] whitespace-pre-line break-words text-light-3"
                    >
                      {item.note}
                    </Typography>
                    {item.call_duration && (
                      <Typography variant="body6" className="text-light-4 mt-1">
                        {item.call_duration}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Typography variant="body6" className="text-light-2">
                      {dateStr}
                    </Typography>
                    <Typography variant="body6" className="text-light-4">
                      {timeStr}
                    </Typography>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    }
    triggerProps={{
      className: 'cursor-pointer my-2',
    }}
    contentProps={{ className: 'max-h-[400px] overflow-y-auto' }}
  />
)
