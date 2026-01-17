import { Sheet } from '@/components/organisms/sheet'
import React from 'react'

interface StickerSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelectSticker: (url: string) => void
  stickers: string[]
}

const StickerSheet: React.FC<StickerSheetProps> = ({
  isOpen,
  onOpenChange,
  onSelectSticker,
  stickers,
}) => (
  <Sheet
    open={isOpen}
    onOpenChange={(open) => {
      onOpenChange(open)
    }}
    contentProps={{ side: 'bottom', className: 'bg-white' }}
    trigger={null}
    title={'Stickers'}
    content={
      <div className="p-4">
        <div className="flex overflow-x-auto pb-2 space-x-3 snap-x snap-mandatory overscroll-x-contain">
          {stickers.map((url, index) => (
            <div
              role="button"
              key={index}
              className="flex-shrink-0 w-24 h-24 flex items-center justify-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50 snap-start"
              tabIndex={0}
              onClick={() => {
                onSelectSticker(url)
                onOpenChange(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectSticker(url)
                  onOpenChange(false)
                }
              }}
            >
              <img
                src={url}
                alt={`Sticker ${index + 1}`}
                className="object-contain w-full h-auto max-h-24"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    }
  />
)

export default StickerSheet
