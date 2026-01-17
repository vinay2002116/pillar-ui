import React from 'react'
import { Button } from '@/components/atoms/button'
import { X } from 'lucide-react'

interface CloseButtonProps {
  onClick: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
  <div className="absolute left-[24px] top-[20px] z-[100]">
    <Button
      onClick={onClick}
      size="sm"
      variant="secondary"
      className="border-none rounded-md cursor-pointer bg-none text-light-1"
    >
      <X height={18} width={18} />
    </Button>
  </div>
)

export default CloseButton
