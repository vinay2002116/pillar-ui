import React, { useEffect, useRef, useState } from 'react'
import { Accordion } from '@/components/atoms/accordion'
import { Typography } from '@/components/atoms/typography'
import { ExternalLink, SearchIcon } from 'lucide-react'
import { PropertiesAddedSectionProps } from '../agent-snippet-view.types'
import { Button, Input, Spinner } from '@/index'

export const PropertiesAddedSection: React.FC<PropertiesAddedSectionProps> = ({
  properties = [],
  title = 'Properties added',
  property_count,
  onRedirect,
  onReachBottom,
  onSearchChange,
  loading = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef(false)
  const [search, setSearch] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onSearchChange?.(e.target.value)
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  useEffect(() => {
    isFetchingRef.current = false
  }, [properties])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      onReachBottom?.()
    }
  }
  return (
    <Accordion
      trigger={
        <Typography variant="body1" className="text-light-2">
          {title} ({property_count})
        </Typography>
      }
      content={
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="max-h-[400px] overflow-y-auto"
        >
          <div className="w-full sticky top-0 bg-light-1 z-50 pb-2">
            <Input
              placeholder="Search properties"
              prefix={<SearchIcon className="stroke-light-2" size={20} />}
              value={search}
              onChange={handleInputChange}
            />
          </div>
          {properties.length === 0 ? (
            <div className="flex justify-center items-center h-20 text-light-3">
              No property found
            </div>
          ) : (
            <>
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="rounded-[12px] border border-neutral-1 bg-light-2 p-3 mb-3 flex flex-col gap-2 "
                >
                  <div className="w-full flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-3 p-0">
                        <Typography variant="body4" className="text-light-2 ">
                          {property.name}
                        </Typography>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-fit ml-auto"
                          onClick={() => onRedirect?.(property)}
                        >
                          <ExternalLink
                            size={16}
                            className="text-light-1 cursor-pointer bg-light-1"
                          />
                        </Button>
                      </div>
                      <div className="flex w-[372px] rounded-lg p-3 bg-light-1">
                        {/* Render features only */}
                        {property.property_details &&
                          property.property_details.length > 0 && (
                            <div className="flex w-full rounded-lg p-0 bg-light-1">
                              {property.property_details &&
                                property.property_details.length > 0 &&
                                property.property_details.map(
                                  (feature, idx) => (
                                    <React.Fragment key={idx}>
                                      <div className="flex flex-col min-w-0">
                                        <div className="truncate font-medium">
                                          <Typography
                                            variant="body6"
                                            className="text-light-4"
                                          >
                                            {feature.name}
                                          </Typography>{' '}
                                        </div>
                                        <div className="truncate text-light-3">
                                          <Typography
                                            variant="body6"
                                            className="text-light-2"
                                          >
                                            {feature.value}
                                          </Typography>
                                        </div>
                                      </div>
                                      {property.property_details &&
                                        idx !==
                                          property.property_details.length -
                                            1 && (
                                          <div className="h-auto w-px border-l mx-3 border-neutral-2" />
                                        )}
                                    </React.Fragment>
                                  )
                                )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="left-0 right-0 bottom-0 flex justify-center items-center py-4">
                  <Spinner />
                </div>
              )}
            </>
          )}
        </div>
      }
      triggerProps={{ className: 'cursor-pointer my-2' }}
      contentProps={{ className: 'max-h-[400px] overflow-y-auto' }}
    />
  )
}
