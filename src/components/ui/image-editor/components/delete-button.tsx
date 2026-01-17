import React from 'react'
import { Html } from 'react-konva-utils'
import { X } from 'lucide-react'

interface DeleteButtonProps {
  x: number
  y: number
  onClick: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ x, y, onClick }) => (
  <Html>
    <div
      role="button"
      className="absolute z-10"
      style={{ left: `${x - 20}px`, top: `${y - 20}px` }}
    >
      <X
        className="cursor-pointer text-black hover:text-gray-700"
        height={18}
        width={18}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      />
    </div>
  </Html>
)

export default DeleteButton
