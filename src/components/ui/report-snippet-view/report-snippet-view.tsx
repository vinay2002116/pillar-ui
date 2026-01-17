import React, { FC, Key, useState } from 'react'
import { ReportSnippetViewNS } from './report-snippet-view.types'
import { Typography } from '@/components/atoms/typography'
import { Badge } from '@/components/atoms/badge'
import { StarScore } from '../star-score'
import { Button } from '@/components/atoms/button'
import { Skeleton } from '@/components/atoms/skeleton'

import {
  ReportSnippetGalleryView,
  StoreOverviewSection,
  FootfallChartSection,
  CannibalisationChartSection,
  StoreInsightsSection,
} from './report-snippet-view-components'

const ReportSnippetView: FC<ReportSnippetViewNS.ReportSnippetViewProps> = ({
  map,
  title,
  subTitle,
  tag,
  score,
  searched_on,
  streetViewData,
  highlights,
  isStreetViewDataLoading,
  handleStreetViewClick,
  storeHighlights,
  isLoading,
  catchmentInsights,
  footfallChartData,
  cannibalisationChartData,
  // customButton,
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryActiveIndex, setgalleryActiveIndex] = React.useState(0)

  const searchedOnDate = new Date(Number(searched_on) * 1000) // Convert timestamp to milliseconds
  const formattedDate = searchedOnDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Check if all images have null values for image_url
  const allImagesNull = streetViewData?.every(
    (img: { image_url: string | null }) => img.image_url === null
  )

  const toggleGallery = () => {
    setGalleryOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col h-full ">
      {map && isLoading ? (
        <div className="flex flex-row-reverse items-center justify-between w-full p-1">
          <Skeleton className="w-full h-40 " />
        </div>
      ) : (
        map && map
      )}
      <div className="flex flex-col ">
        <div className="flex flex-col gap-1 p-3">
          {isLoading ? (
            <Skeleton className="w-full h-8 " />
          ) : (
            <Typography variant={'h3'}>{title}</Typography>
          )}
          {isLoading ? (
            <div className="flex flex-row-reverse items-center justify-between w-full">
              <Skeleton className="w-20 h-5 " />
              <Skeleton className="w-32 h-5 " />
            </div>
          ) : (
            <div className="flex flex-row-reverse items-center justify-between w-full ">
              {tag ? (
                <Badge variant="neutral" size={'sm'} showBorder={true}>
                  {tag}
                </Badge>
              ) : (
                <div></div>
              )}
              {subTitle !== undefined && (
                <Typography
                  variant={'body4'}
                  className="text-light-4 fit-content w-1/2"
                >
                  {subTitle}
                </Typography>
              )}
            </div>
          )}
        </div>
        <div className="w-full p-3 border-b border-neutral-1">
          {isLoading ? (
            <div className="flex flex-row-reverse items-center justify-between w-full">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-6 w-[120px]" />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between">
              {score?.value && (
                <div className="flex items-center justify-between gap-1">
                  <StarScore
                    score={score.value}
                    starGap={1}
                    starSize={24}
                    isLoading={isLoading || score?.isLoading}
                  />
                  {!score.isLoading && (
                    <Typography variant={'body5'} className="text-light-3">
                      ({score.value}%)
                    </Typography>
                  )}
                </div>
              )}
              {searched_on && (
                <Badge
                  variant={'default'}
                  size={'sm'}
                  showBorder={true}
                >{`Added on: ${formattedDate}`}</Badge>
              )}
            </div>
          )}
        </div>

        <div>
          <div>
            {highlights && isLoading ? (
              <div className="flex flex-col gap-3 p-3">
                <div>
                  <Typography variant="body6" className="text-light-2">
                    <Skeleton className="w-28 h-7" />{' '}
                  </Typography>
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="w-28 h-7" />
                  ))}
                </div>
              </div>
            ) : highlights && highlights.length > 0 ? (
              <div className="flex flex-col gap-3 p-3">
                <div>
                  <Typography variant="body6" className="text-light-2">
                    Location Highlights
                  </Typography>
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {highlights.map((highlight, index) => (
                    <Badge
                      key={index}
                      variant={highlight.variant}
                      showBorder={true}
                      className="normal-case"
                    >
                      {highlight.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {streetViewData !== undefined && (
            <div className="z-10 flex flex-col items-start justify-between p-3 pb-0 gap-1">
              {streetViewData === null && isStreetViewDataLoading === false ? (
                <div className="w-fit">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex gap-2 px-4 py-2 focus:ring-0"
                    onClick={handleStreetViewClick}
                  >
                    <img
                      src="https://frontend-static-files.geoiq.io/strapi/download_cloud_7761a0bc2a.svg"
                      height={16}
                      width={16}
                      alt={'download-btn'}
                    />
                    Street-view Photos
                  </Button>
                </div>
              ) : (
                <Typography variant="body6" className="text-light-2">
                  Street-view Photos
                </Typography>
              )}

              <div
                id={'street'}
                className="flex flex-row max-w-full gap-2 overflow-x-scroll"
                style={{ scrollbarWidth: 'none' }}
              >
                {isStreetViewDataLoading ? (
                  [...Array(4)].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="rounded-lg min-h-[160px] min-w-[120px]"
                    />
                  ))
                ) : allImagesNull ? (
                  <Typography variant="body1">No Images Available</Typography>
                ) : (
                  streetViewData &&
                  streetViewData?.map(
                    (
                      img: { image_url: string | null },
                      index: Key | null | undefined
                    ) => (
                      <div
                        key={index}
                        className="relative min-h-[160px] min-w-[120px]"
                      >
                        <div className="inline">
                          {img?.image_url && img?.image_url !== null ? (
                            <img
                              src={img?.image_url}
                              alt="map_img"
                              className="object-cover w-full h-full rounded-lg cursor-pointer"
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setgalleryActiveIndex(Number(index))
                                toggleGallery()
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 p-3">
          {/* --------------Store Insight -----------------*/}
          {catchmentInsights ? (
            isLoading ? (
              <div>
                <div className="flex mb-4">
                  <Typography variant="body4" className="text-light-2">
                    <Skeleton className="w-28 h-7" />
                  </Typography>
                </div>

                <div className="bg-light-2 p-3 border border-neutral-1 rounded-lg">
                  <Typography variant="body4" className="text-light-2 mb-2">
                    <Skeleton className="w-full h-7" />
                  </Typography>

                  {/* Skeleton loaders */}
                  <div className="flex gap-1 flex-wrap">
                    <Skeleton className="w-32 h-8 rounded-[24px]" />
                    <Skeleton className="w-32 h-8 rounded-[24px]" />
                  </div>
                </div>
              </div>
            ) : catchmentInsights.length > 0 ? (
              <StoreInsightsSection
                insights={catchmentInsights}
                // customButton={customButton}
              />
            ) : null
          ) : null}

          {/* --------------Store Overview -----------------*/}
          {storeHighlights ? (
            isLoading ? (
              <div>
                <Typography variant="body4" className="text-light-2 mb-2">
                  <Skeleton className="w-28 h-7" />
                </Typography>
                <div className="bg-light-2 p-1 border border-neutral-1 rounded-[8px]">
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {[...Array(4)].map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-20 h-20 rounded-[8px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : storeHighlights.length > 0 ? (
              <StoreOverviewSection highlights={storeHighlights} />
            ) : null
          ) : null}

          {/*----------------- Footfall Trends ------------------*/}
          {footfallChartData && isLoading ? (
            <div className="w-full bg-light-2 border border-neutral-1 p-3 rounded-[8px]">
              <Typography variant={'body4'} className="text-light-2 mb-4">
                <Skeleton className="w-28 h-7" />{' '}
              </Typography>
              <Skeleton className="w-full h-[400px]" />
            </div>
          ) : footfallChartData && footfallChartData.length > 0 ? (
            <FootfallChartSection data={footfallChartData} />
          ) : null}

          {/* -----------------Cannibalisation Effect------------------ */}
          {cannibalisationChartData && isLoading ? (
            <div className="w-full bg-light-2 border border-neutral-1 p-3 rounded-[8px]">
              <Typography variant={'body4'} className="text-light-2 mb-4">
                <Skeleton className="w-28 h-7" />{' '}
              </Typography>
              <Skeleton className="w-full h-[400px]" />
            </div>
          ) : cannibalisationChartData &&
            cannibalisationChartData.length > 0 ? (
            <CannibalisationChartSection data={cannibalisationChartData} />
          ) : null}
        </div>
      </div>
      <ReportSnippetGalleryView
        onToggle={toggleGallery}
        isOpen={galleryOpen}
        data={streetViewData}
        galleryActiveIndex={galleryActiveIndex}
        setgalleryActiveIndex={setgalleryActiveIndex}
      />
    </div>
  )
}

export default ReportSnippetView
