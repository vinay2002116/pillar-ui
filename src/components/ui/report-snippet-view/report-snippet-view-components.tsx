import React, { FC } from 'react'
import { ReportSnippetViewNS } from './report-snippet-view.types'

import { Dialog } from '@/components/organisms/dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Typography } from '@/components/atoms/typography'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { trendBoxStyles, trendValueStyles } from './report-snippet-view-style'

const ReportSnippetGalleryView: FC<{
  onToggle: () => void
  isOpen: boolean
  data?: ReportSnippetViewNS.StreetViewData
  galleryActiveIndex: number
  setgalleryActiveIndex: React.Dispatch<React.SetStateAction<number>>
}> = ({
  data,
  onToggle,
  isOpen,
  galleryActiveIndex,
  setgalleryActiveIndex,
}) => {
  // Current active item

  const isDataAvailable = data && data.length

  // Handle next click
  const handleNext = () => {
    if (!data) return
    setgalleryActiveIndex((prevIndex) => (prevIndex + 1) % data?.length)
  }

  // Handle previous click
  const handlePrev = () => {
    if (!data) return
    setgalleryActiveIndex(
      (prevIndex) => (prevIndex - 1 + data.length) % data.length
    )
  }

  const handleThumbnailClick = (index: number) => {
    setgalleryActiveIndex(index)
  }

  const toggleGallery = () => {
    onToggle()
  }

  return (
    <Dialog
      open={isOpen}
      trigger={null}
      contentClassName="bg-transparent w-fit  border-0"
      onInteractOutside={toggleGallery}
      body={
        <div className="flex flex-col items-center justify-center w-full h-full max-w-3xl mx-auto">
          <X
            size={24}
            color="white"
            className="absolute z-50 cursor-pointer -right-10 -top-10"
            onClick={toggleGallery}
          />

          {/* Main Carousel */}
          <div className="relative">
            <div className="relative ">
              {isDataAvailable && (
                <img
                  key={data[galleryActiveIndex].image_url}
                  src={data[galleryActiveIndex].image_url}
                  alt={`Street ${galleryActiveIndex + 1}`}
                  className="w-[500px] max-h-[80vh] object-contain flex-shrink-0"
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="relative top-[-50%]  left-[-10%] flex row  w-[120%] justify-between">
              <div role="button" tabIndex={0} onClick={handlePrev}>
                <ChevronLeft size={30} color="white" />
              </div>
              <div role="button" tabIndex={0} onClick={handleNext}>
                <ChevronRight size={30} color="white" />
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center p-2 mt-4 space-x-2 rounded-lg">
            {isDataAvailable &&
              data.map((item, index) => (
                <img
                  key={index}
                  src={item.image_url}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-auto rounded-lg cursor-pointer ${
                    index === galleryActiveIndex
                      ? 'ring-2 ring-primary-1'
                      : 'ring-2 ring-transparent'
                  } hover:ring-gray-300`}
                />
              ))}
          </div>
        </div>
      }
    />
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const CustomTooltipFootfall = ({ active, payload, label, year }: any) => {
  if (active && payload && payload.length) {
    const year = payload[0]?.payload?.year
    const footfall = payload[0]?.value
    return (
      <div className="flex flex-col bg-light-1 p-4 rounded-lg shadow-md min-w-[200px] gap-1">
        {/* Month Information */}
        <Typography variant={'body6'} className="text-primary">
          {`${label}'${year}`}
        </Typography>

        {/* Separator */}
        <div className="my-2 w-full h-px border border-stroke-1" />

        {/* Footfall/Visits Information */}
        <div className="flex">
          <div
            className="h-4 w-1 rounded-lg"
            style={{ backgroundColor: '#6D48EF' }}
          />
          <Typography variant={'body6'} className="text-secondary mx-1">
            Visits
          </Typography>
          <Typography variant={'body4'} className="text-secondary ml-auto">
            {` ${footfall}`}
          </Typography>
        </div>
      </div>
    )
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltipCannibalisation = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const distance = payload[0]?.payload?.distance
    const cannibalisation = payload[0]?.value
    return (
      <div className="flex bg-light-1 items-center justify-between rounded-lg shadow-md min-w-45 max-w-80 gap-2 p-2">
        {/* Month Information */}
        <Typography variant={'body6'} className="text-primary">
          {
            <div className="flex h-full justify-between items-center p-2 gap-4">
              <div>{label}</div>
              <div> {distance + 'km'}</div>
            </div>
          }
        </Typography>
        {/* Footfall/Visits Information */}
        <Typography
          variant={'body4'}
          className="text-normal text-danger-1 ml-auto p-2"
        >
          {`${cannibalisation}%`}
        </Typography>
      </div>
    )
  }
  return null
}

{
  /*--------- Store insights ----------*/
}
interface StoreInsightsSectionProps {
  insights: ReportSnippetViewNS.CatchmentInsights[]
  // customButton?: React.ReactNode
}

const StoreInsightsSection: FC<StoreInsightsSectionProps> = ({ insights }) => {
  return (
    <div>
      <div className="flex flex-row mb-4 justify-between">
        <Typography variant="body4" className="text-light-2">
          Store Insight:
        </Typography>
      </div>

      <div className="bg-light-2 p-3 border border-neutral-1 rounded-lg">
        <Typography variant="body4" className="text-light-2 mb-2">
          Presence of other brands in catchment:
        </Typography>

        {/* Render store insights data */}
        <div className="flex gap-1 flex-wrap">
          {insights.map((item) => (
            <div
              key={item.type}
              className="flex items-center gap-1 bg-light-1 px-2 py-1 rounded-full border border-neutral-1"
            >
              {/* Icon */}
              <img
                src={item.iconUrl}
                alt={`${item.type} Icon`}
                className="w-4 h-4"
              />

              {/* Name and Count */}
              <Typography variant="body6" className="text-light-2">
                {item.count}
              </Typography>
              <div className="flex items-center gap-1">
                <Typography variant="body6" className="text-light-2">
                  {item.type === 'competitor' ? 'Competitors' : 'Complementary'}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

{
  /*--------- Store Overview ----------*/
}
interface StoreOverviewSectionProps {
  highlights: ReportSnippetViewNS.StoreHighlights[]
}

const StoreOverviewSection: FC<StoreOverviewSectionProps> = ({
  highlights,
}) => {
  return (
    <div>
      <Typography variant={'body4'} className="text-light-2 mb-2">
        Store Overview:
      </Typography>
      <div className="bg-light-2 p-1 border border-neutral-1 rounded-lg">
        <div className="flex justify-evenly items-center">
          {highlights.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center justify-center text-center gap-1 p-">
                {/* Trend Box */}
                <div
                  className={trendBoxStyles({
                    trend: item.trend?.toString() as '1' | '-1' | '0' | null,
                  })}
                >
                  {item.trend === 1 && (
                    <img
                      src="https://frontend-static-files.geoiq.io/strapi/trending_up_9d73d6fac5.svg"
                      alt="High Trend"
                      className={'w-3 h-3'}
                    />
                  )}
                  {item.trend === -1 && (
                    <img
                      src="https://frontend-static-files.geoiq.io/strapi/trending_down_87adc7f3a6.svg"
                      alt="Low Trend"
                      className={'w-3 h-3'}
                    />
                  )}
                  {item.value && item.trend ? (
                    <Typography
                      variant="body5"
                      className={trendValueStyles({
                        trend: item.trend?.toString() as
                          | '1'
                          | '-1'
                          | '0'
                          | null,
                      })}
                    >
                      {`${item.value}%`}
                    </Typography>
                  ) : (
                    <Typography variant="body5" className="text-sm">
                      -
                    </Typography>
                  )}
                </div>

                {/* Name */}
                {item.name && (
                  <Typography variant={'body6'} className="text-light-2">
                    {item.name}
                  </Typography>
                )}
              </div>

              {/* Separator */}
              {index < highlights.length - 1 && (
                <div className="border-l border-stroke-light-1 h-20 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

{
  /*----------------- Footfall Trends ------------------*/
}
interface FootfallChartSectionProps {
  data: ReportSnippetViewNS.FootfallChartData[]
}

const FootfallChartSection: FC<FootfallChartSectionProps> = ({ data }) => {
  if (!data || data.every((item) => item.footfall === null)) {
    return null
  }
  return (
    <div className="w-full h-full bg-light-2 border border-neutral-1 p-3 rounded-lg">
      {/* Section heading */}
      <Typography variant={'body4'} className="text-light-2 mb-4">
        Footfall trends
      </Typography>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 3,
            right: 3,
            bottom: -10,
            left: 3,
          }}
          barSize={24}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis
            dataKey="month"
            style={{
              font: 'Kumbh Sans',
              fontSize: '12px',
              fontWeight: '500',
              color: '#4A4A4A',
            }}
          />
          <YAxis
            className="text-4-grey"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tickFormatter={(val) => {
              if (val > 1000000) {
                return `${val / 1000000}M`
              }
              if (val > 1000) {
                return `${val / 1000}K`
              }
              return val
            }}
            label={{
              value: 'AVG FOOTFALL FOR A 3-MONTH PERIOD',
              angle: -90,
              position: 'insideLeft',
              dy: -5,
              style: {
                textAnchor: 'middle',
                fontSize: '12px',
                fontWeight: '500',
              },
            }}
          />
          <Tooltip content={<CustomTooltipFootfall />} />
          <Bar
            dataKey="footfall"
            fill="#6D48EF"
            radius={[4, 4, 4, 4]}
            style={{ cursor: 'pointer' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

{
  /* -----------------Cannibalisation Effect------------------ */
}
interface CannibalisationChartSectionProps {
  data: ReportSnippetViewNS.CannibalisationChartData[]
}

const CannibalisationChartSection: FC<CannibalisationChartSectionProps> = ({
  data,
}) => {
  if (!data || data.every((item) => item.cannibalisation === null)) {
    return null
  }
  const formatXAxisLabel = (label: string) => {
    const barCount = data.length
    let maxLength

    if (barCount <= 1) {
      maxLength = 50
    } else if (barCount <= 6) {
      maxLength = 22 - (barCount - 1) * 4
    } else {
      maxLength = 6
    }

    return label.length > maxLength ? `${label.slice(0, maxLength)}...` : label
  }
  return (
    <div className="w-full h-full bg-light-2 border border-neutral-1 p-3 rounded-lg">
      {/* Section heading */}
      <Typography variant={'body4'} className="text-light-2 mb-4">
        Cannibalisation effects
      </Typography>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 3,
            right: 3,
            bottom: 5,
            left: 3,
          }}
          barSize={24}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis
            dataKey="store_name"
            tickFormatter={formatXAxisLabel}
            tickMargin={10}
            tick={(props) => {
              const { x, y, payload } = props
              return (
                <text x={x} y={y} textAnchor={'end'} fill="#666">
                  <tspan x={x} style={{ fontSize: 12 }}>
                    {formatXAxisLabel(payload.value)}
                  </tspan>
                  <tspan
                    x={x}
                    dy="1.5em"
                    style={{
                      fontSize: 10,
                      whiteSpace: 'nowrap',
                      paddingTop: '2px',
                    }}
                  >
                    {data[payload.index].distance + ' kms'}
                  </tspan>
                </text>
              )
            }}
          />
          <YAxis
            className="text-4-grey"
            style={{ fontSize: '12px', fontWeight: '500' }}
            tickFormatter={(val) => {
              if (val > 1000000) {
                return `${val / 1000000}M`
              }
              if (val > 1000) {
                return `${val / 1000}K`
              }
              return val
            }}
            label={{
              value: 'CANNIBALISATION IN %',
              angle: -90,
              position: 'insideLeft',
              dy: -5,
              style: {
                textAnchor: 'middle',
                fontSize: '12px',
                fontWeight: '500',
              },
            }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltipCannibalisation />} />
          <Bar
            dataKey="cannibalisation"
            fill="#F93232"
            radius={[4, 4, 4, 4]}
            style={{ cursor: 'pointer' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export {
  ReportSnippetGalleryView,
  StoreInsightsSection,
  StoreOverviewSection,
  FootfallChartSection,
  CannibalisationChartSection,
}
