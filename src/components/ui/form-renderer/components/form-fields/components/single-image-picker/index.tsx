import { Typography } from '@/components/atoms/typography'
import { useToast } from '@/components/molecules/toast'
import { Spinner } from '@/components/unstyled/spinner'
import { Upload, X, Pen } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useFormValues } from '../../../../context/form-values'
import { AssetValue } from '../../../../form.types'

interface ImagePickerProps {
  id: string
  onChange: (data?: AssetValue) => void
  value?: AssetValue
  accept?: string
  error?: string
}

const SingleImagePicker: React.FC<ImagePickerProps> = ({
  id,
  onChange,
  value,
  accept = 'image/*',
  error,
}) => {
  const { onAssetUpload, onToggleImageEditor } = useFormValues()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || isLoading) return
    if (onAssetUpload) {
      setIsLoading(true)
      onAssetUpload(file)
        .then((data: AssetValue) => {
          onChange({ ...data, original_private_url: data.private_url })

          toast({
            title: 'Alert!',
            description: `File uploaded successfully.`,
            icon: 'success',
          })
        })
        .catch(() => {
          onChange(undefined)
          toast({
            title: 'Alert!',
            description: `Error uploading file`,
            icon: 'warning',
          })
        })
        .finally(() => {
          setIsLoading(false)
          // Reset the file input so the same file can be selected again
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        })
    }
  }

  const onReplaceImage = (data: AssetValue) => {
    onChange({
      ...data,
      original_private_url: value?.original_private_url ?? value?.private_url,
    })
  }

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
          <Spinner className="w-8 h-8 text-primary-1" />
        </div>
      )}
      <div className="relative p-8 border-2 border-dashed rounded-lg border-primary-1 bg-primary-1">
        <button className="w-full" onClick={handleClick}>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-gray-100 rounded-full">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <Typography variant="body1" className="text-gray-600">
              {isLoading
                ? 'Uploading...'
                : value
                  ? 'Replace Image'
                  : 'Attach Image'}
            </Typography>
          </div>
        </button>
        <input
          ref={fileInputRef}
          id={`${id}-gallery`}
          type="file"
          accept={accept}
          disabled={isLoading}
          onChange={handleImageSelect}
          className="hidden"
        />

        {error && (
          <Typography variant="body1" className="mt-1 text-danger-1">
            {error}
          </Typography>
        )}
      </div>
      {value && (
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
          <div className="relative flex rounded">
            <img
              src={value.public_url}
              alt="Preview"
              className="object-cover w-full h-24 rounded"
            />
            <button
              onClick={() => {
                if (!isLoading) {
                  onChange(undefined)
                }
              }}
              className="absolute p-1 text-white bg-white rounded-full right-2 top-2 opacity-70 hover:opacity-100"
            >
              <X size={16} className="stroke-danger" />
            </button>
            {onToggleImageEditor && (
              <button
                onClick={() => {
                  onToggleImageEditor({
                    imageUrl: value.public_url,
                    index: -1,
                    onReplaceImage,
                  })
                }}
                className="absolute p-1 text-white bg-white rounded-full left-2 top-2 opacity-70 hover:opacity-100"
              >
                <Pen size={16} className="stroke-danger" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { SingleImagePicker }
