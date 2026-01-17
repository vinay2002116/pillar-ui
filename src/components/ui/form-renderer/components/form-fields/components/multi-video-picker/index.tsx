import { X, Video } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useFormValues } from '../../../../context/form-values'
import { AssetValue } from '../../../../form.types'
import { Typography } from '@/components/atoms/typography'
import { useToast } from '@/components/molecules/toast'
import { Spinner } from '@/components/unstyled/spinner'

interface MultiVideoPickerProps {
  id: string
  onChange: (data: AssetValue[]) => void
  value?: AssetValue[]
  accept?: string
  error?: string
  maxVideos?: number
}

const MultiVideoPicker: React.FC<MultiVideoPickerProps> = ({
  id,
  onChange,
  value = [],
  accept = 'video/*',
  error,
  maxVideos = 10,
}) => {
  const { onAssetUpload } = useFormValues()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length || isLoading) return

    if (value.length + files.length > maxVideos) {
      toast({
        title: 'Alert!',
        description: `Maximum ${maxVideos} videos allowed.`,
        icon: 'warning',
      })
      return
    }

    if (onAssetUpload) {
      setIsLoading(true)

      try {
        const uploads = Array.from(files).map((file) => onAssetUpload(file))
        const results = await Promise.all(uploads)

        onChange([...value, ...results])

        toast({
          title: 'Alert!',
          description: `${files.length} ${files.length === 1 ? 'video' : 'videos'} uploaded successfully.`,
          icon: 'success',
        })
      } catch (error) {
        toast({
          title: 'Alert!',
          description: `Error uploading videos`,
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
    if (!isLoading && value.length < maxVideos) {
      fileInputRef.current?.click()
    } else if (value.length >= maxVideos) {
      toast({
        title: 'Alert!',
        description: `Maximum ${maxVideos} videos allowed.`,
        icon: 'warning',
      })
    }
  }

  const removeVideo = (index: number) => {
    if (!isLoading) {
      const newVideos = [...value]
      newVideos.splice(index, 1)
      onChange(newVideos)
    }
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
          <Spinner className="w-12 h-12 animate-spin text-primary-1" />
        </div>
      )}

      <div className="relative p-8 border-2 border-dashed rounded-lg border-primary-1 bg-primary-1">
        <button
          className="w-full"
          onClick={handleClick}
          type="button"
          disabled={isLoading || value.length >= maxVideos}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-gray-100 rounded-full">
              <Video className="w-6 h-6 text-gray-500" />
            </div>
            <Typography variant="body1" className="text-gray-600">
              {isLoading
                ? 'Uploading...'
                : value.length >= maxVideos
                  ? `Maximum ${maxVideos} videos reached`
                  : 'Add Videos'}
            </Typography>
            {value.length > 0 && (
              <Typography variant="body1" className="text-gray-500">
                {value.length} of {maxVideos} videos
              </Typography>
            )}
          </div>
        </button>
        <input
          ref={fileInputRef}
          id={`${id}-gallery`}
          type="file"
          accept={accept}
          disabled={isLoading || value.length >= maxVideos}
          onChange={handleVideoSelect}
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
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-2">
          {value.map((video, index) => (
            <div key={index} className="relative flex rounded">
              <video
                src={video.public_url}
                className="object-cover w-full h-32 rounded"
                controls={true}
                controlsList="nodownload"
                preload="metadata"
              >
                <track
                  kind="captions"
                  label="English captions"
                  srcLang="en"
                  src=""
                  default
                />
              </video>
              <button
                onClick={() => removeVideo(index)}
                className="absolute p-1 text-white bg-white rounded-full right-2 top-2 opacity-70 hover:opacity-100"
                type="button"
                disabled={isLoading}
              >
                <X size={16} className="stroke-danger" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { MultiVideoPicker }
