import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Dialog } from '@/components/organisms/dialog'
import { Textarea } from '@/components/atoms/textarea'
import { Typography } from '@/components/atoms/typography'

interface DialogNoteProps {
  open: boolean
  noteValue: string
  onNoteChange: (value: string) => void
  onClose: () => void
  onSave: () => void
}

export const DialogNote: React.FC<DialogNoteProps> = ({
  open,
  noteValue,
  onNoteChange,
  onClose,
  onSave,
}) => (
  <Dialog
    trigger={null}
    contentClassName="h-fit w-fit"
    open={open}
    onInteractOutside={onClose}
    body={
      <div className="p-4">
        <Typography
          variant="h3"
          className="mb-2 flex items-center justify-between text-light-2"
        >
          Add notes
          <X
            size={16}
            className="cursor-pointer justify-end text-light-1"
            onClick={onClose}
          />
        </Typography>

        <Textarea
          value={noteValue}
          placeholder="Add notes"
          onChange={(e) => onNoteChange(e.target.value)}
          className="h-[200px] w-[400px]"
        />
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={onSave}
            disabled={!noteValue.trim()}
          >
            Save
          </Button>
          <Button size="sm" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    }
  />
)
