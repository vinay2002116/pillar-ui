import { Typography } from '@/components/atoms/typography'
import { useToast } from '@/components/molecules/toast'
import { Spinner } from '@/components/unstyled/spinner'
import { SingleCombobox } from '@/components/molecules/single-combobox'

import { Upload, X, Pen } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useFormValues } from '../../../../context/form-values'
import { AssetValue, TaggableAssetValue } from '../../../../form.types'

interface TaggableMultiImagePickerProps {
  id: string
  onChange: (data: TaggableAssetValue[]) => void
  value?: TaggableAssetValue[]
  accept?: string
  error?: string
  maxImages?: number
  options: string[]
}

const TaggableMultiImagePicker: React.FC<TaggableMultiImagePickerProps> = ({
  id,
  onChange,
  value = [],
  accept = 'image/*',
  error,
  maxImages = 20,
  options,
}) => {
  const { onAssetUpload, onToggleImageEditor } = useFormValues()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length || isLoading) return

    if (value.length + files.length > maxImages) {
      toast({
        title: 'Alert!',
        description: `Maximum ${maxImages} images allowed.`,
        icon: 'warning',
      })
      return
    }

    if (onAssetUpload) {
      setIsLoading(true)

      try {
        const uploads = Array.from(files).map((file) => onAssetUpload(file))
        const results = await Promise.all(uploads)

        const TaggedResults = results.map((result) => ({ ...result, tag: '' }))

        onChange([...value, ...TaggedResults])

        toast({
          title: 'Alert!',
          description: `${files.length} ${files.length === 1 ? 'image' : 'images'} uploaded successfully.`,
          icon: 'success',
        })
      } catch (error) {
        toast({
          title: 'Alert!',
          description: `Error uploading images`,
          icon: 'warning',
        })
      } finally {
        setIsLoading(false)
        // Reset the file input so the same files can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }

  const handleClick = () => {
    if (!isLoading && value.length < maxImages) {
      fileInputRef.current?.click()
    } else if (value.length >= maxImages) {
      toast({
        title: 'Alert!',
        description: `Maximum ${maxImages} images allowed.`,
        icon: 'warning',
      })
    }
  }

  const removeImage = (index: number) => {
    if (!isLoading) {
      const newImages = [...value]
      newImages.splice(index, 1)
      onChange(newImages)
    }
  }

  const onReplaceImage = (data: AssetValue, index: number) => {
    const newValue = [...value]
    const existingImage = newValue[index]

    newValue.splice(index, 1, { ...existingImage, ...data })
    onChange(newValue)
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
          <Spinner className="w-8 h-8 text-primary-1" />
        </div>
      )}
      <div className="relative p-8 border-2 border-dashed rounded-lg border-primary-1 bg-primary-1">
        <button
          className="w-full"
          onClick={handleClick}
          type="button"
          disabled={isLoading || value.length >= maxImages}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-gray-100 rounded-full">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <Typography variant="body1" className="text-gray-600">
              {isLoading
                ? 'Uploading...'
                : value.length >= maxImages
                  ? `Maximum ${maxImages} images reached`
                  : 'Add Images'}
            </Typography>
            {value.length > 0 && (
              <Typography variant="body1" className="text-gray-500">
                {value.length} of {maxImages} images
              </Typography>
            )}
          </div>
        </button>
        <input
          ref={fileInputRef}
          id={`${id}-gallery`}
          type="file"
          accept={accept}
          disabled={isLoading || value.length >= maxImages}
          onChange={handleImageSelect}
          className="hidden"
          multiple
        />

        {error && (
          <Typography variant="body1" className="mt-1 text-danger-1">
            {error}
          </Typography>
        )}
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((image, index) => (
            <div key={image.private_url} className="flex flex-col gap-2">
              <div key={index} className="relative flex rounded">
                <img
                  src={image.public_url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-24 rounded"
                />
                {onToggleImageEditor && (
                  <button
                    onClick={() => {
                      onToggleImageEditor({
                        imageUrl: image.public_url,
                        index,
                        onReplaceImage,
                      })
                    }}
                    className="absolute p-1 text-white bg-white rounded-full left-2 top-2 opacity-70 hover:opacity-100"
                  >
                    <Pen size={16} className="stroke-danger" />
                  </button>
                )}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute p-1 text-white bg-white rounded-full right-2 top-2 opacity-70 hover:opacity-100"
                  type="button"
                  disabled={isLoading}
                >
                  <X size={16} className="stroke-danger" />
                </button>
              </div>
              <SingleCombobox
                options={options.map((option) => ({
                  id: option,
                  name: option,
                }))}
                value={image.tag}
                onChange={(data) => {
                  const newImages = [...value]
                  newImages[index].tag = data
                  onChange(newImages)
                }}
                placeholder={'Select '}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { TaggableMultiImagePicker }
